module.exports = (app) => {
    // Sets the controllers
    const signup = require('../controllers/signup.server.controller');

    // Route the default route.
    app.get('/signup', signup.render);
    app.post('/signup', signup.render);
}