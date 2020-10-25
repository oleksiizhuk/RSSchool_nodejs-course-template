const { Board } = require('./board.model');
const { Task } = require('../tasks/task.model');
const { NOT_FOUND } = require('http-status-codes');
const { ObjectId } = require('mongoose').Types;

const getAll = async () => await Board.find({});

const create = async board => Board.create(board);

const getById = async id => {
  const board = await Board.findById(id);
  if (!board) {
    const err = new Error(`board was not found id ${id}`);
    err.status = NOT_FOUND;
    throw err;
  }
  return board;
};

const remove = async boardId => {
  if (!ObjectId.isValid(boardId)) {
    const err = new Error(`id ${boardId} Not Valid`);
    err.status = NOT_FOUND;
    throw err;
  }
  const board = await Board.findOne({ _id: boardId });
  if (!board) {
    const err = new Error('Not Found');
    err.status = NOT_FOUND;
    throw err;
  }
  await Board.deleteOne({ _id: boardId });
  return await Task.deleteMany({ boardId });
};

const update = async (id, board) => {
  await Board.updateOne({ _id: id }, board);
  return await getById(id);
};

module.exports = { getAll, create, getById, remove, update };
