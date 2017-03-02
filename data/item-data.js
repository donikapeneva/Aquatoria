'use strict'

const dataUtils = require('./utils/data-utils');

module.exports = function (models) {
    let Item = models.Item;
    return {
        createItem(item){
            let createItem = new Item({
                title: item.title,
                body: item.body,
                type: item.type,
                category: item.category,
                description: item.description,
                madeBy: item.madeBy
            });

            return new Promise((resolve, reject) => {
                createItem.save(err => {

                    if (err) {

                    console.log(err);
                    console.log('err');
                        return reject(err);
                    }
                    return resolve(createItem);
                });
            });
        },
        getItemById(id){
            return new Promise((resolve, reject) => {
                Item.findOne({_id: id}, (err, item) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(item);
                })
            })
        },
        getAllItems(){
            return new Promise((resolve, reject) => {
                Item.find((err, items) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(items);
                });
            });
        },
        getItemsByCategory(type, category) {
            return new Promise((resolve, reject) => {
                Item.find({type: type, category: category}, (err, items) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(items);
                });
            });
        },
        getItemsGroupedByCategories(type) {
            return new Promise((resolve, reject) => {
                Item.find({type: type, isDeleted: false}, (err, items) => {
                    if (err) {
                        return reject(err);
                    }

                    let itemsByCategory = dataUtils.groupItems(false, items);

                    return resolve(itemsByCategory);
                });
            });

        },
        getItemsGroupedByType() {
            return new Promise((resolve, reject) => {
                Item.find((err, items) => {
                    if (err) {
                        return reject(err);
                    }

                    let itemsByType = dataUtils.groupItems(true, items);

                    return resolve(itemsByType);
                });
            });
        },
        findItemAndUpdate(id, update) {
            console.log('updating');
            return new Promise((resolve, reject) => {
                Item.findOneAndUpdate({_id: id}, update, {new: true}, (err, item) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

                    if (!item) {
                        return reject(item);
                    }

                    return resolve(item);
                });
            });
        },
        getCategoriesByType(type){

        }
    }
};