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
        <Box sx={{ marginLeft: '5vh', marginBottom: '2vh' }}>  
          <Typography variant="h4">Dashboard</Typography>
        </Box>
        <Box // main container
          sx={{
            margin: '0.5vh',
            border: '3px solid #000',
            borderRadius: '16px',
            minHeight: '80vh',
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)', // 2 equal columns
            //gridTemplate: 'repeat(2, 1fr)',
            gap: 2,
            //padding: 1  
          }}>
            <Box sx={DashboardBox}>
            <Typography variant="h4">Today</Typography>
            <TodoList></TodoList>
            </Box>
            <Box sx={DashboardBox}>
            <Typography variant="h4">Projects</Typography>
            </Box>
            <Box sx={DashboardBox}>
            <Typography variant="h4">Upcoming</Typography>
            </Box>
            <Box sx={DashboardBox}>
            <Typography variant="h4">TBD</Typography>
            </Box>
            
        </Box>
      </Box>
  );
};

export default Dashboard;

/*
Make add todo just a '+', on press modal with large, detailed creation window
Make 4 columns collapse into 2 on smaller screen widths
*/