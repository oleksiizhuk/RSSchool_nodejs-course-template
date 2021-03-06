const { BAD_REQUEST, UNAUTHORIZED } = require('http-status-codes');

const errorResponse = errors => {
  return {
    status: 'failed',
    errors: errors.map(err => {
      const { path, message } = err;
      return { path, message };
    })
  };
};

const validator = (schema, property) => {
  return (req, res, next) => {
    const { error } = schema.validate(req[property]);
    if (error) {
      res
        .status(property === 'body' ? UNAUTHORIZED : BAD_REQUEST)
        .json({ error: errorResponse(error.details) });
    } else {
      return next();
    }
  };
};

module.exports = validator;
