const boardRepo = require('./board.memory.repository');

const getAll = async () => boardRepo.getAll();

const create = async (title, columns) => boardRepo.create(title, columns);

const getById = async boardId => boardRepo.getByID(boardId);

const update = async (boardId, params) => boardRepo.update(boardId, params);

const drop = async boardId => boardRepo.drop(boardId);

module.exports = { getAll, create, getById, update, drop };
