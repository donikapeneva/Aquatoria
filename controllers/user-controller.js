'use strict'

const formidable = require('formidable'),
    uploader = require('../helper/uploader'),
    path = require('path'),
    helpers = require('../helper/index.js');

const EXTENSION_PATTERN = /\.(jpg|jpeg|png)$/i;

module.exports = function (data) {
    return {
        getLogin(req, res){
            return Promise.resolve()
                .then(()=> {
                    if (!req.isAuthenticated()) {
                        res.render('user/login');
                    } else {
                        console.log('the user is logged and presses back button to return on login page');
                        //TODO : this doesnt solve the problem
                        //TODO : research if exist fragments (like these in android)
                        res.redirect('/home');
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

                            //TODO: load the admins
                            return data.getAllAdmins();
                            // res.render('user/profile', {user: req.user, isAdmin: true,});
                        } else {
                            console.log('isAdmin ' + req.user.role);
                            res.render('user/profile', {user: req.user, isAdmin: false});
                        }
                    }
                })
                .then((admins) => {

                    console.log('reseived admins');
                    console.log(admins);

                    let adminList = [];

                    for (let i = 0; i < admins.length; i++) {
                        adminList.push({
                            fullName: admins[i].fullName,
                            email: admins[i].email
                        });
                    }

                    console.log(adminList);
                    res.render('user/profile', {user: req.user, isAdmin: true, adminList: adminList});


                })
                .catch(err => {
                    res.status(400);
                    // .send(JSON.stringify(helper().errorHelper(error)));
                    // .send(JSON.stringify({validationError: helpers.errorHelper(err)}));
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
                    // .send(JSON.stringify(helper().errorHelper(error)));
                    // .send(JSON.stringify({validationError: helpers.errorHelper(err)}));
                });
        },
        updateAdmins(req, res){

            //old admins should be replaced by the new ones
            //working only with the users emails

            console.log('updating admins (controller)');
            let adminEmails = req.body,
                toUserEmails = [];

            console.log(adminEmails);

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/home');
                    } else {
                        return data.getAllAdmins();
                    }
                })
                .then(currentAdmins => {

                    // Array.prototype.unique = function () {
                    //     let currentArray = this.concat();
                    //     let emailOnlyArray = [];
                    //     emailOnlyArray[0] = currentArray[0].email;
                    //     for (let i = 1; i < currentArray.length; i++) {
                    //         for (let j = i + 1; j < currentArray.length; j++) {
                    //             if (currentArray[i].email === currentArray[j].email) {
                    //                 currentArray.splice(j--, 1);
                    //                 emailOnlyArray.push(currentArray[i])
                    //             }
                    //         }
                    //     }
                    //     console.log('unique');
                    //     console.log(currentArray);
                    //     return currentArray;
                    // };

                    for (let i = 0; i < currentAdmins.length; i++){
                        // make it regular user
                        console.log(adminEmails);
                        console.log(adminEmails.indexOf(currentAdmins[i].email));
                        if(adminEmails.indexOf(currentAdmins[i].email) < 0){
                            toUserEmails.push(currentAdmins[i].email);
                        }
                    }


                    console.log('admin emails');
                    console.log(adminEmails);

                    console.log('to user');
                    console.log(toUserEmails);

                    return Promise.resolve()
                        .then(() => {
                            // return data.updateAdminsToUsers(toUserEmails);
                            return data.updateAdmins(adminEmails, toUserEmails);

                        })
                        .catch(err => {
                            throw new Error('data is not returned');
                            // res.status(400)
                            // .send(JSON.stringify(helper().errorHelper(error)));
                            // .send(JSON.stringify({validationError: helpers.errorHelper(err)}));
                        });

                })
                // .then(updatedAdminList => {
                //
                //     console.log('updatedAdminList');
                //     console.log(updatedAdminList);
                //     res.status(200)
                //         .send({redirectRoute: '/profile', adminList: updatedAdminList});
                // })
                .catch(err => {

                    console.log('err');
                    console.log(err);
                    res.status(400)
                    // .send(JSON.stringify(helper().errorHelper(error)));
                    // .send(JSON.stringify({validationError: helpers.errorHelper(err)}));
                });
        },
        // addAdmin(req, res){
        //     const userToAdmin = req.body;
        //     console.log(userToAdmin);
        //
        //     return Promise.resolve()
        //         .then(() => {
        //             if (!req.isAuthenticated()) {
        //                 res.redirect('/home');
        //             } else {
        //                 return data.makeAdmin(userToAdmin.email);
        //             }
        //         })
        //         .then(user => {
        //             res.status(200)
        //                 .send({redirectRoute: '/profile', adminName: user.fullName, adminEmail: user.email});
        //         })
        //         .catch(err => {
        //             res.status(400)
        //             // .send(JSON.stringify(helper().errorHelper(error)));
        //             // .send(JSON.stringify({validationError: helpers.errorHelper(err)}));
        //         });
        // },
        // removeAdmin(req, res){
        //     const removeAdmin = req.body;
        //     console.log(removeAdmin);
        //
        //     // return Promise.resolve()
        //     //     .then(() => {
        //     //         if (!req.isAuthenticated()) {
        //     //             res.redirect('/home');
        //     //         } else {
        //     //             return data.makeAdmin(removeAdmin.email);
        //     //         }
        //     //     })
        //     //     .then(user => {
        //     //         res.status(200)
        //     //             .send({redirectRoute: '/profile', adminName: user.fullName, adminEmail: user.email});
        //     //     })
        //     //     .catch(err => {
        //     //         res.status(400)
        //     //         // .send(JSON.stringify(helper().errorHelper(error)));
        //     //         // .send(JSON.stringify({validationError: helpers.errorHelper(err)}));
        //     //     });
        // },
        changePassword(req, res){
            const passwordObj = req.body;

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/home');
                    } else {
                        return data.getUserById(req.user._id);
                    }
                })
                .then(user => {
                    if (user && user.authenticatePassword(passwordObj.oldPassword)) {
                        if (passwordObj.newPassword !== passwordObj.repeatNewPassword) {
                            throw new Error('Passwords don\'t match');
                        } else {
                            let user = req.user;
                            user.password = passwordObj.newPassword;
                            user.save(function (err) {
                                if (err) {
                                    next(err);
                                } else {
                                    //TODO is it possible the problem with double loading be caused by redirection & redirectionRoute ?
                                    res.status(200)
                                        .send({redirectRoute: '/profile'});
                                }
                            });
                        }
                    } else {
                        throw new Error('You must enter your current password');
                    }
                })
                .catch(err => {
                    res.status(400)
                    //TODO: all this redirections and errors should be passed identically
                    // if the error is not throwed -> res.redirect ...
                    // .send(JSON.stringify(helper().errorHelper(error)));
                        .send(JSON.stringify({message: err.message}));
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