const DB = require('../../dataBase/dataBase');
const Board = require('./board.model');
const { BOARDS } = require('../../common/constants/constants');

const getAll = async () => {
  return await DB.getAllItems(BOARDS);
};

const create = async (title, columns) => {
  return await DB.create(BOARDS, new Board({ title, columns }));
};

const getByID = async boardId => {
  return await DB.getEntityById(BOARDS, boardId);
};

const update = async (boardId, params) => {
  return await DB.updateEntity(BOARDS, boardId, params);
};

const drop = async boardId => {
  await DB.deleteBoard(BOARDS, boardId);
};

module.exports = { getAll, create, getByID, update, drop };
