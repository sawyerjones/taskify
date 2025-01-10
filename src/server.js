const express = require('express');
const todosRouter = require('./routes/todos');

const app = express();
app.use(express.json());

// routes
app.use('/todos', todosRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});