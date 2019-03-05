const strUtils = require('../utils/string.server.utils');

exports.render = (req, res) => {
    const session = req.session;

    // The login was not done. Redirects to the login page.
    if (!session.email) {
        res.redirect('/');
    }

    // Shows the thank you message.
    const name = strUtils.getSafe(session.firstName) + ' ' + strUtils.getSafe(session.lastName);
    res.render('thankyou', {
        name: name,
        comments: strUtils.getSafe(session.comments),
        isAdmin: req.session.isAdmin
    });
}