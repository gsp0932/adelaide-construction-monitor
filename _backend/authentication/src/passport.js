const JWTStrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;
const dynamoose = require('dynamoose');
const res = require('express/lib/response');
const opts = {};
const user_credentials = require('./models/user_credentials');

opts.jwtFromRequest = ExtractJWT.fromAuthHeaderAsBearerToken();
opts.secretOrKey = "secret";
opts.algorithms = "HS256";
// opts.ignoreExpiration = "true";	// for debug/development only

module.exports = passport => {
	passport.use(new JWTStrategy(opts, (jwt_payload, done)=>{
		if(jwt_payload.uuid !== undefined){
			user_credentials
				.query("uuid")
				.eq(jwt_payload.uuid)
				.exec((errors, results)=>{
					if (errors){
						return done(errors, false);
					}
					
					user = results[0];	// ! actual user_credentials, the desired result has index at 0 of results array
					
					if(results.count === 1){
						return done(null, user);
					} else {
							return done(null, false);
					} 
				})
		} else {
			console.log("jwt_payload: \n", jwt_payload);
			console.log("Failed decoding jwt_payload. jwt_payload undefined.")
			return done(null, false);
		}
	}
	));
}