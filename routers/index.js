'use strict';

//it doesnt need to return something, it just pins them
//we decrease number of requirentments by exporting a function with arguments
//we decrease coupling
module.exports = function(app, data){

    const fs = require('fs'),
        path = require('path'),
        express = require('express');

    //loading all the modules
    fs.readdirSync('./routers')
        .filter(x => x.includes('-router.js'))
        .forEach(file => require(path.join(__dirname, file))(app, data, express));
};