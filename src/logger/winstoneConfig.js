const { createLogger, transports, format } = require('winston');

const winston = createLogger({
  transports: [
    new transports.File({
      filename: `${__dirname}/logs/info.log`,
      level: 'info',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: `${__dirname}/logs/error.log`,
      level: 'error',
      format: format.combine(format.timestamp(), format.json())
    }),
    new transports.File({
      filename: `${__dirname}/logs/warm.log`,
      level: 'warn',
      format: format.combine(format.timestamp(), format.json())
    })
  ]
});

module.exports = winston;
