import React, { useState, useEffect } from "react";
import { Button, Box, Typography, Modal, TextField, IconButton, InputAdornment } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { supabase } from '../db/supabaseClient';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const SignIn = () => {
  const [session, setSession] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loginModalToggle, setLoginModalToggle] = useState(false);
  const [signupModalToggle, setSignupModalToggle] = useState(false);
  const [invalidPassword, setInvalidPassword] = useState('');
  const [invalidSignup, setInvalidSignup] = useState('');
  const [emailVerification, setEmailVerification] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session)
    })

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session)
    })
  }, [])

  const navigate = useNavigate();

  const handleSignUp = () => {
    setSignupModalToggle(true);
    setEmail('');
    setPassword('');
    setInvalidSignup('');
    setEmailVerification(false);
  };

  const handleSignIn = () => {
    setLoginModalToggle(true);
    setEmail('');
    setPassword('');
    setInvalidPassword('');
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

  const modalStyle = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: { xs: '90%', sm: 420 },
    bgcolor: 'background.paper',
    borderRadius: 4,
    boxShadow: '0px 24px 48px rgba(45, 52, 54, 0.16)',
    p: 5,
  };

  const inputStyle = {
    mb: 2.5,
    '& .MuiOutlinedInput-root': {
      borderRadius: 2.5,
      backgroundColor: '#F8F6F3',
      '& fieldset': {
        borderColor: 'transparent',
        borderWidth: 2,
      },
      '&:hover fieldset': {
        borderColor: '#6C9A8B',
      },
      '&.Mui-focused fieldset': {
        borderColor: '#6C9A8B',
      },
    },
    '& .MuiInputBase-input': {
      padding: '16px 18px',
      fontSize: '1rem',
      color: '#2D3436',
    },
    '& .MuiInputBase-input::placeholder': {
      color: '#B2BEC3',
      opacity: 1,
    },
  };

  const features = [
    { icon: <TaskAltIcon sx={{ fontSize: 28 }} />, text: 'Organize your tasks effortlessly' },
    { icon: <CalendarTodayIcon sx={{ fontSize: 28 }} />, text: 'Track deadlines with ease' },
    { icon: <TrendingUpIcon sx={{ fontSize: 28 }} />, text: 'Boost your productivity' },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: { xs: 'column', md: 'row' },
      }}>

      {/* Left Panel - Hero Section */}
      <Box
        sx={{
          flex: { xs: 'none', md: 1 },
          background: 'linear-gradient(135deg, #6C9A8B 0%, #4A7A6B 50%, #3D6B5D 100%)',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 4, md: 8 },
          minHeight: { xs: '40vh', md: '100vh' },
          position: 'relative',
          overflow: 'hidden',
        }}>

        {/* Decorative circles */}
        <Box
          sx={{
            position: 'absolute',
            top: -100,
            right: -100,
            width: 300,
            height: 300,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.08)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -150,
            left: -100,
            width: 400,
            height: 400,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.05)',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, textAlign: 'center', maxWidth: 480 }}>
          {/* Logo/Icon */}
          <Box
            sx={{
              width: 80,
              height: 80,
              borderRadius: 4,
              backgroundColor: 'rgba(255,255,255,0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              margin: '0 auto 32px',
              backdropFilter: 'blur(10px)',
            }}>
            <CheckCircleOutlineIcon sx={{ fontSize: 44, color: '#FFFFFF' }} />
          </Box>

          <Typography
            variant="h1"
            sx={{
              color: '#FFFFFF',
              fontSize: { xs: '2.5rem', md: '3.5rem' },
              fontWeight: 700,
              mb: 2,
              textShadow: '0px 2px 4px rgba(0,0,0,0.1)',
            }}>
            Taskify
          </Typography>

          <Typography
            variant="subtitle1"
            sx={{
              color: 'rgba(255,255,255,0.9)',
              fontSize: { xs: '1rem', md: '1.2rem' },
              fontWeight: 300,
              mb: 5,
              lineHeight: 1.6,
            }}>
            Your personal task management companion.
            Simple, beautiful, and effective.
          </Typography>

          {/* Feature list */}
          <Box sx={{ display: { xs: 'none', md: 'block' } }}>
            {features.map((feature, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  mb: 2.5,
                  color: 'rgba(255,255,255,0.9)',
                  textAlign: 'left',
                }}>
                <Box
                  sx={{
                    width: 48,
                    height: 48,
                    borderRadius: 2,
                    backgroundColor: 'rgba(255,255,255,0.12)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                  {feature.icon}
                </Box>
                <Typography sx={{ fontSize: '1.05rem', fontWeight: 400 }}>
                  {feature.text}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>

      {/* Right Panel - Auth Section */}
      <Box
        sx={{
          flex: { xs: 1, md: 1 },
          backgroundColor: '#F8F6F3',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          padding: { xs: 4, md: 8 },
          minHeight: { xs: '60vh', md: '100vh' },
        }}>

        <Box sx={{ width: '100%', maxWidth: 400 }}>
          <Typography
            variant="h2"
            sx={{
              mb: 1.5,
              color: '#2D3436',
              fontWeight: 600,
            }}>
            Get Started
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 5,
              color: '#636E72',
              fontSize: '1.1rem',
            }}>
            Create an account or sign in to continue
          </Typography>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button
              variant='contained'
              size='large'
              onClick={handleSignUp}
              sx={{
                backgroundColor: '#6C9A8B',
                color: '#FFFFFF',
                py: 1.8,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                boxShadow: '0px 4px 14px rgba(108, 154, 139, 0.35)',
                '&:hover': {
                  backgroundColor: '#5A8879',
                  boxShadow: '0px 6px 20px rgba(108, 154, 139, 0.45)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.2s ease-in-out',
              }}>
              Create Account
            </Button>

            <Button
              variant='outlined'
              size='large'
              onClick={handleSignIn}
              sx={{
                borderColor: '#2D3436',
                borderWidth: 2,
                color: '#2D3436',
                py: 1.8,
                fontSize: '1.1rem',
                fontWeight: 600,
                borderRadius: 3,
                backgroundColor: 'transparent',
                '&:hover': {
                  borderColor: '#6C9A8B',
                  borderWidth: 2,
                  backgroundColor: 'rgba(108, 154, 139, 0.08)',
                  color: '#6C9A8B',
                },
                transition: 'all 0.2s ease-in-out',
              }}>
              Sign In
            </Button>
          </Box>

          <Typography
            variant="body2"
            sx={{
              mt: 4,
              textAlign: 'center',
              color: '#B2BEC3',
              fontSize: '0.85rem',
            }}>
            By continuing, you agree to our Terms of Service
          </Typography>
        </Box>
      </Box>

      {/* Sign Up Modal */}
      <Modal
        open={signupModalToggle}
        onClose={() => setSignupModalToggle(false)}
        aria-labelledby="signup-modal"
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(45, 52, 54, 0.6)',
            backdropFilter: 'blur(4px)',
          },
        }}>
        <Box sx={modalStyle}>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: '#2D3436',
            }}>
            Create Account
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 4, color: '#636E72' }}>
            Join Taskify and start organizing your life
          </Typography>

          <form onSubmit={handleSupabaseSignup}>
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              type="email"
              sx={inputStyle}
            />
            <TextField
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Create password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="new-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#B2BEC3' }}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={inputStyle}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 1,
                py: 1.6,
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: '#6C9A8B',
                borderRadius: 2.5,
                boxShadow: '0px 4px 14px rgba(108, 154, 139, 0.3)',
                '&:hover': {
                  backgroundColor: '#5A8879',
                  boxShadow: '0px 6px 20px rgba(108, 154, 139, 0.4)',
                },
              }}>
              Sign Up
            </Button>
          </form>

          {invalidSignup && (
            <Box sx={{
              mt: 2.5,
              p: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(192, 57, 43, 0.08)',
              border: '1px solid rgba(192, 57, 43, 0.2)',
            }}>
              <Typography variant='body2' sx={{ color: '#C0392B', textAlign: 'center' }}>
                {invalidSignup}
              </Typography>
            </Box>
          )}

          {emailVerification && (
            <Box sx={{
              mt: 2.5,
              p: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(108, 154, 139, 0.1)',
              border: '1px solid rgba(108, 154, 139, 0.3)',
            }}>
              <Typography variant='body2' sx={{ color: '#4A7A6B', textAlign: 'center' }}>
                Please check your email for a verification link
              </Typography>
            </Box>
          )}

          <Typography
            variant="body2"
            sx={{ mt: 3, textAlign: 'center', color: '#636E72' }}>
            Already have an account?{' '}
            <Box
              component="span"
              onClick={() => {
                setSignupModalToggle(false);
                setLoginModalToggle(true);
              }}
              sx={{
                color: '#6C9A8B',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}>
              Sign in
            </Box>
          </Typography>
        </Box>
      </Modal>

      {/* Login Modal */}
      <Modal
        open={loginModalToggle}
        onClose={() => setLoginModalToggle(false)}
        aria-labelledby="login-modal"
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(45, 52, 54, 0.6)',
            backdropFilter: 'blur(4px)',
          },
        }}>
        <Box sx={modalStyle}>
          <Typography
            variant="h4"
            sx={{
              mb: 1,
              fontWeight: 600,
              color: '#2D3436',
            }}>
            Welcome Back
          </Typography>
          <Typography
            variant="body2"
            sx={{ mb: 4, color: '#636E72' }}>
            Sign in to continue to your dashboard
          </Typography>

          <form onSubmit={handleSupabaseLogin}>
            <TextField
              fullWidth
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email address"
              type="email"
              sx={inputStyle}
            />
            <TextField
              fullWidth
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              type={showPassword ? 'text' : 'password'}
              autoComplete="current-password"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                      sx={{ color: '#B2BEC3' }}>
                      {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={inputStyle}
            />
            <Button
              fullWidth
              variant="contained"
              type="submit"
              sx={{
                mt: 1,
                py: 1.6,
                fontSize: '1rem',
                fontWeight: 600,
                backgroundColor: '#6C9A8B',
                borderRadius: 2.5,
                boxShadow: '0px 4px 14px rgba(108, 154, 139, 0.3)',
                '&:hover': {
                  backgroundColor: '#5A8879',
                  boxShadow: '0px 6px 20px rgba(108, 154, 139, 0.4)',
                },
              }}>
              Sign In
            </Button>
          </form>

          {invalidPassword && (
            <Box sx={{
              mt: 2.5,
              p: 2,
              borderRadius: 2,
              backgroundColor: 'rgba(192, 57, 43, 0.08)',
              border: '1px solid rgba(192, 57, 43, 0.2)',
            }}>
              <Typography variant='body2' sx={{ color: '#C0392B', textAlign: 'center' }}>
                {invalidPassword}
              </Typography>
            </Box>
          )}

          <Typography
            variant="body2"
            sx={{ mt: 3, textAlign: 'center', color: '#636E72' }}>
            Don't have an account?{' '}
            <Box
              component="span"
              onClick={() => {
                setLoginModalToggle(false);
                setSignupModalToggle(true);
              }}
              sx={{
                color: '#6C9A8B',
                fontWeight: 600,
                cursor: 'pointer',
                '&:hover': { textDecoration: 'underline' },
              }}>
              Sign up
            </Box>
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
}

export default SignIn;
