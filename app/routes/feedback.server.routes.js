module.exports = (app) => {
    // Sets the controllers
    const feedback = require('../controllers/feedback.server.controller');

    // Route the default route.
    app.get('/feedback', feedback.render);
    app.post('/feedback', feedback.render);
}