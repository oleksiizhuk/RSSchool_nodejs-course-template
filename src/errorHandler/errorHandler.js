const logger = require('../logger/winstoneConfig');

process.on('uncaughtException', error => {
  console.log(`1 uncaughtException ${JSON.stringify(error.message)}`);
  logger.error(
    `uncaughtException capture error: ${JSON.stringify(error.message)}`
  );
  const exit = process.exit;
  exit(1);
});

process.on('unhandledRejection', error => {
  console.log(`1 unhandledRejection ${JSON.stringify(error.message)}`);
  logger.error(
    `unhandledRejection capture error: ${JSON.stringify(error.message)}`
  );
  const exit = process.exit;
  exit(1);
});

const errorHandler = (error, req, res) => {
  console.log('============== errorHandler ==============');
  console.log(error.status);

  if (error.status === 404) {
    console.log('andrey popal');
    const errMessage = { error: { msg: `${error.message}` } };
    // console.log(errMessage);
    logger.error(errMessage);
    return res.status(error.status).json(errMessage);
  }

  // res.status(error.status || 500);
  // res.json({
  //   error: {
  //     message: error.message
  //   }
  // });

  res.status(error.status || 500).json({
    error: error.message || 'Internal server error'
  });
  // res.end();
  // next();
};

module.exports = errorHandler;
