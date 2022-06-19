import React from 'react';
import { useState } from 'react';
import { signInWithEmailAndPassword , getAuth } from 'firebase/auth';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';
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
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';

export default function Login() {
  let forge = require('node-forge');

  const [loginData, setLoginData] = useState({});
  const auth = getAuth();
  const onInput = (event) => {
    let data = { [event.target.name]: event.target.value }
    setLoginData({ ...loginData, ...data })
  }

  function hashPassword(plainpass){
    var sha = forge.md.sha256.create();
    sha.update(plainpass);

    console.log(sha.digest().toHex())

    return (sha.digest().toHex());
}

  let navigate = useNavigate();
  
  const login = () =>{
    signInWithEmailAndPassword(auth , loginData.email , hashPassword(loginData.password))
    .then((response)=>{
      sessionStorage.setItem('userEmail',response.user.email)
      localStorage.setItem('userHash',hashPassword(loginData.password))
      navigate('/home')
    })
    .catch((error)=>{
      alert(error.message)
    
    })
  }

 
  const theme = createTheme();

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
       
        <Typography component="h1" variant="h5">
          Login
        </Typography>
        <Box  noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={onInput}
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
            onChange={onInput}
          />
        
          <Button
            onClick={login}
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            LogIn
          </Button>
          <Grid container>
            
            <Grid item>
              <Link href="/register" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      
    </Container>
  </ThemeProvider>
);
}
