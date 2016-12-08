'use strict'

const helper = require('../helper'),
    formidable = require('formidable'),
    path = require('path'),
    fs = require('fs'),
    uploader = require('../helper/uploader');

const EXTENSION_PATTERN = /\.(jpg|jpeg|png)$/i;

var render = function(req, res, data, viewPath){
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
}

module.exports = function (data) {
    return {
        getItems(req, res){
            return Promise.resolve()
                .then(() => {
                    //TODO: this may not be valid for music or video
                    return data.getItemsGroupedByCategories(req.params.type)
                })
                .then(items => {
                    //TODO: see if you can export it in function :/
                    render(req, res, items, 'items/show-items-by-categories');
                    /*
                    if (!req.isAuthenticated()) {
                        res.render('items/show-items-by-categories', {items: items});
                    } else {
                        if (req.user.role === 'admin') {
                            res.render('items/show-items-by-categories', {items: items, user: req.user, isAdmin: true});

                        } else {
                            res.render('items/show-items-by-categories', {
                                items: items,
                                user: req.user,
                                isAdmin: false
                            });
                        }
                    }
                    */
                })
                .catch((err) => {
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
                    .then(([categories]) => {
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
        //TODO:: https://github.com/felixge/node-formidable/blob/master/example/upload.js
        uploadItem(req, res){
            return new Promise((resolve, reject) => {
                if (!req.isAuthenticated() || req.user.role !== 'admin') {
                    /*
                    res.writeHead(404, {'content-type': 'text/plain'});
                    res.end('404');
                    */
                    res.status(401).redirect('/' + req.params.type);
                    reject();
                } else {
                    var form = new formidable.IncomingForm(),
                        files = [],
                        fields = [];

                    form.uploadDir = TEST_TMP;

                    form
                        .on('field', function (field, value) {
                            console.log(field, value);
                            fields.push([field, value]);
                        })
                        .on('file', function (field, file) {
                            console.log(field, file);
                            files.push([field, file]);
                        })
                        .on('end', function () {
                            console.log('-> upload done');
                            res.status(200).send({ redirectRoute: '/:' + req.params.type });;

                            /*
                            res.writeHead(200, {'content-type': 'text/plain'});
                            res.write('received fields:\n\n ' + util.inspect(fields));
                            res.write('\n\n');
                            res.end('received files:\n\n ' + util.inspect(files));
                            */
                        });
                    form.parse(req);
                }
            });
        }
    };
};