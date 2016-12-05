/*glbals module require */

'use strict'

const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');

module.exports = function(config){
    //mongoose promises are deprecated
    mongoose.Promise = global.Promise;
    mongoose.connect(config.connectionString);

    //loading the models
    let User = require('../models/user_model');

    //{ User: User, NeshtoDrugo.. }
    let models = { User: User };

    //if we have different models we just pin them to data
    //data.createUser()
    //data.getAllUsers()
    //data.createSthElse()
    let data = {};

    //loading all the modules
    fs.readdirSync('./data')
        .filter(x => x.includes('data'))
        .forEach(file => {
            //__dirname return the concrete dir where the file is, absolute path
            //the require returns the function from the userdata,
            // so we want to execute it with object (user model) // {User: User}
            let dataModule = require(path.join(__dirname, file))(models);

            //returns an array with the object's properties' names
            //[getAllUsers, createUser]
            Object.keys(dataModule)
                .forEach(key => {
                    data[key] = dataModule[key]
                });

        });
    return data;

};