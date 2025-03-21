import React, { useState } from 'react';
import { Box, Typography, Modal, IconButton, TextField, Button } from '@mui/material';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CloseIcon from '@mui/icons-material/Close';
import TodoCal from './TodoCal';
import { TodoTextField } from './styles/TodoTextField';
import { supabase } from '../db/supabaseClient';  // Add this import

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
      // get current session
      const { data: { session } } = await supabase.auth.getSession();
      if (!session) {
        setInputError('You must be logged in to create todos');
        return;
      }

      // insert the new todo into supabase
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
        marginTop: '0.5vh',
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        ...buttonStyle
      }}>
        <IconButton 
          onClick={() => setTodoToggle(true)}
          sx={{
            color: 'black',
            padding: '8px 16px',
            borderRadius: '8px',
            bgcolor: 'grey',
            width: 'auto',
            minWidth: 'fit-content',
            maxWidth: '80%',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, .5)',
              color: 'black',
            },
          }}>
          <AddCircleOutlineOutlinedIcon />
          <Typography variant="h5">Add New Todo</Typography>
          <AddCircleOutlineOutlinedIcon sx={{ marginLeft: '4px' }}/>
        </IconButton>
      </Box>

      <Modal
        open={todoToggle}
        onClose={() => setTodoToggle(false)}
        aria-labelledby="modal-modal-title"
      >
        <Box sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.default',
          border: '1px solid #000',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
        }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
            <Typography id="modal-modal-title" variant="h6" sx={{ color: 'black' }}>
              Create New Todo
            </Typography>
            <IconButton 
              onClick={() => setTodoToggle(false)}
              sx={{ color: 'black' }}
            >
              <CloseIcon />
            </IconButton>
          </Box>
          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="Task name"
              sx={TodoTextField}
            />
            <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
              <TodoCal 
                selectedDate={selectedDate}
                onDateChange={handleDateChange}
              />
              <Button 
                variant="contained"
                type="submit"
                sx={{ 
                  bgcolor: 'white',
                  color: 'black',
                  '&:hover': {
                    bgcolor: 'rgba(255, 255, 255, 0.8)',
                  }
                }}
              >
                Add Todo
              </Button>
            </Box>
            {inputError ? 
              <Box sx={{display: 'flex', justifyContent: 'center', marginTop: '0.5vh'}}>
                <Typography variant='body1' sx={{color: 'red'}}>{inputError}</Typography>
              </Box>
            : null}
          </form>
        </Box>
      </Modal>
    </>
  );
};

export default AddTodoButton;