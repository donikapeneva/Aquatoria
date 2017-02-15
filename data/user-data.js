'use strict'

module.exports = function (models) {
    let User = models.User;
    return {
        createUser(user){
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
                    return resolve(userObj);
                });
            });
        },
        updateAdminsToUsers(userEmails){
            return new Promise((resolve, reject) => {
                // return User.find({})
            })
        },
        updateUsersToAdmins(adminEmails){

        },

        updateAdmins(adminEmails, userEmails){
            return new Promise((resolve, reject) => {

                console.log('updating admins (data)');

                //TODO: change if there is a method which can do it better
                //check for .update() method; what can be query parameter

                //find these who are admins and take their emails

                return User.find({role: 'admin'}, (err, users) => {
                    if (err) {
                        return reject(err);
                    }

                    console.log(users);
                    return resolve(users);
                });

            })
                .then((currentAdmins) => {
                    console.log('get admins ');
                    console.log(currentAdmins);
                    let currentAdminEmails = currentAdmins.map(function (user) {
                        return user.email;
                    });

                    console.log('current admins emails');
                    console.log(currentAdminEmails);

                    //make admin regular user

                    for (let i = 0; i < currentAdminEmails.length; i++) {
                        let currentAdminEmail = currentAdminEmails[i];
                        console.log('email of admin to user');
                        console.log(currentAdminEmail);
                        if (userEmails.indexOf(currentAdminEmail) >= 0) {
                            // change the user role to regular user

                             console.log( User.findOneAndUpdate({
                                email: currentAdminEmail,
                                role: 'admin'
                            }, {role: 'user'}, {new: true}, (err, user) => {
                                if (err) {
                                    console.log('unsuccessful update admin to user');
                                    console.log(err);
                                    return reject(err);
                                }

                                if (!user) {
                                    console.log('user not find');
                                    return reject(user);
                                }

                                //returns the updated user and continues the iterations
                                return resolve(user);
                            }));
                        }
                    }
                })
                .then(() => {
                    for (let i = 0; i < adminEmails.length; i++) {
                        let email = adminEmails[i];
                        //we need only these users which are not admins yet
                        User.findOneAndUpdate({
                            email: email,
                            role: 'user'
                        }, {role: 'admin'}, {new: true}, (err, user) => {
                            if (err) {
                                console.log('unsuccessful update user to admin');
                                console.log(err);
                                return reject(err);
                            }

                            if (!user) {
                                console.log('user not found');
                                return reject(user);
                            }

                            return resolve(user);
                        });
                    }
                })
                .catch((err) => {
                    console.log('error in data');
                    console.log(err);
                });
        },
        //TODO: do 1 method
        // manageAdmin(email, role){
        //     return new Promise((resolve, reject) => {
        //         //if the user is admin, we make it regular user
        //         //but isn't it better to be in different methods?
        //         User.findOneAndUpdate({email: email}, {role: role === 'admin' ? 'user' : 'admin'}, {new: true}, (err, user) => {
        //             if (err) {
        //                 return reject(err);
        //             }
        //
        //             if (!user) {
        //                 return reject(user);
        //             }
        //
        //             return resolve(user);
        //         });
        //     });
        // },
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
        removeAdmin(email){
            return new Promise((resolve, reject) => {
                User.findOneAndUpdate({email: email}, {role: 'user'}, {new: true}, (err, user) => {
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
        getAllAdmins(){
            return new Promise((resolve, reject) => {
                User.find({role: 'admin'}, (err, user) => {
                    if (err) {
                        return reject(err);
                    }
                    return resolve(user);
                })
            })
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