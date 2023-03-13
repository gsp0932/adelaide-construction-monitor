const res = require('express/lib/response');

const express = require('express');
const dynamoose = require('dynamoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const ddb = require('./src/config/ddb');

const user = require('./src/routes/user');
const serverless = require('serverless-http');

// Set up connection with dynamo database
dynamoose.aws.ddb.set(ddb);

// Initiate app
const app = express();
app.use(passport.initialize());
require('./src/passport')(passport);

//
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

// 
app.get('/', function(req, res){
	res.send('Hello');
});

// Routes for register users, users' login and get users' profiles.
app.use('/api/user', user);


// Specify PORT for local testing
const PORT = process.env.PORT || 5000;

// Switching between localhost and deploy on Lambda
if(process.env.ENVIRONMENT === 'production'){
	exports.handler = serverless(app);
} else {
	app.listen(PORT, () =>{
		console.log(`Server is running on PORT: ${PORT}`);
	});
}
