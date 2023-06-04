import * as React from 'react';

import Link from '@mui/material/Link';
import {useNavigate} from 'react-router-dom';

export function LinkToSignUp(props: any) {
	let navigate = useNavigate();
	
	function navigateToSignUpPage(){
		navigate('/SignUp');
	}
	
	return (
		<Link
			// href="/SignUp" 
			// variant="body2"
			onClick={navigateToSignUpPage}
			>
			{"Don't have an account? Sign Up"}
		</Link>
	)
}