const strUtils = require('../utils/string.server.utils');
const customer = require('./customer.server.controller');

exports.render = (req, res, next) => {
    const session = req.session;

    if (req.method === 'POST') {
        // Posting the comments. Save it to the database.
        customer.addComments(req, res, next);
    } else {
        // The login was not done. Redirects to the login page.
        if (!session.email) {
            res.redirect('/');
        }

        // Loading the page with the data from the session.
        res.render('feedback', {
            email: strUtils.getSafe(session.email),
            firstName: strUtils.getSafe(session.firstName),
            lastName: strUtils.getSafe(session.lastName),
            motherTongue: strUtils.getSafe(session.motherTongue),
            favoriteLang: strUtils.getSafe(session.favoriteLang),
            isAdmin: session.isAdmin
        });
    }
}