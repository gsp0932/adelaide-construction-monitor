import * as React from 'react';
import { IconButton } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import {useNavigate} from 'react-router-dom';

export function HistoryButton(props: any) {
	let navigate = useNavigate();
	
	const deviceID = props.deviceID;
	
	function navigateToDeviceHistory(){
		navigate('/DeviceHistory/'+ deviceID);
	}
	
	return (
		<IconButton onClick={navigateToDeviceHistory}>
			<HistoryIcon/>
		</IconButton>
	)
}
