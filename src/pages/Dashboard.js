import React from 'react';
import { Typography, Box } from '@mui/material';
import Sidebar from '../components/Sidebar.jsx';
import { DashboardBox } from '../components/DashboardBox';

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
        <Box // Main container
          sx={{
            marginTop: '0.5vh',
            border: '3px solid #000',
            borderRadius: '16px',
            minHeight: '80vh',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // 2 equal columns
            //gridTemplate: 'repeat(2, 1fr)',
            gap: 2,
            padding: 2  
          }}>
            <Box sx={DashboardBox}>
            <Typography variant="h4">Today</Typography>
            </Box>
            <Box sx={DashboardBox}>
            <Typography variant="h4">Today</Typography>
            </Box>
            
        </Box>
      </Box>
  );
};

export default Dashboard;