'use strict'

const formidable = require('formidable'),
    uploader = require('../helper/uploader'),
    path = require('path');

const EXTENSION_PATTERN = /\.(jpg|jpeg|png)$/i;

module.exports = function (data) {
    return {
        getLogin(req, res){
            return Promise.resolve()
                .then(()=> {

                    //TODO: when the back button is pressed it crashes w/ status code 0

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
                            res.render('user/profile', {user: req.user, isAdmin: true});
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
        changePassword(req, res){
            const passwordObj = req.body;
            console.log(req.user);

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/home');
                    } else {
                        let user = data.getUserById(req.user._id);
                        user.password = passwordObj.newPassword;
                        console.log(passwordObj.newPassword);
                        // console.log(data.findUserByIdAndUpdate(req.user._id, user));
                        return data.changePasswordByUserId(req.user._id, passwordObj.newPassword);
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
        //TODO:
        uploadProfileAvatar(req, res){
            return new Promise((resolve, reject) => {
                if (!req.isAuthenticated()) {
                    res.status(401).redirect('/unauthorized');
                    reject();
                } else {
                    let form = new formidable.IncomingForm();
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

                                uploader.uploadFile(this.openedFiles[0], uploadPathToFolder, newFileName)
                                    .then(uploadedFileName => {
                                        resolve(uploadedFileName);
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

                    let avatarUrl = '/static/uploads/users/' + req.user.id + '/' + fileName;
                    data.findUserByIdAndUpdate(req.user.id, {avatarUrl});
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