module.exports = (app) => {
    // Sets the controllers
    const index = require('../controllers/index.server.controller');

    // Route the default route.
    app.get('/', index.render);
    app.post('/', index.render);
}