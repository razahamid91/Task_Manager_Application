const express = require('express');
const mysql = require('mysql2');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 5080; // Adjust port as needed

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL Connection
const db = mysql.createConnection({
  host: 'localhost',   // Replace with your MySQL host
  port: 5050,           // Replace with your MySQL port
  user: 'root',         // Replace with your MySQL username
  password: '1234',     // Replace with your MySQL password
  database: 'taskmanager'
});

db.connect(err => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    process.exit(1); // Exit process on connection error
  }
  console.log('Connected to MySQL database.');
});

// Create tasks table if not exists
db.query(
  `CREATE TABLE IF NOT EXISTS tasks (
    id INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    dueDate DATE
  )`,
  (err, results) => {
    if (err) {
      console.error('Error creating tasks table:', err);
      process.exit(1); // Exit process on table creation error
    }
    console.log('Tasks table created or already exists.');
  }
);

// Middleware for input validation 
function validateTaskInput(req, res, next) {
  const { title, dueDate } = req.body;
  if (!title || !dueDate) {
    return res.status(400).json({ error: 'Title and dueDate are required' });
  }
  next();
}

// CRUD operations
app.get('/api/tasks', (req, res) => {
  db.query('SELECT * FROM tasks', (err, results) => {
    if (err) {
      console.error('Error retrieving tasks:', err);
      return res.status(500).json({ error: 'Error retrieving tasks' });
    }
    res.json(results);
  });
});

app.post('/api/tasks', validateTaskInput, (req, res) => {
  const { title, description, dueDate } = req.body;
  db.query('INSERT INTO tasks (title, description, dueDate) VALUES (?, ?, ?)', [title, description, dueDate], (err, results) => {
    if (err) {
      console.error('Error creating task:', err);
      return res.status(500).json({ error: 'Error creating task' });
    }
    res.json({ id: results.insertId, title, description, dueDate });
  });
});

app.get('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('SELECT * FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error retrieving task:', err);
      return res.status(500).json({ error: 'Error retrieving task' });
    }
    if (results.length === 0) {
      return res.status(404).json({ error: 'Task not found' });
    }
    res.json(results[0]);
  });
});

app.put('/api/tasks/:id', validateTaskInput, (req, res) => {
  const { id } = req.params;
  const { title, description, dueDate } = req.body;
  db.query('UPDATE tasks SET title = ?, description = ?, dueDate = ? WHERE id = ?', [title, description, dueDate, id], (err, results) => {
    if (err) {
      console.error('Error updating task:', err);
      return res.status(500).json({ error: 'Error updating task' });
    }
    res.json({ id, title, description, dueDate });
  });
});

app.delete('/api/tasks/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM tasks WHERE id = ?', [id], (err, results) => {
    if (err) {
      console.error('Error deleting task:', err);
      return res.status(500).json({ error: 'Error deleting task' });
    }
    res.json({ message: 'Task deleted' });
  });
});

// Error handling middleware (must be placed after all routes )
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
