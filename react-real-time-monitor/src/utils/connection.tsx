import { Amplify } from 'aws-amplify';
import { AWSIoTProvider } from '@aws-amplify/pubsub';

export function AwsIoT_connect(){
	Amplify.configure({
		Auth: {
		identityPoolId: 'us-west-1:0fea59b2-656a-4402-be98-25c06ce8f4f2',
		region: 'us-west-1',
		userPoolId: 'us-west-1_yO01IjJzY',
		userPoolWebClientId: '2f43dl9mnnju6oqiota4qeln9'
	  }
	  });
	
	// Add pluggable connection with configuration
	Amplify.addPluggable(new AWSIoTProvider({
	  aws_pubsub_region: 'us-west-1',
	  aws_pubsub_endpoint: 'wss://a2zztnkycni9kh-ats.iot.us-west-1.amazonaws.com/mqtt',
	}));
}