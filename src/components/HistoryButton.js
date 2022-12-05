import { IconButton } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import {useNavigate} from 'react-router-dom';

export function HistoryButton(props) {
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
