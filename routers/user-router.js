'use strict'

module.exports = function (app, data, express) {
    let userController = require('../controllers/user-controller')(data);
    let authController = require('../controllers/auth-controller')(data);

    let router = new express.Router();

    router
        .get('/login', userController.getLogin)
        .post('/login', authController.loginLocal)
        //TODO : fb & google
        .get('/logout', authController.logout)

        .get('/register', userController.getRegister)
        .post('/register', authController.register)

        .get('/profile', userController.getProfile)
        .post('/profile', userController.updateProfile)
        .post('/changePassword', userController.changePassword)
        //avatar
        .get('/profile/avatar', userController.getProfileAvatar)
        .post('/profile/avatar', userController.uploadProfileAvatar)

        .post('/manageAdmins', userController.updateAdmins)

        // .post('/addAdmin', userController.addAdmin)
        // .post('/removeAdmin', userController.removeAdmin)


        .get('/unauthorized', userController.getUnauthorized)

        .get('/contact', userController.getContactForm)
        .post('/contact', userController.sendEmail)

    app.use(router);
}