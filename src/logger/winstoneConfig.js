const { createLogger, transports, format } = require('winston');
const { INFO, ERROR, WARM } = require('../common/constants/constants');

const winston = createLogger({
  transports: [
    new transports.File({
      filename: `${__dirname}/logs/info.log`,
      level: INFO,
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: `${__dirname}/logs/error.log`,
      level: ERROR,
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: `${__dirname}/logs/warm.log`,
      level: WARM,
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

module.exports = winston;
