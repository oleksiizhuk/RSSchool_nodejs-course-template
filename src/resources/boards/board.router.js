const router = require('express').Router();
const boardService = require('./board.service');
const { OK, NO_CONTENT, NOT_FOUND } = require('http-status-codes');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.status(OK).json(boards);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardService.create(title, columns);
  res.status(OK).json(board);
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  const board = await boardService.getById(id);
  if (board) {
    res.status(OK).json(board);
  } else {
    const err = new Error(`Board with id ${id} not found`);
    err.status = NOT_FOUND;
    return next(err);
    // res.status(NOT_FOUND).send(`Board with id ${id} not found`);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const board = await boardService.update(id, req.body);
  res.status(OK).json(board);
});

router.route('/:id').delete(async (req, res) => {
  await boardService.drop(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
