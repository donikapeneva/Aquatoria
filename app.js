'use strict'

const config = require('./config');

//here are all settings for express and stuffs
const app = require('./config/application');

//data layer
//data module returns some services (create...)
const data = require('./data')(config);

// console.log(data);

//this will connect routers and controllers ..
require('./routers')(app, data);

app.listen(config.port, () => console.log('Running at: ' + config.port));
