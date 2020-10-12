const DB = require('../../dataBase/dataBase');
const Board = require('./board.model');
const { BOARDS } = require('../../common/constants/constants');

const getAll = async () => {
  const { Boards } = DB.dataBase;
  return Boards;
};

const create = async (title, columns) => {
  const newBord = new Board({ title, columns });
  return await DB.create(BOARDS, newBord);
};

const getByID = async id => {
  const board = await DB.getEntityById(BOARDS, id);
  if (!board) {
    return null;
  }
  return board;
};

const update = async (id, params) => {
  return await DB.updateBoard(BOARDS, id, params);
};

const drop = async id => {
  await DB.deleteFromDb(BOARDS, id);
};

module.exports = { getAll, create, getByID, update, drop };
