module.exports = (app) => {
    // Sets the controllers
    const index = require('../controllers/index.server.controller');
    const feedback = require('../controllers/feedback.server.controller');
    const thankyou = require('../controllers/thankyou.server.controller');

    // Route the default route.
    app.get('/', index.render);
    app.post('/', (request, response) => {
        index.render(request, response);
    });

    // Route to feedback,
    app.get('/feedback', feedback.render);
    app.post('/feedback', feedback.render);

    // Route to thankyou
    app.get('/thankyou', thankyou.render);
}