const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const server = express();

// Import custom middleware, "cLog"
server.use(clog);

// Middleware for parsing JSON and urlencoded form data
server.use(express.json());
server.use(express.urlencoded({ extended: true }));

server.use(routes);

if (process.env.NODE_ENV === 'production') {
  server.use(express.static(path.join(__dirname, '../client/build')));
}

server.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

module.exports = server;
