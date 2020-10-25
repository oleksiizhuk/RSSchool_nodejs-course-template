const boardRepo = require('./board.DB.repository');

const getAll = async () => boardRepo.getAll();

const create = async board => boardRepo.create(board);

const getById = async boardId => boardRepo.getById(boardId);

const update = async (boardId, params) => boardRepo.update(boardId, params);

const remove = async boardId => boardRepo.remove(boardId);

module.exports = { getAll, create, getById, update, remove };
