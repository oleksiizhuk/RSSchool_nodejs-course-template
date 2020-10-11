const DB = require('../../dataBase/dataBase');
const Board = require('./board.model');
const { BOARDS } = require('../../common/constants/constants');

const getAll = async () => {
  const { Boards } = DB.dataBase;
  return Boards;
};

const create = async (title, column) => {
  const newBord = new Board({ title, column });
  return await DB.create(BOARDS, newBord);
};

const getByID = async id => {
  const board = DB.getEntityById(BOARDS, id);
  if (!board) {
    return null;
  }
  return board;
};

const update = async (id, params) => {
  const entity = DB.updateBoard(BOARDS, id, params);
  console.log('entity - ', entity);
  return entity;
};

const drop = async id => {
  await DB.deleteFromDb(BOARDS, id);
};

module.exports = { getAll, create, getByID, update, drop };
