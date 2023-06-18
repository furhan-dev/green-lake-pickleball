const server = require('./server');
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;

mongoose
  .connect('mongodb://127.0.0.1/glp', {})
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error(`Failed to start server:`, e);
  });