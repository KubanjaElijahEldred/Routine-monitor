const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage
let tasks = [
  { _id: '1', text: 'Learn React', completed: false },
  { _id: '2', text: 'Build a todo app', completed: true },
  { _id: '3', text: 'Deploy to production', completed: false },
];

// Middleware
app.use(cors());
app.use(express.json());

// Helper to generate a simple ID
const generateId = () => Math.random().toString(36).substr(2, 9);

// Routes
app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const task = {
    _id: generateId(),
    text: req.body.text,
    completed: req.body.completed || false,
    createdAt: new Date()
  };
  
  tasks.push(task);
  res.status(201).json(task);
});

app.patch('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t._id === req.params.id);
  if (!task) return res.status(404).json({ message: 'Task not found' });
  
  if (req.body.completed !== undefined) task.completed = req.body.completed;
  if (req.body.text) task.text = req.body.text;
  
  res.json(task);
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t._id === req.params.id);
  if (taskIndex === -1) return res.status(404).json({ message: 'Task not found' });
  
  tasks = tasks.filter(t => t._id !== req.params.id);
  res.json({ message: 'Task deleted' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
