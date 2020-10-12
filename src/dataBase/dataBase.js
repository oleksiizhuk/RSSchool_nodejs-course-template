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
  return table.find(item => item.id === id);
};

const create = async (tableName, val) => {
  const table = dataBase[tableName];
  table.push(val);
  return await getEntityById(tableName, val.id);
};

const deleteFromDb = async (tableName, id) => {
  const table = dataBase[tableName];
  dataBase[tableName] = table.filter(item => item.id !== id);
};

const updateEntity = async (tableName, id, params) => {
  const table = dataBase[tableName];
  const index = table.findIndex(item => item.id === id);
  dataBase[tableName][index] = { ...Object.assign(table[index], params) };
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
  const boardIndex = await getIndexBoardById(boardId);
  const newTask = { ...new Task({ ...values }) };
  dataBase.Boards[boardIndex].columns.push(newTask);
  return newTask;
};

const getIndexBoardById = async boardId => {
  return dataBase.Boards.findIndex(item => item.id === boardId);
};

const deleteTask = async (boardId, taskId) => {
  const indexBoard = await getIndexBoardById(boardId);
  dataBase.Boards[indexBoard].columns = dataBase.Boards[
    indexBoard
  ].columns.filter(item => item.id !== taskId);
  return true;
};

const deleteUserFromTask = async id => {
  return dataBase.Boards.map(item => {
    item.columns.map(task => {
      if (task.userId === id) {
        task.userId = null;
      }
    });
  });
};

const updateTask = async (boardId, taskId, params) => {
  const indexBoard = await getIndexBoardById(boardId);
  if (indexBoard === -1) {
    return null;
  }
  const indexTask = dataBase.Boards[indexBoard].columns.findIndex(
    item => item.id === taskId
  );
  console.log(dataBase.Boards[indexBoard].columns[indexTask]);
  dataBase.Boards[indexBoard].columns[indexTask] = Object.assign(
    dataBase.Boards[indexBoard].columns[indexTask],
    params
  );
  console.log(dataBase.Boards[indexBoard].columns[indexTask]);
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
  createTask,
  deleteUserFromTask
};
