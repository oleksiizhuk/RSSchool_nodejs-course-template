const DB = require('../../dataBase/dataBase');
const { TASKS } = require('../../common/constants/constants');
const Task = require('./task.model');

const getTaskByBoardId = async boardId => {
  return await DB.getAllItems(TASKS, boardId);
};

const createNewTask = async (boardId, values) => {
  return await DB.create(TASKS, new Task({ ...values, boardId }));
};

const getTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  return await DB.getTaskById(TASKS, boardId, taskId);
};

const updateTask = async (boardId, taskId, params) => {
  return await DB.updateTask(boardId, taskId, params);
};

const deleteTask = async (boardId, taskId) => {
  return await DB.deleteTask(boardId, taskId);
};

module.exports = {
  getTaskByBoardId,
  createNewTask,
  getTaskByBoardIdAndTaskId,
  updateTask,
  deleteTask
};
