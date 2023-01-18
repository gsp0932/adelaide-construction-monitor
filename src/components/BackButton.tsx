import * as React from 'react';
import { IconButton } from '@mui/material';
import {useNavigate} from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';

export function BackButton() {
	let navigate = useNavigate();
	
	function navigateToDeviceHistory() {
		navigate(-1);
	}
	
	return (
		<IconButton onClick={navigateToDeviceHistory}>
			<ArrowBack/>
		</IconButton>
	)
}
