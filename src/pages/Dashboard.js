import React, { useState, useEffect } from 'react';
import { Typography, Box } from '@mui/material';
import Sidebar from '../components/Sidebar.jsx';
import { DashboardBox } from '../components/styles/DashboardBox.js';
import TodayTodoList from '../components/TodayTodoList.js';
import UpcomingTodoList from '../components/UpcomingTodoList.js';
import AddTodoButton from '../components/AddTodoButton.js';
import { supabase } from '../db/supabaseClient.js';

const Dashboard = () => {
  document.body.style.overflow = 'hidden';

  useEffect(() => {
    loadTodos();
  }, []);

  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      // Get the current user's session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

      // Fetch todos for the current user
      const { data: todos, error } = await supabase
        .from('todos')
        .select('*')
        .eq('user_id', session.user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setTodos(todos);
    } catch (error) {
      console.error('Failed to fetch todos:', error);
    }
  };

  return (
      <Box
        sx={{
          bgcolor: 'background.default',
          minHeight: '75vh',
          display: 'flex',
          flexDirection: 'column',
          padding: 3,
          overflow: 'hidden'
        }}>
        <Sidebar/>
        <Box sx={{ position: 'absolute', right: '4vh', top: '40px', zIndex: 1 }}>
          <AddTodoButton loadTodos={loadTodos}/>
        </Box>
        <Box sx={{ marginLeft: '6vh', position: 'relative'}}>  
          <Typography variant="h2">Dashboard</Typography>
        </Box>
        <Box // main container
          sx={{
            margin: '0.5vh',
            border: '3px solid #000',
            borderRadius: '16px',
            minHeight: '80vh',
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)', // 3 equal columns TODO: make collapsable into 2 on smaller screens
            gap: 2,
          }}>
            <Box sx={DashboardBox}>
            <Typography variant="h4" sx={{paddingLeft: '10px'}}>Today</Typography>
            <TodayTodoList todos={todos} loadTodos={loadTodos}/>
            </Box>
            <Box sx={DashboardBox}>
            <Typography variant="h4" sx={{paddingLeft: '10px'}}>Upcoming</Typography>
            <UpcomingTodoList todos={todos} loadTodos={loadTodos} />
            </Box>
            
        </Box>
      </Box>
  );
};

export default Dashboard;