import React, { useEffect } from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import dayjs from 'dayjs';
import { Typography, IconButton } from '@mui/material';
import { supabase } from '../db/supabaseClient.js';

const TodoList = ({ todos, loadTodos}) => {
   // loads after mount, fetches initial data
   useEffect(() => {
    loadTodos();
  }, []);

  const handleDelete = async (id) => {
    try {
      const { error } = await supabase
        .from('todos')
        .delete()
        .eq('id', id);
  
      if (error) throw error;
      
      loadTodos();
    } catch (error) {
      console.error('Failed to delete todo:', error);
    }
  };

    // filter upcoming todos
    const filteredTodos = todos.filter(todo => {
      if (!todo.deadline) return false;
      const todoDate = dayjs(todo.deadline);
      return todoDate.format('YYYY-MM-DD') > dayjs().format('YYYY-MM-DD');
    });

    return(
    <div>
        <ul style={{listStyleType: 'none', margin: 0, padding: 0, color: '#354042'}}>
        {filteredTodos.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
             No Upcoming Tasks
            </Typography>
          ) : (
            filteredTodos.map(todo => (
              <li key={todo.id} style={{ color: '#354042', fontSize: '1.3rem',}}>
                <IconButton onClick={() => handleDelete(todo.id)}
                  sx={{
                    color: '#354042',
                    paddingRight: '12px',
                    '&:hover': {
                      color: '#889063'
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

  export default TodoList;
