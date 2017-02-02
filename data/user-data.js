'use strict'

module.exports = function (models) {
    let User = models.User;
    return {
        createUser(user){

            console.log(user);

            let userObj = new User({
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                password: user.password
            });

            return new Promise((resolve, reject) => {
                console.log('Doing data');
                userObj.save(err => {
                    if (err) {
                        console.log('errror :: ' + err);

                        return reject(err);
                    }
                    console.log('resolve ::' + userObj);
                    return resolve(userObj);
                });
            });
        },
        //TODO: check
        makeAdmin(email){
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({email: email}, {role: 'admin'}, {new: true}, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject(user);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByEmail(email){
            return new Promise((resolve, reject) => {
                User.findOne({email: email}, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
                })
            })
        },
        getUserById(id){
            return new Promise((resolve, reject) => {
                User.findOne({_id: id}, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
                })
            })
        },
        getAllUsers(){
            return new Promise((resolve, reject) => {
                User.find((err, users) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(users);
                });
            });
        },
        findUserByEmailAndUpdate(email, update) {
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({email: email}, update, {new: true}, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject(user);
                    }

                    return resolve(user);
                });
            });
        },
        findUserByIdAndUpdate(id, update) {

            console.log('updating user');

            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({_id: id}, update, {new: true}, (err, user) => {
                    if (err) {
                        console.log('err');
                        console.log(err);
                        return reject(err);
                    }

                    if (!user) {
                        console.log('no user');
                        return reject(user);
                    }

                    console.log(user);

                    return resolve(user);
                });
            });
        },
        changePasswordByUserId(id, newPassword){
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({_id: id}, {$set:{_password: newPassword}}, (err, user) => {

                    console.log('Changing password');

                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        return reject(user);
                    }

                    console.log(user);

                    return resolve(user);
                });
            });
        },
        getUserByFacebookId(id) {
            return new Promise((resolve, reject) => {
                User.findOne({'social.facebook.id': id}, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        resolve(null, false);
                    }

                    return resolve(user);
                });
            });
        },
        getUserByGoogleplusId(id) {
            return new Promise((resolve, reject) => {
                User.findOne({'social.googlePlus.id': id}, (err, user) => {
                    if (err) {
                        return reject(err);
                    }

                    if (!user) {
                        resolve(null, false);
                    }

                    return resolve(user);
                });
            });
        }
    };
};