const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.status(200).json(boards);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardService.create(title, columns);
  res.status(200).json(board);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardService.getById(id);
  if (board) {
    res.status(200).json(board);
  } else {
    res.status(404).send(`Board with id ${id} not found`);
  }
});

router.route('/:id').put(async (req, res) => {
  const { id } = req.params;
  const board = await boardService.update(id, req.body);
  res.status(200).json(board);
});

router.route('/:id').delete(async (req, res) => {
  await boardService.drop(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
