const router = require('express').Router();
const { toResponse } = require('./user.model');
const usersService = require('./user.service');
const { OK, NO_CONTENT, BAD_REQUEST } = require('http-status-codes');
const { asyncErrorHandler } = require('../../errorHandler/errorHandler');
const { id } = require('../../utils/validation/schemas');
const validator = require('../../utils/validation/validator');

router.route('/').get(
  asyncErrorHandler(async (req, res) => {
    const users = await usersService.getAll();
    res.status(OK).json(users.map(toResponse));
  })
);

router.post(
  '/',
  asyncErrorHandler(async (req, res) => {
    const newUser = await usersService.create(req.body);
    res.status(OK).json(toResponse(newUser));
  })
);

router.get(
  '/:id',
  validator(id, 'params'),
  asyncErrorHandler(async (req, res) => {
    const foundUser = await usersService.getById(req.params.id);
    res.status(OK).send(toResponse(foundUser));
  })
);

router.put(
  '/:id',
  validator(id, 'params'),
  asyncErrorHandler(async (req, res, next) => {
    const params = req.body;
    const updatedUser = await usersService.update(req.params.id, params);
    if (!updatedUser) {
      const err = new Error('Bad request');
      err.status = BAD_REQUEST;
      return next(err);
    }
    res.status(OK).json(toResponse(updatedUser));
  })
);

router.delete(
  '/:id',
  validator(id, 'params'),
  asyncErrorHandler(async (req, res) => {
    await usersService.remove(req.params.id);
    res.sendStatus(NO_CONTENT);
  })
);

module.exports = router;
