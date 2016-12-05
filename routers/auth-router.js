'use strict'

const router = require('express').Router(),
    createAuthController = require('../controllers/auth-controller'),
    data = require('../models/dummy_db');

const authController = createAuthController(data);

router
    .get('/login', (req, res) => {
    res.status(200).send('<form action="/login" method="POST">' +
        '<input type=text" name="username" placeholder="username">' +
        '<input type="text" name="password" placeholder="Password"> ' +
        '<input  type="submit" value="Submit">' +
        '</form>'
    )
})
    .post('/login', authController.login)
    //profile -> to user-controller
    .get('/profile', (req, res) => {
        if (!req.isAuthenticated()) {
            res.status(401).redirect('/unauthorized');
        } else {
            const user = req.user;
            res.status(200).send('Wellcome, ${user.username}')
        }
    })
    .get('/unauthorized', (req, res) => res.send('<h1> nooooooooo </h1>'));


module.exports = app => app.use(router);
