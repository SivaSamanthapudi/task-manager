require('dotenv').config();
const express = require('express');
const cors = require('cors');

const postsRoutes = require('./routes/posts.routes');
const tasksRoutes = require('./routes/tasks.routes');
const userRoutes = require('./routes/user.routes');

const app = express();

// 🔹 Global middleware
app.use(cors());
app.use(express.json());

// 🔹 Routes
app.use('/api/posts', postsRoutes);
app.use('/api/tasks', tasksRoutes);
app.use('/api/user', userRoutes);

// 🔹 Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Something broke!' });
});

// 🔹 404 handler
app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

module.exports = app;
