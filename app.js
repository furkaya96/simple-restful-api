// Third party modules imports.
const express = require('express');
const logger = require('morgan');
const mongoose = require('mongoose');
const createError = require('http-errors');
const config = require('./config');

// Routers imports.
const usersRouter = require('./api/routes/users');

// Initialize express app.
const app = express();

// MongoDB connection
mongoose.connect(config.mongodb.URI, { useNewUrlParser: true }, function (err) {
  if (err) throw err;
  console.log('Connected to MongoDB server!');
});

// Middleware of express app.
app.use(logger('dev'));  // for monitoring all requests.
app.use(express.json());  // for parsing json.
app.use(express.urlencoded({ extended: true }));  // for parsing request body. (extended: true for parsing arrays)

// App router middlewares.
app.use('/api/v1/users', usersRouter);

// Catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// Error handler.
app.use(function (err, req, res, next) {
  // Set locals, only providing error in development.
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // Send the error
  res.status(err.status || 500);
  console.log(err);
  res.json(err);
});

// Export express app.
module.exports = app;