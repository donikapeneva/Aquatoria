/* globals require module */
'use strict'

const mongoose = require('mongoose'),
    uniqueValidator = require('mongoose-unique-validator');
//TODO : move encryption in utilities folder

var requiredMessage = '{PATH} is required';
const EMAIL_PATTERN = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
    LETTERS = /^[A-Za-zА-Яа-я]+$/;

const roles = ['user', 'admin'];

let userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: requiredMessage,
        maxlength: [50, 'Name is too long!'],
        match: LETTERS
    },
    lastName: {
        type: String,
        required: requiredMessage,
        maxlength: [50, 'Name is too long!'],
        match: LETTERS
    },
    email: {
        type: String,
        required: requiredMessage,
        unique: true,
        match: EMAIL_PATTERN
    },
    salt: {
        type: String
    },
    passwordHash: {
        type: String
    },
    avatar: {
        type: String,
        //TODO:
        default: '/static/uploads/users/avatar.jpg'
    },
    role: {
        type: String,
        enum: roles,
        default: roles[0]
    },
    //TODO:
    social: {
        facebook: {
            id: String,
            token: String,
            name: String,
            email: String,
            picture: String
        },
        googlePlus: {
            id: String,
            token: String,
            name: String,
            email: String,
            picture: String
        }
    }

});

userSchema
    .plugin(uniqueValidator, {message: 'Error, expected {PATH} to be unique.'});

userSchema
    .virtual('password')
    .set(function (password) {
        this._password = password;
        this.salt = this.generateSalt();
        this.passwordHash = this.encryptPassword(password);
    })
    .get(function () {
        return this._password;
    });

userSchema
    .virtual('fullName')
    .get(function () {
        return this.firstName + ' ' + this.lastName;
    });

userSchema
    .pre('save', function (next) {
        console.log('pre save');

        var user = this;

        //check if password is modified, else no need to do anything
        if (!user.isModified('password')) {
            return next();
        }

        user.pass = bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
        next();
        //
        // console.log('pre save');
        //
        // var user = this,
        //     SALT_FACTOR = 5;
        //
        // console.log('pre save');
        //
        // if (!user.isModified('_password')) {
        //     console.log('pass is modified');
        //     return next();
        // }
        //
        // this._password = user.password;
        // this.salt = this.generateSalt();
        // this.passwordHash = this.encryptPassword(user.password);





        // bcrypt.genSalt(SALT_FACTOR, function (err, salt) {
        //     if (err) {
        //         return next(err);
        //     }
        //
        //     bcrypt.hash(user.password, salt, null, function (err, hash) {
        //         if (err) {
        //             return next(err);
        //         }
        //         user.password = hash;
        //         next();
        //     });

        // });

        // next();
    });

userSchema.methods = {
    generateSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    encryptPassword: function (password) {

        if (!password) {
            return '';
        }

        try {
            return require('crypto')
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            //TODO: no user creation!!!
            console.log('err pass : ' + err);
            return '';
        }
    },
    authenticatePassword: function (password) {
        return this.encryptPassword(password) === this.passwordHash;
    }
    // comparePasswords: function (candidatePassword, cb){
    //     bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    //         if (err) return cb(err);
    //         cb(null, isMatch);
    //     });
    // }
};

mongoose.model('User', userSchema);
module.exports = mongoose.model('User');