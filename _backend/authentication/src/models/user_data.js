const dynamoose = require('dynamoose');

const UserSchema = new dynamoose.Schema({
	username: {
		type: String,
		required: true
	},
	email: {
		type: String,
		required: true
	},
	password: {
		type: String,
		required: true
	},
	phone: {
		type: String,
		required: true
	},
	avatar: {
		type: String
	},
	date: {
		type: Date,
		default: Date.now
	}
});

const user_data = dynamoose.model(
	'user_data', 
	UserSchema,
	{	// ! Prevent creating new table
		"create": false,
		"waitForActive": false
	}
);

module.exports = user_data;