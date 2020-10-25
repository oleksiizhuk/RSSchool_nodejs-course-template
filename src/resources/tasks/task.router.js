const router = require('express').Router({ mergeParams: true });
const taskService = require('./task.service');
const { OK, NO_CONTENT, NOT_FOUND } = require('http-status-codes');
const { asyncErrorHandler } = require('../../errorHandler/errorHandler');
const { toResponse } = require('./task.model');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const tasks = await taskService.getTaskByBoardId(req.params.boardId);
    res.status(OK).json(tasks.map(toResponse));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const newTask = await taskService.create(req.params.boardId, req.body);
    res.status(OK).json(toResponse(newTask));
  })
);

router.route('/:taskId').get(
  asyncErrorHandler(async (req, res, next) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.getByBoardAndTaskId(boardId, taskId);
    if (task) {
      res.status(OK).json(toResponse(task));
    } else {
      const err = new Error(`Task with id ${taskId} not found`);
      err.status = NOT_FOUND;
      return next(err);
    }
  })
);

router.route('/:taskId').put(
  asyncErrorHandler(async (req, res) => {
    const { boardId, taskId } = req.params;
    const task = await taskService.updateTask(boardId, taskId, req.body);
    res.status(OK).json(task);
  })
);

router.route('/:taskId').delete(
  asyncErrorHandler(async (req, res) => {
    const { boardId, taskId } = req.params;
    await taskService.deleteTask(boardId, taskId);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
