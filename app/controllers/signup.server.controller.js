﻿const strUtils = require('../utils/string.server.utils');
const customer = require('./customer.server.controller');

exports.render = (req, res, next) => {
    // We are currently sending user data.
    if (req.method == "POST") {
        const body = req.body;

        if (body.email && body.firstName && body.lastName && body.password) {
            // All the fields are filled. Create the customer.
            customer.create(req, res, next);
        } else {
            // Missing fields. Re-render the page passing an error message.
            res.render('signup', {
                error: 'Please, provide data for all the fields!',
                email: strUtils.getSafe(body.email),
                firstName: strUtils.getSafe(body.firstName),
                lastName: strUtils.getSafe(body.lastName),
                password: strUtils.getSafe(body.password)
            });
        }
    } else {
        res.render('signup', {
            error: '',
            email: '',
            firstName: '',
            lastName: '',
            password: ''
        });
    }
};