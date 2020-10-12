const router = require('express').Router({ mergeParams: true });

const taskService = require('./task.service');

router.route('/').get(async (req, res) => {
  const { boardId } = req.params;
  const tasks = await taskService.getTaskByBoardId(boardId);
  res.json(tasks);
});

router.route('/').post(async (req, res) => {
  const { boardId } = req.params;
  const newTask = await taskService.createNewTaskByBoardId(boardId, req.body);
  res.status(200).json(newTask);
});

router.route('/:taskId').get(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.getTaskByBoardIdAndTaskId(boardId, taskId);
  if (task) {
    res.json(task);
  } else {
    res.status(404).send(`Task with id ${taskId} not found`);
  }
});

router.route('/:taskId').put(async (req, res) => {
  const { boardId, taskId } = req.params;
  const task = await taskService.updateTask(boardId, taskId, req.body);
  res.json(task);
});

router.route('/:taskId').delete(async (req, res) => {
  const { boardId, taskId } = req.params;
  await taskService.deleteTask(boardId, taskId);
  res.sendStatus(204);
});

module.exports = router;
