'use strict'

//server configuration
const session = require('express-session'),
    cookieParser = require('cookie-parser'),
    bodyParser = require('body-parser'),
    express = require('express'),
    path = require('path');


let app = express();

//configure
app.set('view engine', 'pug');
// app.use('static', express.static('public'));

app.use('/static', express.static(path.join(__dirname, '../public')));
app.use('/scripts/jquery', express.static(path.join(__dirname, '../node_modules/jquery/dist/jquery.min.js')));

//app middlewares for sessions
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));

//TODO: the secret must be read from a config file
app.use(session({secret: 'purple'}));

require('./passport/')(app);

module.exports = app;