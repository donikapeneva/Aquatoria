/* globals module require */

'use strict'

const express = require('express');


// export in other module
// let controller = require('../controllers/user-controller');
//should require

module.exports = function (app, data) {
    let controller = require('../controllers/user_controller')(data);

    let router = new express.Router();

    router
        .get('/', controller.getAll)
        .get('/:id', controller.getById)
        .post('/', controller.create);

    app.use('/users', router);
}