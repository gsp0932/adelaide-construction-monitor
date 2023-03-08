const express = require('express');
const router = express.Router();
const gravatar = require('gravatar');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const passport = require('passport');
const validateRegisterInput = require('../validation/register');
const validateLoginInput = require('../validation/login');

const user_data = require('../models/user_data');
const res = require('express/lib/response');

const dynamoose = require('dynamoose');

// Register user
router.post('/register', function(req, res){
	
	console.log(req.body); // ! Debug
	
	const{errors, isValid} = validateRegisterInput(req.body);
	if(!isValid){
		return res.status(400).json(errors);
	}
	
	user_data.query("username")
		.eq(req.body.username)
		.exec((error, results) => {
			if(error){
				console.log(error);
			}
			else if(results.count === 1) { // if there exists a username with the same value in the databsse
				return res.status(400).json({
					username: 'Username already exists'
				});
			}
			else {
				// Store avatar from email
				const avatar = gravatar.url(req.body.email, {
					s: '200',
					r: 'pg',
					d: 'mm'
				});
				
				// Insert new item
				const newUserData = new user_data({
					username: req.body.username,
					email: req.body.email,
					password: req.body.password,
					phone: req.body.phone,
					avatar
				});
				
				// Hash password
				bcrypt.genSalt(10, (err,salt)=>{
					if(err){
						console.error('There was an error', err);
					} 
					else {
						bcrypt.hash(newUserData.password, salt, (err, hash)=> {
							if(err){
								console.error('There was an error', err);
							} else {
								newUserData.password = hash;
								newUserData
									.save()
									.then(user_data => {
										res.json
										({
											user_data, 
											"message": 'New user registered successfully'
										});
									})
							}
							});
						}
					});
					
					// Insertation response
					newUserData.save((err) => {
						if (err) {
							console.log('Error registering new user:', err);
						} else {
							console.log('New user registered successfully');
						}
					});
				}
				});
});

// User login
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	
	if(!isValid){
		return res.status(400).json(errors);
	}

	const password = req.body.password;	// Store password from the request

	user_data.query("username")
		.eq(req.body.username)
		.exec((errors, results) => {
			if(errors) {
				console.log(errors);
				return res.status(404).json(
					{
						errors: errors,
						"message": 'user_data not found'
					}
				);
			}
			else if (results.count === 1){
				// console.log(results[0]);	// ! DEBUG: querried user_data at index 0 of querry result
				let user_data = results[0];
				bcrypt.compare(password, user_data.password) // Verify password
					.then(isMatch => {
						if(isMatch){
							const payload = {
								// id: user_data.id,	// dynamodb does not support uuid
								username: user_data.username,
								avatar: user_data.avatar
							};
							jwt.sign(
								payload,
								'secret',
								{expiresIn: 3600}, 
								(err, token) => {
									if(err){
										console.error('There is some error in token', err);
									} else {
											res.json({
												success: true,
												token: `Bearer ${token}`
											});
										}
								}
							);
						}
						else {
							errors.password = 'Incorrect Password';
							return res.status(400).json(errors);
						}
					});
			}
		});
});

// Get user's profile
router.get('/profile', 
passport.authenticate('jwt', {session: false}), 
(req, res)=>{
	return res.json({"hello":"world"})
	// return res.json({
	// 	// id: req.user_data.id,
	// 	username: user_data.username,
	// 	email: user_data.email
	// })
})

module.exports = router;