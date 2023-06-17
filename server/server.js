const express = require('express');
const path = require('path');
const { clog } = require('./middleware/clog');
const db = require('./config/connection');
const routes = require('./routes');

const PORT = process.env.PORT || 3001;

const app = express();

// Import custom middleware, "cLog"
app.use(clog);

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/build/index.html'));
});

app.use(routes);

db.once('open', () => {
  app.listen(PORT, () => {
    console.log(`Server is listening on http://localhost:${PORT} 🚀`);
  });
});
