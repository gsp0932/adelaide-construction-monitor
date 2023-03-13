const dynamoose = require('dynamoose');

const UserCredentialsSchema = new dynamoose.Schema({
	uuid: {	// For enhanced security and further controls
	type: String,
	required: true,
	hashKey: true // Set uuid as primary key
	},
	email: {
		type: String,
		required: true,
		rangeKey: true,
		index: { // Implement global index for email to allow query using only email
			name: "email-index",
			global: true	// global for query through entire table instead of partition when using local
		}
	},
	username: {
		type: String,
		required: true,
		index: { // Implement global index for username to allow query using only username
			name: "username-index",
			global: true
		}
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

const user_credentials = dynamoose.model(
	'user_credentials',
	UserCredentialsSchema,
	{create: false}	// Prevent creating new table
);

module.exports = user_credentials;

// Docs at https://dynamoosejs.com/guide/Schema