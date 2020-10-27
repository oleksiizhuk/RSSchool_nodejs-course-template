const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/board.router');
const taskRouter = require('./resources/tasks/task.router');
const { loggerMiddleware } = require('./logger/logging');
const { errorHandler, badRoute } = require('./errorHandler/errorHandler');
const app = express();
const cors = require('cors');
const helmet = require('helmet');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

app.use(express.json());

app.disable('x-powered-by');

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(helmet());
app.use(cors());

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});

app.use(loggerMiddleware);
app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards/:boardId/tasks', taskRouter);
app.use(badRoute);
app.use(errorHandler);

module.exports = app;
