import https from 'https';
import http from 'http';
import { createServer } from 'http';
import fs from 'fs';
import app from './app';
import './config/db';
import dotenv from 'dotenv';
import path from 'path';
import { connectDB } from './config/db';

dotenv.config();
const httpServer = createServer(app);
const PORT = process.env['PORT'] || 3000;

if (process.env['NODE_ENV'] === 'production') {
  http.createServer(app).listen(PORT, () => {
    console.log(`🌐 Server running on port ${PORT}`);
  });
} else {

const options = {
  key: fs.readFileSync(path.join(__dirname, 'certs', 'localhost-key.pem')),
  cert: fs.readFileSync(path.join(__dirname, 'certs', 'localhost.pem'))
};

connectDB()
  .then(() => {
    httpServer.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
  })
  .catch((err: unknown) => {
    console.error('Failed to connect to MongoDB:', err);
    process.exit(1);
  });
}