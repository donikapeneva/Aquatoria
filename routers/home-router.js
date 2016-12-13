'use strict';

module.exports = function(app, data, express) {
    let homeController = require('../controllers/home_controller')();

    let router = new express.Router();

    router
        .get('/', (req, res) => {
            console.log('no in ho me ');
            res.redirect('/home');
        })
        .get('/home', homeController.home);

    console.log('Im in homeee');

    // app.use('/', router);
};