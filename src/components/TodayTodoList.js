// handles Today col
import React, { useState, useEffect } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import dayjs from 'dayjs';
import TodoCal from './TodoCal.js';
import { Box, Typography, Modal, IconButton, TextField, Button } from '@mui/material';
import { fetchTodos, createTodo, deleteTodo } from './api.js';
import { TodoTextField } from './styles/TodoTextField.js';

const TodayTodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [todoToggle, setTodoToggle] = useState(false); 
    const [selectedDate, setSelectedDate] = useState(null);
    // loads after mount, fetches initial data
    useEffect(() => {
      loadTodos();
    }, []);
  
    const loadTodos = async () => {
      try {
        const todoData = await fetchTodos();
        setTodos(todoData); 
      } catch (error) {
        console.error('Failed to fetch todos: ', error);
      }
    };
  
    const handleSubmit = async (e) => {
      // stop page refresh
      e.preventDefault();
      try {
        if (newTitle === '') return; // TODO: improve w/ error message
        console.log('Selected date before submission:', selectedDate); // Debug log
        console.log('Selected date converted:', selectedDate); // Debug log
    
        const newTodo = await createTodo({
          title: newTitle,
          user_id: process.env.DB_USER, // UPDATE W/ ID ASSOCIATED W/ LOGIN
          deadline: selectedDate,
        });
        console.log('Todo data being sent:', newTodo); // Debug log
        // append new todo list
        setTodos([...todos, newTodo]);
        setNewTitle('');
        setSelectedDate(null);
        setTodoToggle(false);
      } catch (error) {
        console.error('Failed to create new todo: ', error);
      }
    };

    const handleDelete = async (todoID) => {
      try {
        // remove from db
        await deleteTodo(todoID);
        // remove from render
        setTodos(todos.filter(todo => todo.id !== todoID));
      } catch (error) {
        console.error('Failed to delete todo', error);
      }
    };

    const handleDateChange = (date) => {
      setSelectedDate(date);
    };

    // filter today's todos
    const filteredTodos = todos.filter(todo => {
      if (!todo.deadline) return false;
      const todoDate = dayjs(todo.deadline);
      return todoDate.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
    });

    return(
    <div>
        <Box sx={{
          marginTop: '0.5vh',
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
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
          <AddCircleOutlineOutlinedIcon sx={{marginLeft: '4px',}}/>
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
            </form>
          </Box>
        </Modal>
  
        <ul style={{listStyleType: 'none', margin: 0, padding: 0, color: 'black'}}>
        {filteredTodos.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              Nothing Due Today
            </Typography>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo.id} style={{ color: 'black', fontSize: '1.3rem',}}>
                <IconButton onClick={() => handleDelete(todo.id)}
                  sx={{
                    color: 'black',
                    paddingRight: '12px',
                    '&:hover': {
                      color: 'gray'
                    },
                  }}>
                  <CheckCircleOutlinedIcon />
                </IconButton>
                {todo.title}
              </li>
            ))
          )}
        </ul>
      </div>
    );
  };

  export default TodayTodoList;
