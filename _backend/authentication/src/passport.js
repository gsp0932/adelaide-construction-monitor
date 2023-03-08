const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const dynamoose = require('dynamoose');
const res = require('express/lib/response');
const passport = require('passport');
const opts = {};

const user_data = dynamoose.model('user_data');

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = 'secret';
opts.algorithms = "HS256";
opts.ignoreExpiration = "true";

module.exports = passport => {
	passport.use(new JWTStrategy(opts, (jwt_payload, done)=>{
		console.log(jwt_payload);	// !DEBUG: undefined jwt_payload
		// if(jwt_payload.username !== undefined){
		// 	user_data.query("username").eq(jwt_payload.username)
		// 	.exec((errors, results)=>{
		// 		if(results.count === 1){
		// 			return done(null, user_data);
		// 		} else {
		// 				return done(null, false);
		// 			}
		// 		}
		// 	)
		// } else {
		// 	console.log("jwt_payload: \n", jwt_payload);
		// 	console.log("Failed decoding jwt_payload. jwt_payload undefined.")
		// }
		
		return (null,done);
	}
	));
}