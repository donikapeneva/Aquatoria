'use strict'

module.exports = function (app, data, express) {
    let itemController = require('../controllers/item-controller')(data);
    let categoryController = require('../controllers/category-controller')(data);

    let router = new express.Router();

    router
        .get('/:type', function(req, res){
            categoryController.getCategories(req, res);
            itemController.getItems(req, res);
        })
        // .get('/photos', itemController.getItems)
        .get('/:type/:category', itemController.getItemsByCategory)
        .get('/:type/:id', itemController.getItemDetails)

        //TODO: search

        .get('/:type/create', itemController.getUploadItemForm)
        .post('/:type/create', itemController.uploadItem);

    app.use('/items', router);
};