import { IconButton } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import {useNavigate} from 'react-router-dom';

export function HistoryButton() {
	let navigate = useNavigate();
	
	function navigateToDeviceHistory() {
		navigate('/DeviceHistory');
	}
	
	return (
		<IconButton onClick={navigateToDeviceHistory}>
			<HistoryIcon/>
		</IconButton>
	)
}
