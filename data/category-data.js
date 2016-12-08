'use strict'

module.exports = function (models) {
    let Category = models.Category;
    return {
        createCategory(category){
            let createCategory = new Category({
                name: category.name,
                type: category.type
            });

            return new Promise((resolve, reject) => {
                createCategory.save(err => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(createCategory);
                });
            });
        },
        getCategoryById(id){
            return new Promise((resolve, reject) => {
                Category.findOne({_id: id}, (err, category) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(category);
                });
            });
        },
        getAllCategories(){
            return new Promise((resolve, reject) => {
                Category.find((err, categories) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(categories);
                });
            });
        },
        getCategoriesByType(type){
            return new Promise((resolve, reject) => {
                Category.findOne({type: type}, (err, categories) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(categories);
                });
            });
        },
        findCategoryAndUpdate(id, update) {
            return new Promise((resolve, reject) => {
                Category.findOneAndUpdate({_id: id}, update, {new: true}, (err, category) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!category) {
                        return reject(category);
                    }

                    return resolve(category);
                });
            });
        }
    }
};