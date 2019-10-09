const db = require('../data/db-config.js');

module.exports = {
    find
    // findById,
    // findPosts,
    // add
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where({id})
    .first();
}

function findPosts(userId) {
    return db('posts as p')
    .join('schemes as u', 'u.id', '=', 'p.user_id')
    .where({ user_id: userId })
    .select('p.id', 'p.contents as quote', 'u.username as User Name')
}

function add(user) {
    return db('schemes')
    .insert(user, 'id');
}