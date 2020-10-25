const { logger } = require('../logger/logging');
const { ERROR } = require('../common/constants/constants');

process.on('uncaughtException', error => {
  logger(ERROR, `uncaughtException error: ${JSON.stringify(error.message)}`);
  const exit = process.exit;
  exit(1);
});

process.on('unhandledRejection', error => {
  logger(ERROR, `unhandledRejection error: ${JSON.stringify(error.message)}`);
  const exit = process.exit;
  exit(1);
});

const badRoute = async (req, res, next) => {
  const err = new Error('Not found');
  err.status = 404;
  next(err);
};

const asyncErrorHandler = callback => async (req, res, next) => {
  try {
    return await callback(req, res, next);
  } catch (error) {
    return next(error);
  }
};

// eslint-disable-next-line no-unused-vars
const errorHandler = (error, req, res, next) => {
  console.log(error);
  const { message, status } = error;
  const errMessage = { error: { msg: message } };
  logger(ERROR, errMessage);
  return res.status(status || 500).json(errMessage);
};

module.exports = { errorHandler, asyncErrorHandler, badRoute };
