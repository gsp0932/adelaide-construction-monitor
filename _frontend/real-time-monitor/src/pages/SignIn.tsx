import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { SigninButton } from '../components/buttons/SigninButton';

import {LinkToSignUp} from '../components/buttons/LinkToSignUp';

import {useNavigate} from 'react-router-dom';
import axios, {AxiosRequestConfig, AxiosResponse} from 'axios';

const theme = createTheme();

// -------------------------------------------------- Component: SignIn ---------------------------------------------------------- //
export default function SignIn() {
  
  const [credentials, setCredentials] = React.useState<{
    email: FormDataEntryValue | null , password: FormDataEntryValue|null, 
  }>({
    email: '',
    password: ''
  });
  
  let navigate = useNavigate();
  
  const handleChange = (event: any) => {
    const {name, value} = event.target;
    setCredentials((prevCredentials) => ({
      ...prevCredentials,
      [name]: value
    }));
  };
  
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // prevent submit nothing to nowhere and refresh the page
    
    console.log({
      email: credentials.email,
      password: credentials.password
    })
    
    const config: AxiosRequestConfig = {
      method: 'POST',
      // url: 'http://localhost:5000/api/user/login',
      url: 'https://5ebaqlwu28.execute-api.us-west-1.amazonaws.com/api/user/login',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json;charset=UTF-8',
      },
      data: JSON.stringify({
        email: credentials.email,
        password: credentials.password
      })
    };
    
    axios(config)
      .then(response => {
        console.log(response);
        if(response.status === 200) navigate('/Devices');
    });
    
  }

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box 
            component="form" 
            onSubmit={handleSubmit}
            // noValidate 
            sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={handleChange}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={handleChange}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            
            <SigninButton/>
            
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <LinkToSignUp/>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}