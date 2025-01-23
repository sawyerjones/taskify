// handles Today col
import React, { useState, useEffect } from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import dayjs from 'dayjs';
import { Typography, IconButton } from '@mui/material';
import { fetchTodos, deleteTodo } from './api.js';
import AddTodoButton from './AddTodoButton.js';

const TodayTodoList = () => {
    const [todos, setTodos] = useState([]);
    // loads after mount, fetches initial data
    useEffect(() => {
      loadTodos();
    }, []);

    // checks every hour for the date to ensure proper due/overdue
    useEffect(() => {
      const timer = setInterval(() => {
        setTodos(prevTodos => [...prevTodos]);
      }, 3600000); // ms
    
      return () => clearInterval(timer);
    }, []);
  
    const loadTodos = async () => {
      try {
        const todoData = await fetchTodos();
        setTodos(todoData); 
      } catch (error) {
        console.error('Failed to fetch todos: ', error);
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

    // filter today's todos
    const filteredTodos = todos.filter(todo => {
      if (!todo.deadline) return false;
      const todoDate = dayjs(todo.deadline);
      return todoDate.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
    });

    return(
    <div>
        <AddTodoButton loadTodos={loadTodos} />
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
