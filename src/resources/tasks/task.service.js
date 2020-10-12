const taskRepo = require('./task.memory.repository');

const getTaskByBoardId = async boardId => taskRepo.getTaskByBoardId(boardId);

const createNewTaskByBoardId = async (boardId, value) =>
  taskRepo.createNewTaskByBoardId(boardId, value);

const getTaskByBoardIdAndTaskId = async (boardId, taskId) =>
  taskRepo.getTaskByBoardIdAndTaskId(boardId, taskId);

const updateTask = async (boardId, taskId, params) =>
  taskRepo.updateTask(boardId, taskId, params);

const deleteTask = async (boardId, taskId) =>
  taskRepo.deleteTask(boardId, taskId);

module.exports = {
  getTaskByBoardId,
  createNewTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  updateTask,
  deleteTask
};
