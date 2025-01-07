import React from "react";
import { Button, Box, Typography } from '@mui/material';
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
          <Box
            sx={{
            backgroundColor: 'background.default',
              height: '100vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 3,
            }}>
            <Typography variant="h1" component="h1" gutterBottom>
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
                  },
                  fontSize: '1.3rem',
                  padding: '10px 28px'
                }}>
                Sign Up
              </Button>
              <Button variant='contained' color='signs' size='large' onClick={handleSignIn}
                sx={{ 
                  minWidth: '120px',
                  '&:hover': {
                    backgroundColor: '#333333'
                  },
                  fontSize: '1.3rem',
                  padding: '10px 28px'
                }}>
                Log In
              </Button>
              </Box>
            </Box>
      );
}

export default SignIn;