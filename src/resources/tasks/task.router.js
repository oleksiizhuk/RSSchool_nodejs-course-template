const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { OK, NO_CONTENT, NOT_FOUND } = require('http-status-codes');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await taskService.getTaskByBoardId(boardId);
  res.status(OK).json(tasks);
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const newTask = await taskService.createNewTaskByBoardId(boardId, req.body);
  res.status(OK).json(newTask);
});

router.route('/:taskId').get(async (req, res, next) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.getTaskByBoardIdAndTaskId(boardId, taskId);
  if (task) {
    res.status(OK).json(task);
  } else {
    const err = new Error(`Task with id ${taskId} not found`);
    err.status = NOT_FOUND;
    return next(err);
  }
});

router.route('/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.updateTask(boardId, taskId, req.body);
  res.status(OK).json(task);
});

router.route('/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  await taskService.deleteTask(boardId, taskId);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
