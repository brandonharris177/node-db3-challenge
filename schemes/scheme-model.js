const db = require('../data/db-config.js');

module.exports = {
    find,
    findById,
    findSteps,
    add
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