import { API_BASE_URL } from '../config/api';

export const fetchTodos = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`);
    if (!response.ok) throw new Error('Failed to fetch todos');
    return await response.json();
  } catch (error) {
    console.error('Error fetching todos:', error);
    throw error;
  }
};

export const createTodo = async (todoData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todoData),
    });
    if (!response.ok) throw new Error('Failed to create todo');
    return await response.json();
  } catch (error) {
    console.error('Error creating todo:', error);
    throw error;
  }
};