'use strict';

module.exports = function () {
    console.log('Controller home');
    return {
        home(req, res) {
            return Promise.resolve()
                .then(() => {
                    console.log('in controlleeeeeer');
                    if (!req.isAuthenticated()) {
                        res.render('home');

                    } else {
                        if(req.user.role === 'admin') {
                            res.render('home', { user: req.user, isAdmin: true });
                        } else {
                            res.render('home', { user: req.user, isAdmin: false });
                        }
                    }
                });
        }
    };
};