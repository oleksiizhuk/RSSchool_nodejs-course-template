const Task = require('./task.model');

const getTaskByBoardId = async id => {
  console.log('getTaskByBoardId - ', id);
  const res = await Task.find({ boardId: id });
  console.log(res);
  return res;
};

const create = async (boardId, values) => {
  return Task.create({ ...values, boardId });
};

const getByBoardAndTaskId = async (boardId, taskId) => {
  return await Task.findOne({
    boardId,
    _id: taskId
  });
};

const updateTask = async (boardId, taskId, params) => {
  return await Task.updateOne({ boardId, _id: taskId }, params);
};

const deleteTask = async (boardId, taskId) => {
  await Task.deleteOne({ _id: taskId, boardId });
};

module.exports = {
  getTaskByBoardId,
  create,
  getByBoardAndTaskId,
  updateTask,
  deleteTask
};
