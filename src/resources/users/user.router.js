const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');
const { OK, NO_CONTENT, BAD_REQUEST } = require('http-status-codes');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(OK).json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = await usersService.create(name, login, password);
  res.status(OK).json(User.toResponse(user));
});

router.route('/:id').get(async (req, res, next) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  if (!user) {
    const err = new Error('Bad request');
    err.status = BAD_REQUEST;
    return next(err);
  }
  res.status(OK).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res, next) => {
  const params = req.body;
  const user = await usersService.update(req.params.id, params);
  if (!user) {
    const err = new Error('Bad request');
    err.status = BAD_REQUEST;
    return next(err);
  }
  res.status(OK).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(NO_CONTENT);
});

module.exports = router;
