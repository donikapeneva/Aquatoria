'use strict';

//it doesnt need to return something, it just pin them
//we decrease number of requirentments by exporting a function,
//which has as paramenters things that we should require
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