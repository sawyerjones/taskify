import React, { useState, useEffect } from 'react';
import { Typography, Box, Paper } from '@mui/material';
import Sidebar from '../components/Sidebar.jsx';
import TodayTodoList from '../components/TodayTodoList.js';
import UpcomingTodoList from '../components/UpcomingTodoList.js';
import AddTodoButton from '../components/AddTodoButton.js';
import { supabase } from '../db/supabaseClient.js';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import ScheduleIcon from '@mui/icons-material/Schedule';

const Dashboard = () => {
  document.body.style.overflow = 'hidden';

  useEffect(() => {
    loadTodos();
  }, []);

  const [todos, setTodos] = useState([]);

  const loadTodos = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) return;

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

  const todayCount = todos.filter(todo => {
    const today = new Date();
    const dueDate = new Date(todo.due_date);
    return dueDate.toDateString() === today.toDateString();
  }).length;

  const upcomingCount = todos.filter(todo => {
    const today = new Date();
    const dueDate = new Date(todo.due_date);
    return dueDate > today;
  }).length;

  return (
    <Box
      sx={{
        bgcolor: '#F8F6F3',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
      }}>

      <Sidebar />

      {/* Header Section */}
      <Box
        sx={{
          background: 'linear-gradient(135deg, #6C9A8B 0%, #4A7A6B 100%)',
          pt: { xs: 8, md: 6 },
          pb: { xs: 4, md: 5 },
          px: { xs: 3, md: 6 },
          position: 'relative',
          overflow: 'hidden',
        }}>

        {/* Decorative elements */}
        <Box
          sx={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 200,
            height: 200,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.06)',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            bottom: -80,
            left: '30%',
            width: 250,
            height: 250,
            borderRadius: '50%',
            background: 'rgba(255,255,255,0.04)',
          }}
        />

        <Box sx={{ position: 'relative', zIndex: 1, maxWidth: 1400, mx: 'auto' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <Box>
              <Typography
                variant="h2"
                sx={{
                  color: '#FFFFFF',
                  fontWeight: 700,
                  fontSize: { xs: '1.75rem', md: '2.25rem' },
                  mb: 1,
                }}>
                Dashboard
              </Typography>
              <Typography
                sx={{
                  color: 'rgba(255,255,255,0.8)',
                  fontSize: '1rem',
                  fontWeight: 400,
                }}>
                {new Date().toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </Typography>
            </Box>

            <Box sx={{ mt: { xs: 0, md: 1 } }}>
              <AddTodoButton loadTodos={loadTodos} />
            </Box>
          </Box>

          {/* Quick Stats */}
          <Box
            sx={{
              display: 'flex',
              gap: 3,
              mt: 4,
              flexWrap: 'wrap',
            }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                px: 2.5,
                py: 1.5,
              }}>
              <CalendarTodayIcon sx={{ color: '#FFFFFF', fontSize: 22 }} />
              <Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 500 }}>
                  Today
                </Typography>
                <Typography sx={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 600 }}>
                  {todayCount} tasks
                </Typography>
              </Box>
            </Box>

            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                backgroundColor: 'rgba(255,255,255,0.15)',
                backdropFilter: 'blur(10px)',
                borderRadius: 3,
                px: 2.5,
                py: 1.5,
              }}>
              <ScheduleIcon sx={{ color: '#FFFFFF', fontSize: 22 }} />
              <Box>
                <Typography sx={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.75rem', fontWeight: 500 }}>
                  Upcoming
                </Typography>
                <Typography sx={{ color: '#FFFFFF', fontSize: '1.25rem', fontWeight: 600 }}>
                  {upcomingCount} tasks
                </Typography>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          flex: 1,
          px: { xs: 2, md: 6 },
          py: { xs: 3, md: 4 },
          maxWidth: 1400,
          mx: 'auto',
          width: '100%',
          boxSizing: 'border-box',
        }}>

        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', lg: 'repeat(2, 1fr)' },
            gap: { xs: 3, md: 4 },
            height: { lg: 'calc(100vh - 280px)' },
          }}>

          {/* Today Card */}
          <Paper
            elevation={0}
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: 4,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(45, 52, 54, 0.06)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 8px 30px rgba(45, 52, 54, 0.08)',
              },
            }}>

            {/* Card Header */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                borderBottom: '1px solid rgba(45, 52, 54, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: 'rgba(108, 154, 139, 0.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <CalendarTodayIcon sx={{ color: '#6C9A8B', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: '#2D3436',
                    fontSize: '1.15rem',
                  }}>
                  Today
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    color: '#B2BEC3',
                  }}>
                  {todayCount} {todayCount === 1 ? 'task' : 'tasks'} to complete
                </Typography>
              </Box>
            </Box>

            {/* Card Content */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                px: 2,
                py: 2,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#DFE6E9',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#B2BEC3',
                },
              }}>
              <TodayTodoList todos={todos} loadTodos={loadTodos} />
            </Box>
          </Paper>

          {/* Upcoming Card */}
          <Paper
            elevation={0}
            sx={{
              backgroundColor: '#FFFFFF',
              borderRadius: 4,
              overflow: 'hidden',
              display: 'flex',
              flexDirection: 'column',
              border: '1px solid rgba(45, 52, 54, 0.06)',
              transition: 'box-shadow 0.3s ease-in-out',
              '&:hover': {
                boxShadow: '0px 8px 30px rgba(45, 52, 54, 0.08)',
              },
            }}>

            {/* Card Header */}
            <Box
              sx={{
                px: 3,
                py: 2.5,
                borderBottom: '1px solid rgba(45, 52, 54, 0.06)',
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
              }}>
              <Box
                sx={{
                  width: 40,
                  height: 40,
                  borderRadius: 2,
                  backgroundColor: 'rgba(212, 165, 116, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}>
                <ScheduleIcon sx={{ color: '#D4A574', fontSize: 20 }} />
              </Box>
              <Box>
                <Typography
                  variant="h5"
                  sx={{
                    fontWeight: 600,
                    color: '#2D3436',
                    fontSize: '1.15rem',
                  }}>
                  Upcoming
                </Typography>
                <Typography
                  sx={{
                    fontSize: '0.8rem',
                    color: '#B2BEC3',
                  }}>
                  {upcomingCount} {upcomingCount === 1 ? 'task' : 'tasks'} scheduled
                </Typography>
              </Box>
            </Box>

            {/* Card Content */}
            <Box
              sx={{
                flex: 1,
                overflow: 'auto',
                px: 2,
                py: 2,
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: '#DFE6E9',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: '#B2BEC3',
                },
              }}>
              <UpcomingTodoList todos={todos} loadTodos={loadTodos} />
            </Box>
          </Paper>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
