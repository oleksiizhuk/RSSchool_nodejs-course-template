// const User = require('../resources/users/user.model');
// const Board = require('../resources/boards/board.model');
const Task = require('../resources/tasks/task.model');

// const usersMock = require('../common/mock/users');

const dataBase = {
  Users: [],
  Boards: [],
  Tasks: [],
  init: () => {
    // dataBase.Users = usersMock.map(
    //   ({ name, login, password }) => new User({ name, login, password })
    // );
    // dataBase.Boards = [new Board()];
    dataBase.Tasks = [new Task()];
  }
};

(() => {
  dataBase.init();
})();

const getEntityById = async (tableName, id) => {
  return dataBase[tableName].find(item => item.id === id);
};

const getAllItems = async (tableName, id) => {
  return dataBase[tableName].filter(el => el.boardId === id);
};

const getTaskById = async (tableName, boardId, taskId) => {
  return dataBase[tableName].find(
    el => el.id === taskId && el.boardId === boardId
  );
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

const deleteBoard = async (tableName, boardId) => {
  const table = dataBase[tableName];
  dataBase[tableName] = table.filter(item => item.id !== boardId);
  dataBase.Tasks = dataBase.Tasks.filter(item => item.boardId !== boardId);
};

const deleteTask = async (boardId, taskId) => {
  dataBase.Tasks = dataBase.Tasks.filter(el => {
    if (el.id === taskId && el.boardId === boardId) {
      return;
    }
    return el;
  });
};

const updateEntity = async (tableName, id, params) => {
  const table = dataBase[tableName];
  const index = table.findIndex(item => item.id === id);
  dataBase[tableName][index] = { ...table[index], ...params };
  return await getEntityById(tableName, id);
};

const deleteUserFromTask = async id => {
  return dataBase.Tasks.map(task => {
    if (task.userId === id) {
      task.userId = null;
    }
  });
};

const updateTask = async (boardId, taskId, params) => {
  const indexTask = dataBase.Tasks.findIndex(
    el => el.boardId === boardId && el.id === taskId
  );
  dataBase.Tasks[indexTask] = { ...dataBase.Tasks[indexTask], ...params };
  return dataBase.Tasks[indexTask];
};

module.exports = {
  create,
  deleteFromDb,
  updateEntity,
  getEntityById,
  deleteTask,
  updateTask,
  deleteUserFromTask,
  getTaskById,
  getAllItems,
  deleteBoard
};
