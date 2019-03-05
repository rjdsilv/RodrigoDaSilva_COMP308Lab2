// Loads the customer model from Mogoose.
const Customer = require('mongoose').model('Customer');

// String utility.
const strUtils = require('../utils/string.server.utils');

/**
 * Creates a new customer in mongo's customer collection.
 * 
 * @param {any} req The request.
 * @param {any} res The response.
 * @param {any} next The next middleware to be called.
 */
exports.create = (req, res, next) => {
    const body = req.body;

    // The query to be executed.
    const query = {
        'email': strUtils.getSafe(body.email)
    };

    // The customer to be inserted / updated.
    const customer = {
        email: strUtils.getSafe(body.email),
        firstName: strUtils.getSafe(body.firstName),
        lastName: strUtils.getSafe(body.lastName),
        password: strUtils.getSafe(body.password),
        motherTongue: strUtils.getSafe(body.motherTongue),
        favoriteLang: strUtils.getSafe(body.favoriteLang),
        isAdmin: false,
        created: Date.now()
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

/**
 * Performs the login in the application.
 * 
 * @param {any} req The request to be used.
 * @param {any} res The response to be used.
 * @param {any} next The next middleware to be called.
 */
exports.login = (req, res, next) => {
    const body = req.body;

    // The query to be executed.
    const query = {
        'email': strUtils.getSafe(body.email),
        'password': strUtils.getSafe(body.password)
    };

    // Performs the find on the database.
    Customer.findOne(query, (err, customer) => {
        if (err) {
            return next(err);
        } else {
            if (customer) {
                // Customer found. Saves the customer data in the session.
                const session = req.session;
                session.email = strUtils.getSafe(customer.email);
                session.firstName = strUtils.getSafe(customer.firstName);
                session.lastName = strUtils.getSafe(customer.lastName);
                session.motherTongue = strUtils.getSafe(customer.motherTongue);
                session.favoriteLang = strUtils.getSafe(customer.favoriteLang);
                session.isAdmin = customer.isAdmin;

                // Redirects to the feedback page.
                res.redirect('/feedback');
            } else {
                // Customer not found. Shows the proper error to the user.
                res.render('index', {
                    error: 'Invalid email and/or password!',
                    email: strUtils.getSafe(body.email),
                });
            }
        }
    });
};

/**
 * Saves in the database to comments for the user sent in the request.
 * 
 * @param {any} req The request to be used.
 * @param {any} res The response to be used.
 * @param {any} next The next middleware to be called.
 */
exports.addComments = (req, res, next) => {
    const body = req.body;

    // The query to be executed.
    const query = {
        'email': strUtils.getSafe(body.email)
    };

    // The customer to be inserted / updated.
    const customer = {
        comments: strUtils.getSafe(body.comments)
    };

    // Indicates to insert the customer if it not exists.
    const upsert = {
        upsert: false
    };

    // Saving the customer document in the database.
    Customer.findOneAndUpdate(query, customer, upsert, (err) => {
        if (err) {
            // Propagates the error message to the next middleware.
            return next(err);
        } else {
            const session = req.session;

            // Prints a success message!
            console.log("Comments for " + body.email + " successfully saved to the database.");

            // Saves the comments in the session and redirects to the login page.
            session.comments = strUtils.getSafe(body.comments);
            res.redirect('/thankyou');
        }
    });
};

exports.findFeedback = (req, res, next) => {
    const body = req.body;

    // The query to be executed.
    const query = {
        'email': strUtils.getSafe(body.email)
    };

    // Performs the find on the database.
    Customer.findOne(query, (err, customer) => {
        const session = req.session;
        if (err) {
            return next(err);
        } else {
            if (customer) {
                // Customer found. Renders the feedback.
                res.render('view-feedback', {
                    error: '',
                    email: strUtils.getSafe(customer.email),
                    comments: strUtils.getSafe(customer.comments),
                    isAdmin: session.isAdmin
                });
            } else {
                const error = `Customer ${body.email} does not found in the system!`;
                // Customer not found. Shows the proper error to the user.
                res.render('view-feedback', {
                    error: error,
                    email: '',
                    comments: '',
                    isAdmin: false
                });
            }
        }
    });
}