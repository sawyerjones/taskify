const express = require('express');
const router = express.Router();
const pool = require('../db');

// creates todo
router.post('/', async (req, res) => {
  try {
    const { title, user_id, deadline } = req.body;
    console.log('Received in backend:', { title, user_id, deadline }); // Debug log
    const newTodo = await pool.query(
      'INSERT INTO todos (title, user_id, deadline) VALUES ($1, $2, $3) RETURNING *',
      [title, user_id, deadline]
    );
    res.json(newTodo.rows[0]);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// get all
router.get('/', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todos');
    res.json(allTodos.rows);
  } catch (err) {
    console.error(err);
    res.status(500).send('Server error');
  }
});

// delete
router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query(
      'DELETE FROM todos WHERE id = $1',
      [id]
    );
    res.json({ message: "Todo deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).send('Server error');
  }
});

module.exports = router;