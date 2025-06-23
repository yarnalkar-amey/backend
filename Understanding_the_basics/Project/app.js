const http = require('http');
const fs = require('fs');
const path = require('path');
const { URLSearchParams } = require('url');

const users = JSON.parse(fs.readFileSync('./users.json', 'utf-8'));

const server = http.createServer((req, res) => {
  // Serve login page
  if (req.method === 'GET' && req.url === '/') {
    const filePath = path.join(__dirname, 'public', 'login.html');
    fs.readFile(filePath, (err, content) => {
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(content);
    });
    return;
  }

  // Handle login
  if (req.method === 'POST' && req.url === '/login') {
    const chunks = [];
    req.on('data', chunk => chunks.push(chunk));
    req.on('end', () => {
      const body = Buffer.concat(chunks).toString();
      const form = new URLSearchParams(body);
      const username = form.get('username');
      const password = form.get('password');

      if (users[username] && users[username] === password) {
        // Correct login
        res.writeHead(302, { Location: '/home' });
      } else {
        // Wrong login
        res.writeHead(302, { Location: '/error' });
      }
      res.end();
    });
    return;
  }

  // Success page
  if (req.url === '/home') {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('✅ Login successful. Welcome, Amey!');
    return;
  }

  // Error page
  if (req.url === '/error') {
    res.writeHead(401, { 'Content-Type': 'text/plain' });
    res.end('❌ Invalid credentials. Try again.');
    return;
  }

  // 404
  res.writeHead(404, { 'Content-Type': 'text/plain' });
  res.end('Page not found');
});

server.listen(3000, () => {
  console.log('🚀 Server running at http://localhost:3000');
});
