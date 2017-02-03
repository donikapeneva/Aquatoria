'use strict'

const passport = require('passport'),
    helper = require('../helper');

module.exports = function (data) {
    return {
        loginLocal(req, res, next){
            if (req.isAuthenticated()) {
                console.log('redirecting ');
                res.render('home');
            } else {

                const auth = passport.authenticate('local', function (err, user) {

                    if (err) {
                        next(err);
                        return;
                    }

                    if (!user) {
                        //ajax
                        res.status(400);
                        res.json({
                            success: false,
                            message: 'Invalid name or password'
                        });
                    }

                    //save in session
                    req.login(user, err => {
                        if (err) {
                            next(err);
                            return;
                        }

                        res.status(200)
                        // if authorized -> redirectRoute: '/adminProfile';
                            .send({redirectRoute: '/home'})
                    });
                });

                return Promise.resolve()
                    .then(() => {
                        if (!req.isAuthenticated()) {
                            auth(req, res, next);
                        } else {
                            res.redirect('/home');
                        }
                    })

            }
        },
        logout(req, res){
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/home');
                    } else {
                        req.logout();
                        // res.redirect('/');
                        res.status(200)
                            .send({redirectRoute: '/home'});
                    }
                });
        },
        register(req, res, next){
            const user = req.body;

            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        let crUser = data.createUser(user);
                        console.log('create user :: ' + crUser);
                        return crUser;
                    } else {
                        res.redirect('/home');
                    }
                })
                .then(dbUser => {
                    console.log('cretated ' + dbUser);

                    // passport.authenticate('local', function (err, user, info) {
                    //     console.log(info);
                    //     if (err) {
                    //         console.log(err);
                    //         console.log('err');
                    //         return next(err);
                    //     }
                    //     if (!user) {
                    //         return res.redirect('/login');
                    //     }
                    //     req.logIn(user, function (err) {
                    //         if (err) {
                    //             return next(err);
                    //         }
                    //         return res.send({redirectRoute: '/profile'});
                    //     });
                    // })(req, res, next);

                    passport.authenticate('local')(req, res, function () {
                        res.status(200)
                            .send({redirectRoute: '/profile'});
                    });
                })
                .catch(error => {
                    res.status(400)
                        .send(JSON.stringify(helper().errorHelper(error)));
                    // .send(JSON.stringify({error : helper().errorHelper(error)}));
                });
        },
        loginFacebook(req, res, next){

        }
    };
};