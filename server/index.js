const server = require('./server');
const mongoose = require('mongoose');

const port = process.env.PORT || 3001;
const mongoConnectionString =
  process.env.MONGO_CONNECTION_STRING || 'mongodb://127.0.0.1/glp';

mongoose
  .connect(mongoConnectionString, {})
  .then(() => {
    server.listen(port, () => {
      console.log(`Server is listening on http://localhost:${port}`);
    });
  })
  .catch((e) => {
    console.error(`Failed to start server:`, e);
  });
