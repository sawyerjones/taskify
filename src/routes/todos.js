const express = require('express');
const router = express.Router();
const pool = require('../db');

// creates todo
router.post('/', async (req, res) => {
  try {
    const { title, user_id } = req.body;
    const newTodo = await pool.query(
      'INSERT INTO todos (title, user_id) VALUES ($1, $2) RETURNING *',
      [title, user_id]
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
    console.error(err);
    res.status(500).send('Server error');
  }
});

module.exports = router;