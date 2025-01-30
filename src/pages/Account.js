import React, { useState, useEffect } from 'react';
import { Typography, Box, Button, TextField, Modal } from '@mui/material';
import { supabase } from '../db/supabaseClient';
import Sidebar from '../components/Sidebar';
import { TodoTextField } from '../components/styles/TodoTextField';
import { useNavigate } from 'react-router-dom';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [resetPasswordToggle, setResetPasswordToggle] = useState(false);
  const [passwordMatch, setPasswordMatch] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      if (session?.user) {
        setUser(session.user);
        setEmail(session.user.email);
      }
      setLoading(false);
    };

    fetchUser();

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      if (session?.user) {
        setUser(session.user);
        setEmail(session.user.email);
      }
    });

    return () => subscription?.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) throw error;
    } catch (error) {
      console.error('Error signing out:', error.message);
    }

    navigate('/');
  };

  const handlePasswordReset = async (event) => {
    event.preventDefault();
    if (newPassword !== passwordConfirmation) {
      setPasswordMatch(false);
    } 

    await supabase.auth.updateUser({ password: newPassword });
    setPasswordMatch(true);
    setResetPasswordToggle(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Typography>Loading...</Typography>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        bgcolor: 'background.default',
        minHeight: '75vh',
        display: 'flex',
        flexDirection: 'column',
        padding: 3,
        overflow: 'hidden'
      }}
    >
      <Sidebar />
      <Box sx={{ marginLeft: '5vh', position: 'relative', mb: 4 }}>
        <Typography variant="h2">Account Settings</Typography>
      </Box>
      
      <Box 
        sx={{ 
          margin: '0.5vh',
          minHeight: '80vh',
          padding: 4,
          marginLeft: '5vh'
        }}
      >
        <Box sx={{ maxWidth: '600px', width: '100%' }}>
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Email Address</Typography>
            <Typography variant="body1">{email}</Typography>
          </Box>

          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" sx={{ mb: 2 }}>Account Security</Typography>
            <Button 
              variant="contained"
              onClick={() => setResetPasswordToggle(true)}
              sx={{ 
                mr: 2,
                bgcolor: 'white',
                color: 'black',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            >
              Reset Password
            </Button>
            <Button 
              variant="contained" 
              onClick={handleSignOut}
              sx={{ 
                bgcolor: 'white',
                color: 'black',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.8)',
                }
              }}
            >
              Sign Out
            </Button>
            <Modal
              open={resetPasswordToggle}
              onClose={() => setResetPasswordToggle(false)}
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
                    <form onSubmit={handlePasswordReset}>
                    <TextField
                      fullWidth
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter New Password"
                      sx={TodoTextField}
                      type="password"
                      autoComplete="new-password"  // prevents autocomplete
                      inputProps={{
                        autoCapitalize: 'none',    // prevents automatic capitalization
                        'data-lpignore': true      // prevents LastPass from auto-filling
                      }}
                    />
                    <TextField
                      fullWidth
                      value={passwordConfirmation}
                      onChange={(e) => setPasswordConfirmation(e.target.value)}
                      placeholder="Confirm Password"
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
                      Submit
                    </Button>
                    {!passwordMatch ?
                     <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '0.5vh'}}>
                      <Typography variant='body1' sx={{color: 'red'}}>Please make sure the provided passwords match!</Typography>
                    </Box>
                    : null}
                    </form>
                  </Box>
              </Modal>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default AccountPage;