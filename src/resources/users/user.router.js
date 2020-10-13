const router = require('express').Router();
const User = require('./user.model');
const usersService = require('./user.service');

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(User.toResponse));
});

router.route('/').post(async (req, res) => {
  const { name, login, password } = req.body;
  const user = await usersService.create(name, login, password);
  res.json(User.toResponse(user));
});

router.route('/:id').get(async (req, res) => {
  const { id } = req.params;
  const user = await usersService.getById(id);
  if (!user) {
    res.status(401).send(`No user with this id - ${id}`);
    return;
  }
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').put(async (req, res) => {
  const params = req.body;
  const user = await usersService.update(req.params.id, params);
  res.status(200).json(User.toResponse(user));
});

router.route('/:id').delete(async (req, res) => {
  await usersService.remove(req.params.id);
  res.sendStatus(204);
});

module.exports = router;
