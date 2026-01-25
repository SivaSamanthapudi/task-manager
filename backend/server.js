const https = require('https');
const http = require('http');
const fs = require('fs');
const app = require('./app');
require('dotenv').config();
require('./config/db');

const PORT = process.env.PORT || 3000;

if (process.env.NODE_ENV === 'production') {
  // plain HTTP; ELB will handle SSL
  http.createServer(app).listen(PORT, () => {
    console.log(`🌐 Server running at http://localhost:${PORT}`);
  });
} else {
  // local development with HTTPS
  const options = {
    key: fs.readFileSync('./certs/localhost-key.pem'),
    cert: fs.readFileSync('./certs/localhost.pem')
  };
  https.createServer(options, app).listen(PORT, () => {
    console.log(`🔐 Server running at https://localhost:${PORT}`);
  });
}
