import React from 'react';
import { useState } from 'react';
import { collection,addDoc } from 'firebase/firestore';
import {createUserWithEmailAndPassword , getAuth} from 'firebase/auth' ;
import { database } from '../firebaseConfig';
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
import { useNavigate } from 'react-router';
import Stack from '@mui/material/Stack';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert, { AlertProps } from '@mui/material/Alert';



export default function Register(props) {
    let forge = require('node-forge');
    const [registerData, setRegisterData] = useState({});

    const collectionRef = collection(database,'userpasswords')
    
    const auth = getAuth();

    function hashPassword(plainpass){
        var sha = forge.md.sha256.create();
        sha.update(plainpass);

        console.log(sha.digest().toHex())
    
        return (sha.digest().toHex());
    }

    const onInput = (event) => {
        let data = {[event.target.name]: event.target.value}
        setRegisterData({...registerData, ...data})
    }

    let navigate = useNavigate();
    const register = () =>{
        const hashedPasswored=hashPassword(registerData.password)
    
        createUserWithEmailAndPassword(auth,registerData.email,hashedPasswored)
        .then(response => {
           
            addDoc(collectionRef,{
                email:registerData.email,
                password:hashedPasswored,
                passwordsArray:[]
            })
            .then(()=>{
                navigate("/")
            })
            .catch(()=>{
                alert("some error occured")
            })
            
        })
        .catch(error =>{
            console.log(error.message)
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
              SignUp
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
                onClick={register}
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
              >
                SignUp
              </Button>
              <Grid container>
                
                <Grid item>
                  <Link href="/" variant="body2">
                    {"Already have an account? LogIn"}
                  </Link>
                </Grid>
              </Grid>
            </Box>
          </Box>
          
        </Container>
      </ThemeProvider>
    );
    }
    