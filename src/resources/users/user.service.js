const usersRepo = require('./user.memory.repository');

const getAll = () => usersRepo.getAll();

const getForId = id => usersRepo.getForId(id);

const create = (name, login, password) =>
  usersRepo.create(name, login, password);

const deleteUser = id => usersRepo.deleteUser(id);

const update = (id, params) => usersRepo.update(id, params);

module.exports = { getAll, getForId, create, deleteUser, update };

// 35:48
