process.env.NODE_ENV = process.env.NODE_ENV || 'development';

// Loads the dependencies.
const mongoose = require('./config/mongoose');
const express = require('./config/express');

// Connects to the database.
const db = mongoose();

// Creates the express application.
const app = express();

// Listens and exports the app to be used.
app.listen(3000);
module.exports = app;
console.log('Server running at http://localhost:3000/');
