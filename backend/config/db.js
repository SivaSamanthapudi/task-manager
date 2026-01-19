require('dotenv').config();

const mongoose = require('mongoose');

/* MongoDB Connection */
mongoose
  .connect(
    process.env.MONGO_URI || 'mongodb+srv://admin:admin@cluster0.pfrdd6o.mongodb.net/learning',
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });
