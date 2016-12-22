'use strict'

const LocalStrategy = require('passport-local');
//passport setup
//configuration of strategy
module.exports = function (passport, data) {

    const authStrategy = new LocalStrategy({
        usernameField: 'email',
        passwordField: 'password'
    }, function (email, password, done) {

        console.log('local strategy function called');

        data.getUserByEmail(email)
            .then(user => {
                if (user && user.authenticatePassword(password)) {
                    done(null, user);
                } else {
                    done(null, false);
                }
            }).catch(error => done(error, false));
    });

    passport.use(authStrategy);
};
