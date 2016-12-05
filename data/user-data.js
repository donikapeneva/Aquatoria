/* globals module Promise */
'use strict'

module.exports = function (models) {
    let User = models.User;
    return {
        getUserByEmail(email){
            return new Promise((resolve, reject) => {
                User.findOne({email: email}, (err, user) => {
                    if(err){
                        return reject(err);
                    }
                    //if it returns null, and it is not found it's not here
                    return resolve(user);
                })
            })
        },
        createUser(name, email, password){
            let user = new User({
                name: name,
                email: email,
                password: password
            });

            return new Promise((resolve, reject) => {

                user.save(err => {
                    if(err){
                        return reject(err);
                    }

                    return resolve(user);
                });
            });
        }
        /*
        getAllUsers(){
            return new Promise((resolve, reject) => {
                User.find((err, users) => {
                    if(err){
                        return reject(err);
                    }
                    return resolve(users);
                });
            });
        },
        */
    };
};