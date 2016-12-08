/* globals require module */

'use strict';

//it doesnt need to return something, it just pin them
//we decrease number of requirentments by exporting a function,
//which has as paramenters things that we should require
//we decrease coupling
module.exports = function(app, data){

    const fs = require('fs');
    const path = require('path');

    //loading all the modules
    fs.readdirSync('./routers')
        .filter(x => x.includes('-router'))
        .forEach(file => {
            //each router should know how to connect itself to relevant app
            let dataModule = require(path.join(__dirname, file))(app, data);
        });
};