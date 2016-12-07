'use strict'

module.exports = function (models) {
    let User = models.User;
    return {
        createUser(firstName, lastName, email, password){
            let user = new User({
                firstName: firstName,
                lastName: lastName,
                email: email,
                password: password
            });

            return new Promise((resolve, reject) => {
                user.save(err => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
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
        //TODO: is nessessary ?
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