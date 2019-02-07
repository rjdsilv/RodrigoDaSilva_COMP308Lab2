module.exports = (app) => {
    // Sets the controllers
    const signup = require('../controllers/signup.server.controller');
    const customer = require('../controllers/customer.server.controller')

    // Route the default route.
    app.get('/signup', signup.render);
    app.post('/signup', signup.render);
}