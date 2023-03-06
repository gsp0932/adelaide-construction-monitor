# Deploy application package to Lambda:
- Inside app.js, put
	``
		const PORT = process.env.PORT || 5000;

		if(process.env.ENVIRONMENT === 'production'){
			exports.handler = serverless(app);
		} else {
			app.listen(PORT, () =>{
				console.log(`Server is running on PORT: ${PORT}`);
			});
		}
	``
- Put app.js file at the outest folder of package.
- Zip all the files command with recursive flag "zip -r authentication.zip *".
- Specify/change the handler from index.handler to app.handler.
- Specify environment variable in lambda function, ENVIRONMENT=production (key=value)
- Upload through cli command or through VSCode AWS toolkit(preferred).
- For fully control, instead of using Function URL, create API Gateway and attach routes with 
corresponding integrations.
- Since authentication must access dynamodb for executing tasks related to users'data, we have
to grant permission to access dynamodb to it:
	- Log in to the AWS Management console.
	- Navigate to AWS Lambda.
	- Open the CreateDynamoDBTable Lambda function.
	- Click the Configuration tab.
	- Click the Permissions tab.
	- Click the execution role name.
	- Attach the DynamoDB full access policy.
	- Navigate back to AWS Lambda and test the function again.