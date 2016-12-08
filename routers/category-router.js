'use strict'

module.exports = function (app, data, express) {
    let categoryController = require('../controllers/category-controller')(data);

    let router = new express.Router();

    router
        .get('/:type/list', categoryController.getCategories)

        //rename/hide category ? -> update category

        .get('/:type/add', categoryController.getAddCategoryForm)
        .post('/:type/add', categoryController.addCategory);

    app.use('/categories', categoryController);
};