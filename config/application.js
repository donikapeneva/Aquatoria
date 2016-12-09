/* globals require module */
'use strict'

//server configuration
const session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    express = require('express');

let app = express();

//configure
app.set('view engine', 'pug');
app.use('static', express.static('public'));

//app middlewares for sessions
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

//TODO: the secret must be read from a config file
app.use(session({secret: 'purple'}));

require('./passport/')(app);
//TODO: dinamicaly loading all the routers
// require('../routers/index')(app);


module.exports = app;