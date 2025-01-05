import React from "react";
import { Button, Box, Typography } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import theme from '../components/theme.js'
import { useNavigate } from 'react-router-dom';


const SignIn = () => {
    const navigate = useNavigate();
    //TODO: update to handle actual login capabilities
    const handleSignUp = () => {
        navigate('/dashboard');
      };
    const handleSignIn = () => {
        navigate('/dashboard');
    };
    return (
        <ThemeProvider theme={theme}>
          <Box
            sx={{
            backgroundColor: 'background.default',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              color: "white",
              gap: 3,
            }}>
            <Typography variant="h4" component="h1" gutterBottom>
              Welcome to *NAME*
            </Typography>
            <Box
              sx={{
                display: 'flex',
                gap: 2, // button spacing
              }}>
              <Button variant='contained' color='signs' size='large' onClick={handleSignUp}
                sx={{ 
                  minWidth: '120px',
                  '&:hover': {
                    backgroundColor: '#333333'
                  }
                }}>
                Sign Up
              </Button>
              <Button variant='contained' color='signs' size='large' onClick={handleSignIn}
                sx={{ 
                  minWidth: '120px',
                  '&:hover': {
                    backgroundColor: '#333333'
                  }
                }}>
                Sign In
              </Button>
              </Box>
            </Box>
        </ThemeProvider>
      );
}

export default SignIn;