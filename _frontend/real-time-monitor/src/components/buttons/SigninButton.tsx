import * as React from 'react';
import Button from '@mui/material/Button';

export function SigninButton(props: any) {
	return (
		<Button 
			type="submit"
			fullWidth
			variant="contained"
			sx={{ mt: 3, mb: 2 }}>
			Sign In
		</Button>
	)
}
