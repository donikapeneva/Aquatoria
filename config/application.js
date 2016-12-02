/* globals require module */
'use strict'
const express = require('express');

let app = express();

//configure
app.set('view engine', 'pug');
app.use('static', express.static('public'));

module.exports = app;