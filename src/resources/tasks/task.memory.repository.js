const DB = require('../../dataBase/dataBase');
const { BOARDS } = require('../../common/constants/constants');

const getTaskByBoardId = async boardId => {
  const { columns } = await DB.getEntityById(BOARDS, boardId);
  return columns;
};

const createNewTaskByBoardId = async (boardId, values) => {
  return await DB.createTask(boardId, values);
};

const getTaskByBoardIdAndTaskId = async (boardId, taskId) => {
  const board = await DB.getEntityById(BOARDS, boardId);
  return board.columns.find(item => item.id === taskId);
};

const updateTask = async (boardId, taskId, params) => {
  return await DB.updateTask(boardId, taskId, params);
};

const deleteTask = async (boardId, taskId) => {
  return await DB.deleteTask(boardId, taskId);
};

module.exports = {
  getTaskByBoardId,
  createNewTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  updateTask,
  deleteTask
};
