const mongoose = require('mongoose');
const { PORT, MONGO_CONNECTION_STRING } = require('./common/config/config');
const app = require('./app');
const { logger } = require('./logger/logging');

mongoose.connect(MONGO_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});

const db = mongoose.connection;

db.on('error', () => logger('error', 'MongoDB connection error:')).once(
  'open',
  () => {
    logger('info', 'Successfully connect to DB');
    console.log('infoSuccessfully connect to DB');
    app.listen(PORT, () =>
      logger('info', `App is running on http://localhost:${PORT}`)
    );
  }
);
