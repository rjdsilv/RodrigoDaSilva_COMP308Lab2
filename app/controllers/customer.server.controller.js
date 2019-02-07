// Loads the customer model from Mogoose.
const Customer = require('mongoose').model('Customer');

/**
 * Creates a new customer in mongo's customer collection.
 * 
 * @param {any} req The request.
 * @param {any} res The response.
 * @param {any} next The next middleware to be called.
 */
exports.create = (req, res, next) => {
    // The query to be executed.
    const query = {
        'email': req.body.email
    };

    // The customer to be inserted / updated.
    const customer = {
        email: req.body.email,
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        password: req.body.password
    };

    // Indicates to insert the customer if it not exists.
    const upsert = {
        upsert: true
    };

    // Saving the customer document in the database.
    Customer.findOneAndUpdate(query, customer, upsert, (err) => {
        if (err) {
            // Propagates the error message to the next middleware.
            return next(err);
        } else {
            // Prints a success message!
            console.log("Customer " + customer.email + " successfully saved to the database.");

            // Redirects to the login page.
            res.redirect('/');
        }
    });
};