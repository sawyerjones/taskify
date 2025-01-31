// handles Today col
import React, { useEffect } from 'react';
import CheckCircleOutlinedIcon from '@mui/icons-material/CheckCircleOutlined';
import dayjs from 'dayjs';
import { Typography, IconButton } from '@mui/material';
import { supabase } from '../db/supabaseClient.js';

const TodayTodoList = ({ todos, loadTodos}) => {
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

    // filter overdue todos
    const overdueTodos = todos.filter(todo => {
      if (!todo.deadline) return false;
      const todoDate = dayjs(todo.deadline);
      return todoDate.format('YYYY-MM-DD') < dayjs().format('YYYY-MM-DD');
    });

    console.log(overdueTodos);

    // filter today's todos
    const filteredTodos = todos.filter(todo => {
      if (!todo.deadline) return false;
      const todoDate = dayjs(todo.deadline);
      return todoDate.format('YYYY-MM-DD') === dayjs().format('YYYY-MM-DD');
    });

    return(
    <div>
      <ul style={{listStyleType: 'none', margin: 0, padding: 0, color: 'black'}}>
        {overdueTodos.length === 0 ? (
            <Typography variant="body1" sx={{ textAlign: 'center', mt: 2 }}>
              Nothing Overdue
            </Typography>
          ) : (
            overdueTodos.map(todo => (
              <li key={todo.id} style={{ color: 'red', fontSize: '1.3rem',}}>
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
                {todo.title} (Overdue!)
              </li>
            ))
          )}
        </ul>
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


  /* Adding overdue todos is putting them in the upcoming filter as well */