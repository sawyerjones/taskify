import React from 'react';
import { Typography, Box } from '@mui/material';
import { ThemeProvider } from '@emotion/react';
import theme from '../components/theme.js'


const Dashboard = () => {
  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 3
        }}>
        <Typography variant="h4">Dashboard</Typography>
      </Box>
    </ThemeProvider>
  );
};

export default Dashboard;