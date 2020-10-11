const boardRepo = require('./board.memory.repository');

const getAll = async () => boardRepo.getAll();

const create = async (title, columns) => boardRepo.create(title, columns);

const getById = async id => boardRepo.getByID(id);

const update = async (id, params) => boardRepo.update(id, params);

const drop = async id => boardRepo.drop(id);

module.exports = { getAll, create, getById, update, drop };
