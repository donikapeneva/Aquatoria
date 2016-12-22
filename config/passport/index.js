'use strict'

const passport = require('passport');

module.exports = (app, data) => {


    passport.serializeUser((user, done) => {
        if (user) {
            done(null, user.id);
        }
    });

    passport.deserializeUser((userId, done) => {
        data.getUserById(userId).then(user => {
            if (user) {
                done(null, user);
                return;
            }
            done(null, false);
            //done(null, user || false);
        }).catch(error => done(error, false));
    });

    require('./local-strategy')(passport, data);

    app.use(passport.initialize());
    app.use(passport.session());
}
