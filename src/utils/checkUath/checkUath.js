const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config/config');
const {
  PATH_WHITELIST_LOGIN,
  PATH_WHITELIST_DOC
} = require('../../common/constants/constants');
const { UNAUTHORIZED } = require('http-status-codes');

module.exports = (req, res, next) => {
  // eslint-disable-next-line default-case
  switch (req.path) {
    case PATH_WHITELIST_DOC:
    case PATH_WHITELIST_LOGIN:
      return next();
  }

  const authHeader = req.header('Authorization');
  if (authHeader !== undefined) {
    const tokenString = req.header('Authorization');
    const [type, token] = tokenString.split(' ');

    if (type !== 'Bearer') {
      return res.status(UNAUTHORIZED).send('Unauthorized user!');
    }
    const result = jwt.verify(token, JWT_SECRET_KEY, { expiresIn: '24h' });
    if (!result) {
      return res.status(UNAUTHORIZED).send('Unauthorized user!');
    }
    return next();
  }
  return res.status(UNAUTHORIZED).send('Unauthorized user!');
};
