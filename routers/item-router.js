'use strict'

module.exports = function (app, data, express) {
    let itemController = require('../controllers/item-controller')(data);

    let router = new express.Router();

    router
        .get('/:type', itemController.getItems)
        // .get('/photos', itemController.getItems)
        .get('/:type/:category', itemController.getItemsByCategory)
        .get('/:type/:id', itemController.getItemDetails)

        //TODO: search

        .get('/:type/create', itemController.getUploadItemForm)
        .post('/:type/create', itemController.uploadItem)
        .post('/:type/delete/:id', itemController.deleteItem);

    app.use('/items', router);
};