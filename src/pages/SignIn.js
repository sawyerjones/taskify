import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Modal, TextField } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../db/supabaseClient'
import { TodoTextField } from "../components/styles/TodoTextField";

const SignIn = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginModalToggle, setLoginModalToggle] = useState(false);
  const [signupModalToggle, setSignupModalToggle] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState('');
  const [invalidSignup, setInvalidSignup] = useState('');
  const [emailVerification, setEmailVerification] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

    const navigate = useNavigate();
    //TODO: update to handle actual login capabilities
    const handleSignUp = () => {
        setSignupModalToggle(true);
        //navigate('/dashboard');
      };
    const handleSignIn = () => {
       setLoginModalToggle(true); 
    };

    const handleSupabaseSignup = async(event) => {
      event.preventDefault();
      try {
        const { data, error } = await supabase.auth.signUp({
          email: email,
          password: password,
        });
    
        if (error) {
          console.error('Signup error:', error.message);
          setInvalidSignup(error.error_description || error.message);
          return;
        }
    
        setEmailVerification(true);
      } catch (error) {
        console.error('Unexpected error:', error);
      }
    };


    const handleSupabaseLogin = async (event) => {
      event.preventDefault();
      const { data, error } = await supabase.auth.signInWithPassword({
        email: email,
        password: password,
      })
  
      if (error) {
        setInvalidPassword(error.error_description || error.message);
      } else {
        setLoginModalToggle(false);
        setInvalidPassword('');
        navigate('/dashboard');
      }

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
              Welcome to Taskify
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
            <Modal
                open={signupModalToggle}
                onClose={() => setSignupModalToggle(false)}
                aria-labelledby="modal-modal-title"
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.default',
                    border: '1px solid #000',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                  }}>
                  <form onSubmit={handleSupabaseSignup}>
                    <TextField
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email"
                      sx={TodoTextField}
                    />
                    <TextField
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      sx={TodoTextField}
                      type="password"
                      autoComplete="new-password"  // prevents autocomplete
                      inputProps={{
                        autoCapitalize: 'none',    // prevents automatic capitalization
                        'data-lpignore': true      // prevents LastPass from auto-filling
                      }}
                    />
                    <Button 
                      variant="contained"
                      type="submit"
                      sx={{ 
                        bgcolor: 'white',
                        color: 'black',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.8)',
                        }
                      }}
                    >
                      Sign Up
                    </Button>
                    </form>
                    {invalidSignup ?
                     <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '0.5vh'}}>
                     <Typography variant='body1' sx={{color: 'red'}}>{invalidSignup}</Typography>
                   </Box>
                    : null}
                    {emailVerification ?
                    <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '0.5vh'}}>
                    <Typography variant='body1' sx={{color: 'green'}}>Please check your email for a verfication link</Typography>
                  </Box>
                    : null}
                  </Box>
                </Modal>


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
              <Modal
                open={loginModalToggle}
                onClose={() => setLoginModalToggle(false)}
                aria-labelledby="modal-modal-title"
                >
                  <Box sx={{
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    bgcolor: 'background.default',
                    border: '1px solid #000',
                    borderRadius: 2,
                    boxShadow: 24,
                    p: 4,
                  }}>
                  <form onSubmit={handleSupabaseLogin}>
                    <TextField
                      fullWidth
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Enter Email"
                      sx={TodoTextField}
                    />
                    <TextField
                      fullWidth
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password"
                      sx={TodoTextField}
                      type="password"
                      autoComplete="new-password"  // prevents autocomplete
                      inputProps={{
                        autoCapitalize: 'none',    // prevents automatic capitalization
                        'data-lpignore': true      // prevents LastPass from auto-filling
                      }}
                    />
                    <Button 
                      variant="contained"
                      type="submit"
                      sx={{ 
                        bgcolor: 'white',
                        color: 'black',
                        '&:hover': {
                          bgcolor: 'rgba(255, 255, 255, 0.8)',
                        }
                      }}
                    >
                      Log In
                    </Button>
                    </form>
                    {invalidPassword ?
                     <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '0.5vh'}}>
                     <Typography variant='body1' sx={{color: 'red'}}>{invalidPassword}</Typography>
                   </Box>
                    : null}
                  </Box>
                </Modal>
              </Box>
            </Box>
      );
}

export default SignIn;