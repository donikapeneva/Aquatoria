'use strict'

const mongoose = require('mongoose');
//TODO : unique validator

var requiredMessage = '{PATH} is required',
    types = ['photo', 'video', 'music'];

let categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: requiredMessage,
        minlength: [3, 'Name is too short!'],
        maxlength: [30, 'Name is too long!']
    },
    type: {
        type: String,
        enum: types[0],
        required: requiredMessage
    }
});

mongoose.model('Category', categorySchema);
module.exports = mongoose.model('Category');