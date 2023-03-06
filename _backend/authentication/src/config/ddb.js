const dynamoose = require('dynamoose');

module.exports = new dynamoose.aws.ddb.DynamoDB({
	"accessKeyId": "AKIAUSLYTBZ7UVM7HSGP",
	"secretAccessKey": "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",
	// "region": "us-west-1"	// ! errno -3001
})
