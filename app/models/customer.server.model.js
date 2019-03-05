// Loads the mongoose module and Schema object.
const mongoose = require('mongoose');

// Defines the Customer schema.
const CustomerSchema = new mongoose.Schema({
    email: {
        type: String,
        index: true,
        match: /.+\@.+\..+/
    },
    firstName: String,
    lastName: String,
    password: String,
    comments: String,
    motherTongue: String,
    favoriteLang: String,
    isAdmin: Boolean,
    created: {
        type: Date,
        default: Date.now()
    }
});

// Creates the customer model.
mongoose.model('Customer', CustomerSchema);