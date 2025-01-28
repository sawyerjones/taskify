import React, { useState, useEffect } from 'react';
import { Typography, Box, Button } from '@mui/material';
import { supabase } from '../db/supabaseClient';
import Sidebar from '../components/Sidebar';

const AccountPage = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [updateError, setUpdateError] = useState('');
  const [updateSuccess, setUpdateSuccess] = useState('');

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
              onClick={() => {
                const { data } = supabase.auth.resetPasswordForEmail(email);
                setUpdateSuccess('Password reset email sent!');
              }}
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
          </Box>

          {updateError && (
            <Typography color="red" sx={{ mb: 2 }}>
              {updateError}
            </Typography>
          )}

          {updateSuccess && (
            <Typography color="green" sx={{ mb: 2 }}>
              {updateSuccess}
            </Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AccountPage;