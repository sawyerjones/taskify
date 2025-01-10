import React, { useState, useEffect } from 'react';
import TextField from '@mui/material/TextField';
import { useFormControl } from '@mui/material/FormControl';
import { fetchTodos, createTodo } from '../components/api.js';

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [newTitle, setNewTitle] = useState('');
    // loads after mount, fetches initial data
    useEffect(() => {
      loadTodos();
    });
  
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
    }
    return(
        <div>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="New todo..."
          />
          <button type="submit">Add Todo</button>
        </form>
  
        <ul>
          {todos.map(todo => (
            <li key={todo.id}>
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