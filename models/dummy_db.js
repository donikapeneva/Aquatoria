'use strict'

const db = [
    {
        id: 1,
        username: 'Doni',
        password: '123'
    },
    {
        id: 2,
        username: 'Johny',
        password: '123'
    }
];

module.exports = {
    findById(id){
        const user = db.find(x=>x.id === id);

        return Promise.resolve(user);
    },
    findByUsername(username){
        const user = db.find(x=>x.username === username);

        return Promise.resolve(user);
    },
    createUser(user){
        const lastId = db[db.length - 1].id;
        user.id = lastId + 1;
        db.push(user);
    }
};