import React from 'react';
import { Typography, Box } from '@mui/material';
import Sidebar from '../components/Sidebar.jsx';

const Dashboard = () => {
  return (
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 3
        }}>
        <Sidebar/>
        <Box sx={{ marginLeft: '5vh' }}>  
          <Typography variant="h4">Dashboard</Typography>
        </Box>
        <Box
          sx={{
            marginTop: '0.5vh',
            border: '3px solid #000',
            borderRadius: '16px',
            minHeight: '80vh'
          }}>

        </Box>
      </Box>
  );
};

export default Dashboard;