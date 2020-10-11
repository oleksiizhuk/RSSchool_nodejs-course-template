const User = require('../resources/users/user.model');
const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

const usersMock = require('../common/mock/users');

const dataBase = {
  Users: [],
  Boards: [],
  Tasks: [],

  init: () => {
    dataBase.Users = usersMock.map(
      ({ name, login, password }) => new User({ name, login, password })
    );
    dataBase.Boards = [new Board()];
  }
};

(() => {
  dataBase.init();
})();

const getEntityById = async (tableName, id) => {
  const table = dataBase[tableName];
  const result = table.find(item => item.id === id);
  if (!result) {
    throw `error in ${tableName} don't have entity with this id - ${id}`;
  }
  return result;
};

const create = async (tableName, val) => {
  const table = dataBase[tableName];
  table.push(val);
  return await getEntityById(tableName, val.id);
};

const deleteFromDb = async (tableName, id) => {
  await getEntityById(tableName, id);
  const table = dataBase[tableName];
  dataBase[tableName] = table.filter(item => item.id !== id);
};

const updateEntity = async (tableName, id, params) => {
  const table = dataBase[tableName];
  dataBase[tableName] = table.map(item => {
    if (item.id === id) {
      item.name = params.name;
      item.login = params.login;
      item.password = params.password;
    }
    return item;
  });
  return await getEntityById(tableName, id);
};

const updateBoard = async (tableName, id, params) => {
  const table = dataBase[tableName];
  dataBase[tableName] = table.map(item => {
    if (item.id === id) {
      item.title = params.title;
      item.columns = params.columns;
    }
    return item;
  });
  return await getEntityById(tableName, id);
};

const createTask = async (boardId, values) => {
  const boardIndex = getIndexBoardById(boardId);
  const newTask = { ...new Task({ ...values }) };
  dataBase.Boards[boardIndex].columns.push(newTask);
  return newTask;
};

const getIndexBoardById = boardId => {
  const indexBoard = dataBase.Boards.findIndex(item => item.id === boardId);
  if (indexBoard > 0) {
    console.log(`don't have board with this boardId ${boardId}`);
    return false;
  }
  return indexBoard;
};

const deleteTask = async (boardId, taskId) => {
  const indexBoard = getIndexBoardById(boardId);
  const indexTask = dataBase.Boards[indexBoard].columns.findIndex(
    item => item.id === taskId
  );
  if (indexTask < 0) {
    console.log(`don't have task with this taskId ${taskId}`);
    return false;
  }
  dataBase.Boards[indexBoard].columns = dataBase.Boards[
    indexBoard
  ].columns.filter(item => item.id !== taskId);
  return true;
};

const updateTask = async (boardId, taskId, params) => {
  const indexBoard = getIndexBoardById(boardId);
  const indexTask = dataBase.Boards[indexBoard].columns.findIndex(
    item => item.id === taskId
  );
  if (indexTask < 0) {
    console.log(`don't have task with this taskId ${taskId}`);
    return false;
  }
  dataBase.Boards[indexBoard].columns[indexTask] = Object.assign(
    dataBase.Boards[indexBoard].columns[indexTask],
    params
  );
  return dataBase.Boards[indexBoard].columns[indexTask];
};

module.exports = {
  dataBase,
  create,
  deleteFromDb,
  updateEntity,
  updateBoard,
  getEntityById,
  deleteTask,
  updateTask,
  createTask
};
