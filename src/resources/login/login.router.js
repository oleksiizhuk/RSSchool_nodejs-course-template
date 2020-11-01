const router = require('express').Router();
const loginService = require('./login.service');
const { OK, FORBIDDEN } = require('http-status-codes');
const { asyncErrorHandler } = require('../../errorHandler/errorHandler');

router.post(
  '/',
  asyncErrorHandler(async (req, res, next) => {
    const { login, password } = req.body;
    const token = await loginService.singToken(login, password);
    if (!token) {
      const err = new Error('wrong login/password combination!');
      err.status = FORBIDDEN;
      return next(err);
    }
    res.status(OK).json({ token });
  })
);

module.exports = router;
