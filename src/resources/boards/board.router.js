const router = require('express').Router();
const boardService = require('./board.service');
const { OK, NO_CONTENT, NOT_FOUND } = require('http-status-codes');
const { asyncErrorHandler } = require('../../errorHandler/errorHandler');
const { toResponse } = require('./board.model');
const { id } = require('../../utils/validation/schemas');
const validator = require('../../utils/validation/validator');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const boards = await boardService.getAll();
    res.status(OK).json(boards.map(toResponse));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const board = await boardService.create(req.body);
    res.status(OK).json(toResponse(board));
  })
);

router.get(
  '/:id',
  validator(id, 'params'),
  asyncErrorHandler(async (req, res, next) => {
    const board = await boardService.getById(req.params.id);
    if (!board) {
      const err = new Error(`Board with id ${req.params.id} not found`);
      err.status = NOT_FOUND;
      return next(err);
    }
    return res.status(OK).json(toResponse(board));
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    const board = await boardService.update(req.params.id, req.body);
    res.status(OK).json(toResponse(board));
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    await boardService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
