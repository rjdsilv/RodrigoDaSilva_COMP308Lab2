module.exports = (app) => {
    // Sets the controllers
    const viewFeedback = require('../controllers/view-feedback.server.controller');

    // Route the default route.
    app.get('/view-feedback', viewFeedback.render);
    app.post('/view-feedback', viewFeedback.render);
}