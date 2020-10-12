const usersRepo = require('./user.memory.repository');

const getAll = async () => usersRepo.getAll();

const getById = async id => usersRepo.getById(id);

const create = async (name, login, password) =>
  usersRepo.create(name, login, password);

const remove = async id => usersRepo.remove(id);

const update = async (id, params) => usersRepo.update(id, params);

module.exports = { getAll, getById, create, remove, update };
