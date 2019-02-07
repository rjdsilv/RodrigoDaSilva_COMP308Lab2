const customer = require('./customer.server.controller');

exports.render = (req, res, next) => {
    if (req.method === 'POST') {
        // Posting the comments. Save it to the database.
        customer.findFeedback(req, res, next);
    } else {
        // Loading the page with the data from the session.
        res.render('view-feedback', {
            error: '',
            email: '',
            comments: ''
        });
    }
}