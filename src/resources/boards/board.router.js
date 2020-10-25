const router = require('express').Router();
const boardService = require('./board.service');
const { OK, NO_CONTENT, NOT_FOUND } = require('http-status-codes');
const { asyncErrorHandler } = require('../../errorHandler/errorHandler');
// const validatior = require('../../utils/validator');
const { id } = require('../../utils/schemas');

const toResponse = ({ columns, _id, title }) => {
  return {
    columns,
    id: _id,
    title
  };
};

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

router.route('/:id').get(
  asyncErrorHandler(async (req, res, next) => {
    // const { id } = req.params;
    const board = await boardService.getById(req.params.id);
    if (board) {
      res.status(OK).json(toResponse(board));
    } else {
      const err = new Error(`Board with id ${id} not found`);
      err.status = NOT_FOUND;
      return next(err);
    }
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res) => {
    // const { id } = req.params.id;
    const board = await boardService.update(req.params.id, req.body);
    res.status(OK).json(toResponse(board));
  })
);

router
  .route('/:id')
  // .use(validatior(id, 'params'))
  .delete(
    asyncErrorHandler(async (req, res) => {
      await boardService.remove(req.params.id);
      res.sendStatus(NO_CONTENT);
    })
  );

module.exports = router;
