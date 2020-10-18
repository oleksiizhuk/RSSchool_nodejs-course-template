const { finished } = require('stream');
const winston = require('./winstoneConfig');

const logger = (req, res, next) => {
  console.log(' ============== logger ==============');
  const { method, originalUrl } = req;
  const { statusCode } = res;
  const start = Date.now();
  finished(res, () => {
    console.log('finished');
    const ms = Date.now() - start;
    winston.info(
      `${originalUrl}, ${method}, ${statusCode}, [${ms}ms], ${JSON.stringify(
        req.params
      )}, ${JSON.stringify(req.body)}`.replace(/\r?\n|\r/g, '')
    );
  });
  next();
};

module.exports = logger;
