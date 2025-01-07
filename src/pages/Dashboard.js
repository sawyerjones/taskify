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
        <Typography variant="h4">Dashboard</Typography>
        <Sidebar/>
      </Box>
  );
};

export default Dashboard;