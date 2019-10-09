const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove
};

function find() {
    return db('schemes');
}

function findById(id) {
    return db('schemes')
    .where({id})
    .first();
}

function findSteps(schemeId) {
    return db('steps as s')
    .join('schemes as sc', 'sc.id', '=', 's.scheme_id')
    .where({ scheme_id: schemeId })
    .select('s.id', 'sc.scheme_name', 's.step_number', 's.instructions')
}

function add(newScheme) {
    return db('schemes')
      .insert(newScheme, 'id')
      .then(([id]) => {
        return findById(id);
      });
}

function update(changes, id) {
    return db('schemes')
    .where('id', `=`, id)
    .update(changes, 'id')
    .then(res => {
        if (res === 1) {
            return findById(id)
        } else {
            res.status(500).json('server error')
        }
      });
}

function remove(id) {
    return findById(id)
    .del()
}