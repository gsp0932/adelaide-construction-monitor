const express = require('express');
const router = express.Router();	// for using router
const gravatar = require('gravatar');	// for gravatar
const bcrypt = require('bcryptjs');	// for encrypt and signing
const jwt = require('jsonwebtoken');	// for generating and signing with jwt token
const passport = require('passport');	// for authentication
const validateRegisterInput = require('../validation/register');	// for registration validating methods
const validateLoginInput = require('../validation/login');	// for login validating methods 

const user_credentials = require('../models/user_credentials');	
const { v4: uuidv4} = require('uuid'); // for generating uuid in user_credentials dynamodb
const res = require('express/lib/response');

const dynamoose = require('dynamoose');

// Register user
router.post('/register', function(req, res){
	
	console.log(req.body); // ! Debug
	
	const{errors, isValid} = validateRegisterInput(req.body);
	if(!isValid){
		return res.status(400).json(errors);
	}
	
	// TODO: Recheck logic
	user_credentials.query("email")	// Check if email already used first
		.eq(req.body.email)
		.using("email-index")
		.exec((errors, results) => {
			if(errors){
				console.log(errors);
			} else if (results.count === 1) {
				console.log('This email is already used.');
				return res.status(400).json({
					username: 'This email is already used.'
				});
			} else {
				user_credentials.query("username")
					.eq(req.body.username)
					.using("username-index")
					.exec((error, results) => {
						if(error){
							console.log(error);
						}
						else if(results.count === 1) { // Check if username is already used
							console.log('This username is already used.');
							return res.status(400).json({
								username: 'This username already used.'
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
							const newUserData = new user_credentials({
								uuid: uuidv4(),
								email: req.body.email,
								username: req.body.username,
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
												.then(user_credentials => {
													res.json
													({
														user_credentials,
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
			}
		})
	
});

// User login
router.post('/login', (req, res) => {
	const { errors, isValid } = validateLoginInput(req.body);
	
	if(!isValid){
		return res.status(400).json(errors);
	}

	const password = req.body.password;	// Store password from the request

	user_credentials.query("email")
		.eq(req.body.email)
		.using("email-index")
		.exec((errors, results) => {
			if(errors) {
				console.log(errors);
				return res.status(404).json(
					{
						errors: errors,
						"message": 'user_credentials not found'
					}
				);
			}
			else if (results.count === 1){
				let user_credentials = results[0];	// user_credentials result is at index 0 of results array
				bcrypt.compare(password, user_credentials.password) // Verify password
					.then(isMatch => {
						if(isMatch){
							const payload = {
								uuid: user_credentials.uuid,
							};
							jwt.sign(
								payload,
								"secret",
								{expiresIn: 3600}, 
								(err, token) => {
									if(err){
										console.error('There is some error in token', err);
									} else {
											res.json({
												success: true,
												token: `Bearer ${token}`	// This format is required in the header of the get request sent to /profile as well
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
router.get(
	'/profile',
	passport.authenticate(
		'jwt', 
		{session: false}), 
		(req, res)=>{
			return res.json({
				"username": user.username,
				"email": user.email,
				"avatar": user.avatar
			})
})

module.exports = router;