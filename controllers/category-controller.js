'use strict'

module.exports = function (data) {
    return {
        getCategories(req, res){
            return Promise.resolve()
                .then(() => {
                    return data.getCategoriesByType(req.params.type);
                })
                .then(categories => {
                    if (!req.isAuthenticated()) {
                        res.redirect('/home');
                    } else if (req.user.role === 'admin') {
                        res.render('categories/show-categories-by-type', {result: data, user: req.user, isAdmin: true});
                    } else {
                        res.redirect('/home');
                    }
                })
                .catch((err) => {
                    res.status(400)
                        .send(JSON.stringify({validationError: [err.message]}));
                });
        },
        getAddCategoryForm(req, res){
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        return res.redirect('/login');
                    } else if (req.user.role === 'admin') {
                        //TODO
                        return Promise.all([data.getCategoriesByType(req.params.type)])
                            .then((categories) => {
                                return res.render('categories/add-category', {
                                    user: req.user,
                                    categories: categories,
                                    isAdmin: true
                                });
                            });
                    } else {
                        return res.redirect('/login');
                    }
                });
        },
        addCategory(req, res){
            return Promise.resolve()
                .then(() => {
                    if (!req.isAuthenticated()) {
                        return res.redirect('/login');
                    } else if (req.user.role === 'admin') {
                        //TODO
                        data.createCategory(req.body.category);
                    } else {
                        return res.redirect('/login');
                    }
                })
                .catch(err => {
                    res.status(400)
                        .send(JSON.stringify({validationError: [err.message]}));
                });
        }
    };
};