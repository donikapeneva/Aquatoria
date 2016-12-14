'use strict';

module.exports = function(app, data, express) {
    let homeController = require('../controllers/home_controller')();

    let router = new express.Router();

    router
        .get('/', (req, res) => {
            res.redirect('/home');
        })
        .get('/home', homeController.home);

    app.use(router);
};