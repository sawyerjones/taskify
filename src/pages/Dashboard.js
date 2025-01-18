import React from 'react';
import { Typography, Box } from '@mui/material';
import Sidebar from '../components/Sidebar.jsx';
import { DashboardBox } from '../components/DashboardBox.js';
import TodoList from '../components/TodoList.js';

const Dashboard = () => {
  document.body.style.overflow = 'hidden';
  return (
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          overflow: 'hidden'
        }}>
        <Sidebar/>
        <Box sx={{ marginLeft: '5vh', position: 'relative'}}>  
          <Typography variant="h2">Dashboard</Typography>
        </Box>
        <Box // main container
          sx={{
            margin: '0.5vh',
            border: '3px solid #000',
            borderRadius: '16px',
            minHeight: '80vh',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // 4 equal columns TODO: make collapsable into 2 on smaller screens
            gap: 2,
          }}>
            <Box sx={DashboardBox}>
            <Typography variant="h4" sx={{paddingLeft: '10px'}}>Today</Typography>
            <TodoList></TodoList>
            </Box>
            <Box sx={DashboardBox}>
            <Typography variant="h4" sx={{paddingLeft: '10px'}}>Projects</Typography>
            </Box>
            <Box sx={DashboardBox}>
            <Typography variant="h4" sx={{paddingLeft: '10px'}}>Upcoming</Typography>
            </Box>
            <Box sx={DashboardBox}>
            <Typography variant="h4" sx={{paddingLeft: '10px'}}>TBD</Typography>
            </Box>
            
        </Box>
      </Box>
  );
};

export default Dashboard;

/*
Add calendar input
*/