require('dotenv').config();
const mongoose = require("mongoose");

mongoose.Promise = Promise;

// connect to mongo db
const mongoUri = process.env.MONGO_HOST;
mongoose.connect(
  mongoUri,
  { server: { socketOptions: { keepAlive: 1 } } }
);
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${mongoUri}`);
});
module.exports = mongoose.connection;