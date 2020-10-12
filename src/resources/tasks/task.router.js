const router = require('express').Router({ mergeParams: true });

const taskService = require('./task.service');

router.route('/:boardId/tasks').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await taskService.getTaskByBoardId(boardId);
  res.status(200).jsonp([...tasks]);
});

router.route('/:boardId/tasks').post(async (req, res) => {
  const { boardId } = req.params;
  const newTask = await taskService.createNewTaskByBoardId(boardId, req.body);
  res.status(200).json(newTask);
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.getTaskByBoardIdAndTaskId(boardId, taskId);
  res.status(200).send(task);
});

router.route('/:boardId/tasks/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.updateTask(boardId, taskId, req.body);
  res.status(200).json(task);
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  await taskService.deleteTask(boardId, taskId);
  res.sendStatus(204);
});

module.exports = router;
