const strUtils = require('../utils/string.server.utils');
const customer = require('./customer.server.controller');


exports.render = (req, res, next) => {
    if (req.method == "POST") {
        const body = req.body;

        if (body.email && body.password) {
            // All the fields are filled. Perform the login
            customer.login(req, res, next);
        } else {
            // Missing fields. Re-render the page passing an error message.
            res.render('index', {
                error: 'Please, enter your email and password!',
                email: strUtils.getSafe(body.email),
            });
        }
    } else {
        res.render('index', {
            error: '',
            email: ''
        });
    }
}