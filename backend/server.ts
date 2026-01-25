import https from 'https';
import http from 'http';
import fs from 'fs';
import app from './app';
import './config/db';
import dotenv from 'dotenv';
import path from 'path';

dotenv.config();
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
  https.createServer(options, app).listen(PORT, () => {
    console.log(`🔐 HTTPS Server running on port ${PORT}`);
  });
}