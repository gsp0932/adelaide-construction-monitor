import * as React from 'react';
import { IconButton } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
export function BackButton() {
    var navigate = useNavigate();
    function navigateToDeviceHistory() {
        navigate(-1);
    }
    return (React.createElement(IconButton, { onClick: navigateToDeviceHistory },
        React.createElement(ArrowBack, null)));
}
//# sourceMappingURL=BackButton.js.map