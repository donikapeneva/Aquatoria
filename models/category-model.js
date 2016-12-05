'use strict'

const mongoose = require('mongoose');
//TODO : unique validator

var requiredMessage = '{PATH} is required';

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: requiredMessage,
        minlength: [3, 'Name is too short!'],
        maxlength: [30, 'Name is too long!']
    }
});

mongoose.model('Category', itemSchema);
module.exports = mongoose.model('Category');