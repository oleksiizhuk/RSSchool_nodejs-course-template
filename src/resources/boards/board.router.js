const router = require('express').Router();
const boardService = require('./board.service');

router.route('/').get(async (req, res) => {
  const boards = await boardService.getAll();
  res.status(200).send(boards);
});

router.route('/').post(async (req, res) => {
  const { title, columns } = req.body;
  const board = await boardService.create(title, columns);
  res.status(200).send(board);
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const board = await boardService.getById(id);
  if (!board) {
    res.status(401).send(`No board with this id - ${id}`);
  }
  res.status(200).send(board);
});

router.route('/:id').put(async (req, res) => {
  const params = req.body;
  const { id } = req.params;
  const board = await boardService.update(id, params);
  res.status(200).send(board);
});

router.route('/:id').delete(async (req, res) => {
  await boardService.drop(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
