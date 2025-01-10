const express = require('express');
const cors = require('cors');
const todosRouter = require('./routes/todos');

const app = express();

app.use(cors());
app.use(express.json());

// routes
app.use('/todos', todosRouter);

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Database server running on port ${PORT}`);
});