'use strict'

const passport = require('passport');

module.exports = function (data) {
    return {
        login(req, res, next){
            const auth = passport.authenticate('local', function (err, user) {
                if (err) {
                    next(err);
                    return;
                }

                if (!user) {
                    //ajax
                    res.json({
                        seccess: false,
                        message: 'user not found...'
                    });
                }

                //save in session
                req.login(user, err => {
                    if(err){
                        //predavame po verigata s next ili prikliuchvame tuk
                        next(err);
                        return;
                    }

                    res.redirect('/profile');
                });
            });

            auth(req, res, next);
        },
        logout(req, res){
            req.logout();
            res.redirect('/home');
        },
        register(req, res){
            const user = {
                username: req.body.username,
                password: req.body.password,
                email: 'mail'
            };

            data.createUser(user)
                .then(dbUser => {
                    res.status(201).send('<h1> Weee </h1>');
                })
                //sent message w/ error, like such user allready exists
                .catch(error => res.status(500).json(error));
        }
    }

}