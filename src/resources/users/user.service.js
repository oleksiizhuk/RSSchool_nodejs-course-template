const usersDB = require('./user.DB.repository');

const getAll = () => usersDB.getAll();

const create = user => usersDB.create(user);

const getById = id => usersDB.getById(id);

const update = (id, user) => usersDB.update(id, user);

const remove = id => usersDB.remove(id);

module.exports = { getAll, create, getById, update, remove };
