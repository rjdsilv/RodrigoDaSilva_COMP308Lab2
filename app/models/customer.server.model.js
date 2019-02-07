// Loads the mongoose module and Schema object.
const mongoose = require('mongoose');

// Defines the Customer schema.
const CustomerSchema = new mongoose.Schema({
    email: String,
    firstName: String,
    lastName: String,
    password: String,
    comments: String
});

// Creates the customer model.
mongoose.model('Customer', CustomerSchema);