const taskRepo = require('./task.memory.repository');

const getTaskByBoardId = boardId => taskRepo.getTaskByBoardId(boardId);

const createNewTaskByBoardId = (boardId, value) =>
  taskRepo.createNewTaskByBoardId(boardId, value);

const getTaskByBoardIdAndTaskId = (boardId, taskId) =>
  taskRepo.getTaskByBoardIdAndTaskId(boardId, taskId);

const updateTask = (boardId, taskId, params) =>
  taskRepo.updateTask(boardId, taskId, params);

const deleteTask = (boardId, taskId) => taskRepo.deleteTask(boardId, taskId);

module.exports = {
  getTaskByBoardId,
  createNewTaskByBoardId,
  getTaskByBoardIdAndTaskId,
  updateTask,
  deleteTask
};
