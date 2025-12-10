import React, { useState } from 'react';
import { Box, Typography, Modal, IconButton, TextField, Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import CloseIcon from '@mui/icons-material/Close';
import TodoCal from './TodoCal';
import { TodoTextField } from './styles/TodoTextField';
import { supabase } from '../db/supabaseClient';

const AddTodoButton = ({ loadTodos, buttonStyle }) => {
  const [newTitle, setNewTitle] = useState('');
  const [todoToggle, setTodoToggle] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [inputError, setInputError] = useState('')

  const handleSubmit = async (e) => {
    e.preventDefault();
    setInputError('');
    if (newTitle === '') {
      setInputError('Please enter a task title');
      return;
    }
    if (!selectedDate) {
      setInputError('Please enter a deadline');
      return;
    }
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setInputError('You must be logged in to create todos');
        return;
      }

      const { error } = await supabase
        .from('todos')
        .insert({
          title: newTitle,
          user_id: session.user.id,
          deadline: selectedDate,
          completed: false
        });

      if (error) throw error;

      setTodoToggle(false);
      await loadTodos();
      setNewTitle('');
      setSelectedDate(null);
    } catch (error) {
      console.error('Failed to create new todo:', error);
      setInputError('Failed to create todo. Please try again.');
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <>
      <Box sx={{
        display: 'flex',
        justifyContent: 'center',
        ...buttonStyle
      }}>
        <Button
          variant="contained"
          onClick={() => setTodoToggle(true)}
          startIcon={<AddIcon sx={{ fontSize: 20 }} />}
          sx={{
            backgroundColor: '#FFFFFF',
            color: '#2D3436',
            fontWeight: 600,
            fontSize: '0.95rem',
            padding: '10px 20px',
            borderRadius: 3,
            boxShadow: '0px 4px 14px rgba(45, 52, 54, 0.12)',
            transition: 'all 0.2s ease-in-out',
            '&:hover': {
              backgroundColor: '#FFFFFF',
              boxShadow: '0px 6px 20px rgba(45, 52, 54, 0.18)',
              transform: 'translateY(-2px)',
            },
          }}>
          Add Task
        </Button>
      </Box>

      <Modal
        open={todoToggle}
        onClose={() => setTodoToggle(false)}
        aria-labelledby="add-todo-modal"
        sx={{
          '& .MuiBackdrop-root': {
            backgroundColor: 'rgba(45, 52, 54, 0.6)',
            backdropFilter: 'blur(4px)',
          },
        }}
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: { xs: '90%', sm: 440 },
          bgcolor: '#FFFFFF',
          borderRadius: 4,
          boxShadow: '0px 24px 48px rgba(45, 52, 54, 0.16)',
          p: 4,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
            <Box>
              <Typography
                variant="h5"
                sx={{
                  fontWeight: 600,
                  color: '#2D3436',
                  fontSize: '1.25rem',
                }}>
                Create New Task
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: '#B2BEC3', mt: 0.5 }}>
                Add a task to your todo list
              </Typography>
            </Box>
            <IconButton
              onClick={() => setTodoToggle(false)}
              sx={{
                color: '#B2BEC3',
                '&:hover': {
                  backgroundColor: 'rgba(45, 52, 54, 0.08)',
                  color: '#636E72',
                },
              }}
            >
              <CloseIcon />
            </IconButton>
          </Box>

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="What needs to be done?"
              sx={{
                ...TodoTextField,
                mb: 3,
              }}
            />

            <Box sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              gap: 2,
            }}>
              <TodoCal
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
              <Button
                variant="contained"
                type="submit"
                sx={{
                  backgroundColor: '#6C9A8B',
                  color: '#FFFFFF',
                  fontWeight: 600,
                  px: 3,
                  py: 1.25,
                  borderRadius: 2.5,
                  boxShadow: '0px 4px 14px rgba(108, 154, 139, 0.3)',
                  '&:hover': {
                    backgroundColor: '#5A8879',
                    boxShadow: '0px 6px 20px rgba(108, 154, 139, 0.4)',
                  },
                }}
              >
                Add Task
              </Button>
            </Box>

            {inputError && (
              <Box sx={{
                mt: 2.5,
                p: 2,
                borderRadius: 2,
                backgroundColor: 'rgba(192, 57, 43, 0.08)',
                border: '1px solid rgba(192, 57, 43, 0.2)',
              }}>
                <Typography variant='body2' sx={{ color: '#C0392B', textAlign: 'center' }}>
                  {inputError}
                </Typography>
              </Box>
            )}
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddTodoButton;
