import React, { useState, useEffect } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import CloseIcon from '@mui/icons-material/Close';
import { Box, Typography, Modal, IconButton, TextField, Button } from '@mui/material';
import { fetchTodos, createTodo, deleteTodo } from '../components/api.js';
import { TodoTextField } from './TodoTextField.js';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    const [todoToggle, setTodoToggle] = useState(false); 
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
        const newTodo = await createTodo({
          title: newTitle,
          user_id: process.env.DB_USER, // UPDATE W/ ID ASSOCIATED W/ LOGIN
        });
        // append new todo list
        setTodos([...todos, newTodo]);
        setNewTitle('');
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
            bgcolor: 'rgba(255, 255, 255, 0.5)',
            '&:hover': {
              bgcolor: 'rgba(255, 255, 255, 1)',
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
                <Button 
                  variant="contained"
                  type="submit"
                  sx={{ 
                    bgcolor: 'white',
                    color: 'primary.main !important',
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
          {todos.map(todo => (
            <li key={todo.id}>
              <IconButton onClick={() => handleDelete(todo.id)}
                sx={{
                  color: 'black',
                  '&:hover': {
                    color: 'gray'
                  },
                }}>
                <CheckCircleOutlinedIcon />
              </IconButton>
              {todo.title}

            </li>
          ))}
        </ul>
      </div>
    );
  };

  export default TodoList;
/*
  - styling
*/
