'use strict'

// const helper = require('../helper'),
const formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    uploader = require('../helper/uploader');

module.exports = function (data) {
    return {
        getItems(req, res){
            console.log(req.isAuthenticated());

            return Promise.resolve()
                .then(() => {
                    //TODO: cases of params.type
                    let wantedItems;
                    switch(req.params.type) {
                        default:
                        case 'photos' :
                            wantedItems = 'photo';
                            break;
                        case 'music' :
                            wantedItems = 'music';
                            break;
                    }
                    // return data.getItemsGroupedByCategories(req.params.type);
                    return data.getItemsGroupedByCategories(wantedItems);
                })
                .then(itemsByCategories => {
                    //TODO: see if you can export it in function :/
                    let categories = Object.keys(itemsByCategories);
                    let catObj = [];
                    for(let i=0; i < categories.length; i++){
                        let categoryWithPicture = {
                            category: categories[i],
                            cover: itemsByCategories[categories[i]].items[0].body
                        };
                        // console.log(itemsByCategories[categories[i]].items[0].body);
                        catObj.push(categoryWithPicture);


                    }

                    // console.log(itemsByCategories.);

                    // let templatePath = req.params.type + '/show-' + req.params.type;
                    let templatePath = req.params.type + '/photography-page';
                    res.render(templatePath, {categoriesWithPicture: catObj, categories: categories, itemsByCategories: itemsByCategories, isAdmin: true});

                    // if (!req.isAuthenticated()) {
                    //     res.render('items/show-items-by-categories', {items: items});
                    // } else {
                    //     if (req.user.role === 'admin') {
                    //         res.render('items/show-items-by-categories', {items: items, user: req.user, isAdmin: true});
                    //
                    //     } else {
                    //         res.render('items/show-items-by-categories', {
                    //             items: items,
                    //             user: req.user,
                    //             isAdmin: false
                    //         });
                    //     }
                    // }

                })
                .catch((err) => {
                    console.log(err);
                    res.status(400)
                        .send(JSON.stringify({validationError: [err.message]}));
                });
        },
        getPhotos(req, res){
            return Promise.resolve()
                .then(() => {

                    switch(req.params.navTag) {
                        default:
                        case 'projects':
                            //TODO: get except before and after!!!
                            return data.getItemsGroupedByCategories('photos');
                        case 'beforeAfter':
                            return data.getItemsByCategory('photos', 'beforeAfter');
                        case 'behindTheScenes':
                            return data.getItemsByCategory('photos', 'behindTheScenes');
                    }
                })
                .then(photos => {
                    let templatePath;
                    switch(req.params.navTag){
                        default:
                        case 'projects':
                            //TODO: see if you can export it in function :/
                            let categories = Object.keys(photos);
                            let catObj = [];
                            for(let i=0; i < categories.length; i++){
                                if(categories[i] === 'beforeAfter' || categories[i] === 'behindTheScenes'){
                                    continue;
                                }
                                let categoryWithPicture = {
                                    category: categories[i],
                                    cover: photos[categories[i]].items[0].body
                                };
                                catObj.push(categoryWithPicture);
                            }
                            console.log(photos);
                            templatePath = 'photos/photography-page';
                            res.render(templatePath, {categoriesWithPicture: catObj, categories: categories, itemsByCategories: photos, isAdmin: true});
                            break;
                        case 'beforeAfter':
                            templatePath = req.params.type + '/before-after';
                            res.render(templatePath, {itemsByCategories: photos, isAdmin: true});
                            break;
                        case 'behindTheScenes':
                            templatePath = req.params.type + '/behind-the-scenes';
                            res.render(templatePath, {itemsByCategories: photos, isAdmin: true});
                            break;
                    }
                })
                .catch((err) => {
                    console.log(err);
                    res.status(400)
                        .send(JSON.stringify({validationError: [err.message]}));
                });
        },

        getItemsByCategory(req, res){

            return Promise.resolve()
                .then(() => {
                    return data.getItemsByCategory(req.params.type, req.params.category);
                })
                .then(items => {
                    // render(req, res, items, 'items/show-items');
                    res.render('photos/show-photos', {items: items});/*
                     if (!req.isAuthenticated()) {
                     res.render('items/show-items', {items: items});
                     } else {
                     if (req.user.role === 'admin') {
                     res.render('items/show-items', {items: items, user: req.user, isAdmin: true});

                     } else {
                     res.render('items/show-items', {items: items, user: req.user, isAdmin: false});
                     }
                     }
                     */
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({validationError: [err.message]}));
                });
        },
        getItemDetails(req, res){
            return Promise.resolve()
                .then(() => {
                    return data.getItemById(req.params.id);
                })
                .then(item => {
                    render(req, res, item, 'items/item-details');
                    /*
                     if (!req.isAuthenticated()) {
                     res.render('items/item-details', {item: item});
                     } else {
                     if (req.user.role === 'admin') {
                     res.render('items/item-details', {item: item, user: req.user, isAdmin: true});

                     } else {
                     res.render('items/item-details', {item: item, user: req.user, isAdmin: false});
                     }
                     }
                     */
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({validationError: [err.message]}));
                });
        },
        getUploadItemForm(req, res){
            if (!req.isAuthenticated()) {
                return res.redirect('/login');
            } else if (req.user.role === 'admin') {
                return Promise.all([data.getCategoriesByType(req.params.type)])
                    .then((categories) => {
                        return res.render('items/upload-item', {
                            user: req.user,
                            categories: categories,
                            isAdmin: true
                        });
                    });
            } else {
                return res.redirect('/login');
            }
        },
        //TODO: universal for all items
        uploadItem(req, res){

            //TODO: abstraction photo -> item

            //     title: item.title,
            //     body: item.body,
            //     type: item.type,
            //     category: item.category,
            //     description: item.description,
            //     madeBy: item.madeBy
            let item = {},
                itemType,
                itemTypeFolder;

            switch(req.params.type){
                default:
                case 'photos':
                    itemType = 'photo';
                    itemTypeFolder = 'photos';
                    break;
                case 'music':
                    itemType = 'song';
                    itemTypeFolder = 'music';
                    break;
                case 'video':
                    itemType = 'videoLink';
                    itemTypeFolder = 'videos';
                    break;
            }

            return new Promise((resolve, reject) => {
                console.log('uploading item');

                let form = new formidable.IncomingForm();
                //TODO:
                //max size: 2MB
                form.maxFieldSize = 10 * 1024 * 1024;

                let itemFile = {},
                    itemInfo = {};

                form.parse(req)
                    .on('file', function (name, file) {
                        itemFile = file;
                        // console.log(photoFile);
                        console.log('Got file:', name);
                    })
                    .on('field', function (name, field) {
                        itemInfo = JSON.parse(field);
                        item.title = itemInfo.uploadTitle;
                        item.category = itemInfo.uploadCategory;
                        item.description = itemInfo.uploadDescription;
                        item.type = itemType;
                        item.autor = itemInfo.autor;

                        console.log(itemInfo);
                        console.log('Got a field:', name);
                    })
                    .on('error', function (err) {
                        console.log(err);
                        next(err);
                    })
                    .on('end', function () {

                        console.log('on end');

                        if (itemFile.size > form.maxFieldSize) {
                            console.log('wrong size ');
                            return reject({name: 'ValidationError', message: 'Maximum file size is 2MB'});
                        } else {
                            console.log('try to post');
                            let categoryFolder = itemInfo.uploadCategory,
                                uploadPathToFolder = path.join(__dirname, '../public/uploads/' + itemTypeFolder, categoryFolder),
                                newFileName = itemInfo.uploadTitle + Date.now();

                            //uploading an avatar picture in user's folder
                            uploader.uploadFile(itemFile, uploadPathToFolder, newFileName)
                                .then(uploadedFileName => {
                                    console.log('uploaded');
                                    resolve(uploadedFileName);
                                })
                                .catch((err) => {
                                    console.log(err);
                                });

                            // console.log('photoInfo');
                            // console.log(photoInfo);
                            // res.end();
                        }


                    });

            })

                .then((fileName) => {

                    console.log(fileName);

                    if (typeof fileName !== 'string') {

                        console.log('file name is not a string');
                        return;
                    }

                    //the url should not be absolute path
                    //TODO: check for relative path formatter function
                    let itemUrl = '/static/uploads/' + itemTypeFolder +'/' + item.category + '/' + fileName;
                    console.log(itemUrl);
                    item.body = itemUrl;
                    console.log(item);
                    data.createItem(item);
                })
                .then((something) => {

                    console.log('something');
                    console.log(something);
                    res.status(200)
                        .send({redirectRoute: '/items/' + req.params.type});
                })
                .catch((err) => {
                    res.status(400)
                        .send(JSON.stringify({validationError: [err.message]}));
                });

        },
        deleteItem(req, res){
            return Promise.resolve()
                .then(() => {
                    return data.findItemAndUpdate(req.params.id, {isDeleted: true});
                })
                .then(item => {
                    console.log(item);
                    res.status(200)
                        .send({redirectRoute: '/items/' + req.params.type});

                    /*
                     if (!req.isAuthenticated()) {
                     res.render('items/show-items', {items: items});
                     } else {
                     if (req.user.role === 'admin') {
                     res.render('items/show-items', {items: items, user: req.user, isAdmin: true});

                     } else {
                     res.render('items/show-items', {items: items, user: req.user, isAdmin: false});
                     }
                     }
                     */
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({validationError: [err.message]}));
                });
        }
    };
};


var render = function (req, res, data, viewPath) {
    if (!req.isAuthenticated()) {
        res.render(viewPath, {result: data});
    } else {
        if (req.user.role === 'admin') {
            res.render(viewPath, {result: data, user: req.user, isAdmin: true});

        } else {
            res.render(viewPath, {
                result: data,
                user: req.user,
                isAdmin: false
            });
        }
    }
};