module.exports = (app) => {
    // Sets the controllers
    const thankyou = require('../controllers/thankyou.server.controller');

    // Route the default route.
    app.get('/thankyou', thankyou.render);
}