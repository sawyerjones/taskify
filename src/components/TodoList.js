import React, { useState, useEffect } from 'react';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import TextField from '@mui/material/TextField';
import { fetchTodos, createTodo, deleteTodo } from '../components/api.js';
import { IconButton } from '@mui/material';
import { TodoTextField } from './TodoTextField.js';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
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
        <form onSubmit={handleSubmit}>
        <IconButton
        type='submit'
        sx={{
          color: 'white',
          '&:hover': {
            color: 'gray'
          },
          marginTop: '0.5vh',
        }}>
        <AddCircleOutlineOutlinedIcon />
      </IconButton>
          <TextField
          id="outlined-flexible"
          label=""
          maxRows={1}
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          sx={TodoTextField}
        />
        </form>
  
        <ul style={{listStyleType: 'none', margin: 0, padding: 0, color: 'white'}}>
          {todos.map(todo => (
            <li key={todo.id}>
              <IconButton onClick={() => handleDelete(todo.id)}
                sx={{
                  color: 'white',
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
  - dont allow blank todos
  - allow completetion (deletion) of exisisting todos
  - styling
  */
