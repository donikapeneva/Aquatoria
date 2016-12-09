'use strict'

//server configuration
const session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    express = require('express');

const app = express();

//app middlewares for sessions
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//TODO: the secret must be read from a config file
app.use(session({secret: 'purple'}));

require('../passport/')(app);
//TODO: dinamicaly loading all the routers
// require('../../routing/auth-router')(app);

module.exports = app;