/* globals module Promise */
'use strict'
module.exports = function (models) {
    let User = models.User;
    return {
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
        //byMail ?
        getUserById(id){
            return new Promise((resolve, reject) => {
                //
                User.findOne({_id: id}, (err, user) => {
                    if(err){
                        return reject(err);
                    }

                    //if it returns null, and it is not found we redirect to not found

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
    };
};