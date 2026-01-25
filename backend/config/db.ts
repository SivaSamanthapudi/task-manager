require('dotenv').config();
import mongoose from 'mongoose';


/* MongoDB Connection */
mongoose
  .connect(
    process.env['MONGO_URI'] ||
      `mongodb+srv://${process.env['DB_USERNAME']}:${process.env['DB_PASSWORD']}@cluster0.pfrdd6o.mongodb.net/learning`,
  )
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err);
  });
