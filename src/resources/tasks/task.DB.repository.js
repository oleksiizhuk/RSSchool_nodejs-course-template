const { Task } = require('./task.model');

const getTaskByBoardId = async id => Task.find({ boardId: id });

const create = async (boardId, values) => Task.create({ ...values, boardId });

const getByBoardAndTaskId = async (boardId, taskId) =>
  Task.findOne({
    boardId,
    _id: taskId
  });

const updateTask = async (boardId, taskId, params) =>
  Task.updateOne({ boardId, _id: taskId }, params);

const deleteTask = async (boardId, taskId) =>
  Task.deleteOne({ _id: taskId, boardId });

module.exports = {
  getTaskByBoardId,
  create,
  getByBoardAndTaskId,
  updateTask,
  deleteTask
};
