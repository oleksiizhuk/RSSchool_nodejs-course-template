const router = require('express').Router();
const { toResponse } = require('./user.model');
const usersService = require('./user.service');
const { OK, NO_CONTENT, BAD_REQUEST } = require('http-status-codes');
const { asyncErrorHandler } = require('../../errorHandler/errorHandler');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(toResponse));
  })
);

router.route('/').post(
  asyncErrorHandler(async (req, res) => {
    const user = await usersService.create(req.body);
    res.status(OK).json(toResponse(user));
  })
);

router.route('/:id').get(
  asyncErrorHandler(async (req, res, next) => {
    const { id } = req.params;
    const user = await usersService.getById(id);
    if (!user) {
      const err = new Error('Bad request');
      err.status = BAD_REQUEST;
      return next(err);
    }
    res.status(OK).json(toResponse(user));
  })
);

router.route('/:id').put(
  asyncErrorHandler(async (req, res, next) => {
    const params = req.body;
    const user = await usersService.update(req.params.id, params);
    if (!user) {
      const err = new Error('Bad request');
      err.status = BAD_REQUEST;
      return next(err);
    }
    res.status(OK).json(toResponse(user));
  })
);

router.route('/:id').delete(
  asyncErrorHandler(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
