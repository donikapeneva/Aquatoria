'use strict'

const LocalStrategy = require('passport-local'),
    //TODO: change db
    db = require('../../models/dummy_db');

//passport setup
//configuration of strategy
const authStrategy = new LocalStrategy(function (username, password, done) {
    db.findByUsername(username).then(user => {
        if (user && user.password === password) {
            done(null, user);
            return;
        }

        done(null, false);

    }).catch(error => done(error, false));
});


module.exports = passport => passport.use(authStrategy);