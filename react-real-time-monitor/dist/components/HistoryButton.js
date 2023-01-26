import * as React from 'react';
import { IconButton } from '@mui/material';
import HistoryIcon from '@mui/icons-material/History';
import { useNavigate } from 'react-router-dom';
export function HistoryButton(props) {
    var navigate = useNavigate();
    var deviceID = props.deviceID;
    function navigateToDeviceHistory() {
        navigate('/DeviceHistory/' + deviceID);
    }
    return (React.createElement(IconButton, { onClick: navigateToDeviceHistory },
        React.createElement(HistoryIcon, null)));
}
//# sourceMappingURL=HistoryButton.js.map