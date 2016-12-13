'use strict'

//TODO:
const passport = require('passport'),
    db = require('../../models/dummy_db');

passport.serializeUser((user, done) => {
    if (user) {
        done(null, user.id);
    }
});

passport.deserializeUser((userId, done) => {
    db.findById(userId).then(user => {
        if (user) {
            done(null, user);
            return;
        }
        done(null, false);
        //done(null, user || false);
    }).catch(error => done(error, false));
});

require('./local-strategy')(passport);

//accept the server and attach to it
//attach passport middleware to app
module.exports = app => {
    app.use(passport.initialize());
    app.use(passport.session());
};
