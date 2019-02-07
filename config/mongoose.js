const config = require('./config');
const mongoose = require('mongoose');

// Define the Mongoose configuration method
module.exports = () => {
    // Use Mongoose to connect to MongoDB
    const db = mongoose.connect(config.db, { useNewUrlParser: true });

    // Load the 'Customer' model
    require('../app/models/customer.server.model');

    // Return the Mongoose connection instance
    return db;
};