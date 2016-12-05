
'use strict'

//in the controllers live the handler functions

//it doesnt care if it runs on express or whatever
module.exports = function (data) {
    return {
        getAll(req, res) {
            data.getAllUsers()
                .then(users => {
                    res.render('user_list', {
                        result: users
                    });
                });
        },
        getById(req, res){
            data.getUserByEmail(req.params.id)
                .then(user => {
                    if(user === null){
                        //do sth, redirect maybe
                        return res.status(404)
                            .redirect('/error_page');
                    }
                    //check how
                    // res.send(user);
                    return res.redirect('/user_details', {
                        result: user
                    });
                });
        },
        create(req, res){
            let body = req.body;
            date.createUser(body.name, body.email, body.password)
                .then(() => {
                    //if here has a redirection to '/', we'll have coupling
                    res.redirect('/user_list');
                });
        }
    };
};