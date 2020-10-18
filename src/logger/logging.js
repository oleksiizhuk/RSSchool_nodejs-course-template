const { finished } = require('stream');
const winston = require('./winstoneConfig');
const { INFO } = require('../common/constants/constants');

const loggerMiddleware = (req, res, next) => {
  const { method, originalUrl } = req;
  const { statusCode } = res;
  const start = Date.now();
  finished(res, () => {
    const ms = Date.now() - start;
    logger(
      INFO,
      `${originalUrl}, ${method}, ${statusCode}, [${ms}ms], ${JSON.stringify(
        req.params
      )}, ${JSON.stringify(req.body)}`.replace(/\r?\n|\r/g, '')
    );
  });
  next();
};

const logger = (status = INFO, val) => {
  winston[status](val);
};

module.exports = { logger, loggerMiddleware };
