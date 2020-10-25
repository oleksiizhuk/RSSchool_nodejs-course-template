const taskRepo = require('./task.DB.repository');

const getTaskByBoardId = async boardId => taskRepo.getTaskByBoardId(boardId);

const create = async (boardId, value) => taskRepo.create(boardId, value);

const getByBoardAndTaskId = async (boardId, taskId) =>
  taskRepo.getByBoardAndTaskId(boardId, taskId);

const updateTask = async (boardId, taskId, params) =>
  taskRepo.updateTask(boardId, taskId, params);

const deleteTask = async (boardId, taskId) =>
  taskRepo.deleteTask(boardId, taskId);

module.exports = {
  getTaskByBoardId,
  create,
  getByBoardAndTaskId,
  updateTask,
  deleteTask
};
