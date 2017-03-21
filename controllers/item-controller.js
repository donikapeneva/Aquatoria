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
                    console.log(req.params.type);
                    // return data.getItemsGroupedByCategories(req.params.type);
                    return data.getItemsGroupedByCategories('photo');
                })
                .then(itemsByCategories => {
                    //TODO: see if you can export it in function :/
                    let categories = Object.keys(itemsByCategories);

                    let templatePath = req.params.type + '/show-' + req.params.type;
                    res.render('photos/show-photos', {categories: categories, itemsByCategories: itemsByCategories, isAdmin: true});

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
        getItemsByCategory(req, res){

            return Promise.resolve()
                .then(() => {
                    return data.getItemsByCategory(req.params.type, req.params.category);
                })
                .then(items => {
                    render(req, res, items, 'items/show-items');
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
        uploadItem(req, res){

            //TODO: abstraction photo -> item

            //     title: item.title,
            //     body: item.body,
            //     type: item.type,
            //     category: item.category,
            //     description: item.description,
            //     madeBy: item.madeBy
            let photo = {};


            return new Promise((resolve, reject) => {
                console.log('uploading item');

                let form = new formidable.IncomingForm();
                //max size: 2MB
                form.maxFieldSize = 2 * 1024 * 1024;

                let photoFile = {},
                    photoInfo = {};

                form.parse(req)
                    .on('file', function (name, file) {
                        photoFile = file;
                        // console.log(photoFile);
                        console.log('Got file:', name);
                    })
                    .on('field', function (name, field) {
                        photoInfo = JSON.parse(field);
                        photo.title = photoInfo.uploadTitle;
                        photo.category = photoInfo.uploadCategory;
                        photo.description = photoInfo.uploadDescription;
                        photo.type = 'photo';

                        console.log(photoInfo);
                        console.log('Got a field:', name);
                    })
                    .on('error', function (err) {
                        console.log(err);
                        next(err);
                    })
                    .on('end', function () {

                        console.log('on end');

                        if (photoFile.size > form.maxFieldSize) {
                            return reject({name: 'ValidationError', message: 'Maximum file size is 2MB'});
                        } else {
                            let categoryFolder = photoInfo.uploadCategory,
                                uploadPathToFolder = path.join(__dirname, '../public/uploads/photos', categoryFolder),
                                newFileName = photoInfo.uploadTitle + Date.now();

                            //uploading an avatar picture in user's folder
                            uploader.uploadFile(photoFile, uploadPathToFolder, newFileName)
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
                    let photoUrl = '/static/uploads/photos/' + photo.category + '/' + fileName;
                    console.log(photoUrl);
                    photo.body = photoUrl;
                    console.log(photo);
                    data.createItem(photo);
                })
                .then((something) => {
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