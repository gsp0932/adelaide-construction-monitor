import * as React from 'react';
import {useNavigate} from 'react-router-dom';
import Button from '@mui/material/Button';

export function SigninButton(props: any) {
	let navigate = useNavigate();
	
	function navigateToDevices(){
		navigate('/Devices');
	}
	
	return (
		<Button 
			type="submit"
			fullWidth
			variant="contained"
			sx={{ mt: 3, mb: 2 }}
			onClick={navigateToDevices}>
			Sign In
		</Button>
	)
}
