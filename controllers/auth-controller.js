'use strict'

const passport = require('passport');

module.exports = function (data) {
    return {
        loginLocal(req, res, next){
            const auth = passport.authenticate('local', function (err, user) {
                if (err) {
                    next(err);
                    return;
                }

                if (!user) {
                    //ajax
                    res.status(400);
                    res.json({
                        seccess: false,
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
        },
        logout(req, res){
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/home');
                    } else {
                        req.logout();
                        res.redirect('/home');
                    }
                });
        },
        register(req, res){
            const user = req.body;
            // const user = {username: req.body.username, password: req.body.password };

            return Promise.resolve()
                .then(() => {
                    if(!req.isAuthenticated()){
                        return data.createUser(user);
                    } else {
                        res.redirect('/home');
                    }
                })
                .then(dbUser => {
                    passport.authenticate('local')(req, res, () => {
                        res.status(200)
                            .send({ redirectRoute: '/profile'});
                    });
                })
                .catch(error => {
                    res.status(400)
                        // helpers = require('../helpers');
                        // .send(JSON.stringify({validationError : helpers.errorHelper(error)}));
                });
        }
    };
};