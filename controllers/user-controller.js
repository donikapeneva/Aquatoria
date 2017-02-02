'use strict'

const formidable = require('formidable'),
    uploader = require('../helper/uploader'),
    path = require('path'),
    helpers = require('../helper');

const EXTENSION_PATTERN = /\.(jpg|jpeg|png)$/i;

module.exports = function (data) {
    return {
        getLogin(req, res){
            return Promise.resolve()
                .then(()=> {

                    if (!req.isAuthenticated()) {
                        console.log('redirecting ');
                        res.render('user/login');
                    } else {
                        console.log('for some reason ..  ');
                        // res.redirect('/home');
                        if (req.user.role === 'admin') {
                            res.redirect('home', {isAdmin: true});
                        } else {
                            res.redirect('home', {isAdmin: false});
                        }
                    }
                });
        },
        getRegister(req, res){
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.render('user/register', {});
                    } else {
                        res.redirect('/home');
                    }
                })
        },
        getProfile(req, res){
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        //TODO redirect to home 
                        res.status(401).redirect('/unauthorized');
                    } else {
                        if (req.user.role === 'admin') {
                            res.render('user/profile', {user: req.user, isAdmin: true,});
                        } else {
                            res.render('user/profile', {user: req.user, isAdmin: false});
                        }
                    }
                });
        },
        updateProfile(req, res){
            const updatedUser = req.body;

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/home');
                    } else {
                        return data.findUserByIdAndUpdate(req.body._id, updatedUser);
                    }
                })
                .then(user => {
                    res.status(200)
                        .send({redirectRoute: '/profile'});
                })
                .catch(err => {
                    res.status(400)
                    // .send(JSON.stringify({validationError: helpers.errorHelper(err)}));
                });
        },
        //                         ?
        changePassword(req, res, done){
            const passwordObj = req.body;

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/home');
                    } else {
                        return data.getUserById(req.user._id)

                        // .then(() => {
                        //     //when i repair 'done' callback <- this will work
                        //    // and redirection (success) code is here
                        // res.status(200)
                        //     .send({redirectRoute: '/profile'});
                        // })
                        // .catch(error => {
                        //     // console.log('catch the errrorororo');
                        //     // // error = {'ValidationError' : 'You must enter your current password'};
                        //     // console.log(error);
                        //     // res.status(400)
                        //     //     .send(JSON.stringify({validationError: helpers.errorHelper(error)}));
                        //     // // done(error, false)
                        //     next(error);
                        // });

                        // return data.findUserByIdAndUpdate(req.user._id, { password : passwordObj.newPassword } );
                        // return data.changePasswordByUserId(req.user._id, passwordObj.newPassword);
                    }
                })
                .then(user => {

                    if (user && user.authenticatePassword(passwordObj.oldPassword)) {
                        console.log('The password is correct');

                        //TODO : validate newPass === repeateNewPass

                        let user = req.user;
                        user.password = passwordObj.newPassword;
                        user.save(function (err) {
                            if (err) {
                                next(err);
                            } else {
                                //TODO is it possible the problem with double loading be caused by redirection & redirectionRoute ?
                                console.log('1st redirectoin');
                                res.status(200)
                                    .send({redirectRoute: '/profile'});
                            }
                        });
                    } else {
                        console.log('The password is not correct');
                        //TODO: done <- callback, from where?
                        // done(null, false);

                        let err = new Error('The password is not correct');

                        res.status(400)
                            .send(JSON.stringify({validationError: helpers.errorHelper(err)}));
                    }
                })
                .catch(err => {
                    console.log(err);
                    res.status(400)
                        .send(JSON.stringify({validationError: helpers.errorHelper(err)}));
                });
        },
        getProfileAvatar(req, res){
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.status(401).redirect('/unauthorized');
                    } else {
                        if (req.user.role === 'admin') {
                            res.render('user/profile-avatar', {user: req.user, isAdmin: true});
                        } else {
                            res.render('user/profile-avatar', {user: req.user, isAdmin: false});
                        }
                    }
                });
        },
        uploadProfileAvatar(req, res){
            return new Promise((resolve, reject) => {
                if (!req.isAuthenticated()) {
                    res.status(401).redirect('/unauthorized');
                    reject();
                } else {
                    let form = new formidable.IncomingForm();
                    //max size: 2MB
                    form.maxFieldSize = 2 * 1024 * 1024;

                    form.onPart = function (part) {
                        if (!part.filename || part.filename.match(EXTENSION_PATTERN)) {
                            form.on('end', function (fields, files) {
                                if (this.openedFiles[0].size > form.maxFieldSize) {
                                    return reject({name: 'ValidationError', message: 'Maximum file size is 2MB'});
                                } else {
                                    res.status(200)
                                        .send({redirectRoute: '/profile'});
                                }

                                let userFolder = req.user.id,
                                    uploadPathToFolder = path.join(__dirname, '../public/uploads/users', userFolder),
                                    newFileName = 'avatar';

                                let _this = this;

                                //uploading an avatar picture in user's folder
                                uploader.uploadFile(_this.openedFiles[0], uploadPathToFolder, newFileName)
                                    .then(uploadedFileName => {
                                        resolve(uploadedFileName);
                                    })
                                    .catch((err) => {
                                        console.log(err);
                                    });
                            });

                            form.handlePart(part);
                        } else {
                            return reject({name: 'ValidationError', message: 'File types allowed: jpg, jpeg, png.'});
                        }
                    };
                    form.on('error', (err) => {
                        reject(err);
                    });
                    form.parse(req);
                }
            })
                .then(fileName => {
                    if (typeof fileName !== 'string') {
                        return;
                    }

                    //the url should not be absolute path
                    //TODO: check for relative path formatter function
                    let avatarUrl = '/static/uploads/users/' + req.user.id + '/' + fileName;

                    //update on user's avatar
                    data.findUserByIdAndUpdate(req.user.id, {avatar: avatarUrl});
                })
                .then(() => {
                    res.status(200)
                        .send({redirectRoute: '/profile'});
                })
                .catch((err) => {
                    res.status(400)
                        .send(JSON.stringify({validationError: [err.message]}));
                });
        },
        getUnauthorized(req, res){
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.render('unauthorized', {});
                    } else {
                        res.redirect('/home');
                    }
                });
        },
        getContactForm(req, res){
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        //TODO: object = {}, then pass the object
                        res.render('user/contact-form', {});
                    } else {
                        if (req.user.role === 'admin') {
                            res.render('user/contact-form', {user: req.user, isAdmin: true});
                        } else {
                            res.render('user/contact-form', {user: req.user, isAdmin: false});
                        }
                    }
                });
        },
        sendEmail(req, res){

        }
        //update Item
    };
};