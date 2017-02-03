'use strict';

module.exports = function () {
    return {
        home(req, res) {
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        res.render('home');
                    } else {

                        console.log('user role : ' + req.user.role);

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