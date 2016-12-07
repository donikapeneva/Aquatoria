/* globals require module */
'use strict'

const mongoose = require('mongoose');
//TODO : unique validator
//TODO : move encryption in utilities folder

var requiredMessage = '{PATH} is required';
const LETTERS = /^[A-Za-zА-Яа-я]+$/,
    EMAIL_PATTERN = /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$/;

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
        type: String
        //TODO:
        //default: '/static/uploads/users/avatar.jpg'
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

userSchema.methods = {
    generateSalt: function () {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    },
    encryptPassword: function (password) {
        if (!password) {
            return '';
        }

        try {
            return crypto
                .createHmac('sha1', this.salt)
                .update(password)
                .digest('hex');
        } catch (err) {
            return '';
        }
    },
    authenticatePassword: function (password) {
        return this.encryptPassword(password) === this.passwordHash;
    }
}


mongoose.model('User', userSchema);
module.exports = mongoose.model('User');