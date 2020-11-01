const loginDB = require('./login.DB.repositury');
const jwt = require('jsonwebtoken');
const { JWT_SECRET_KEY } = require('../../common/config/config');
const { checkHashPassword } = require('../../utils/hashhelper');
const { FORBIDDEN } = require('http-status-codes');

const singToken = async (log, password) => {
  const user = await loginDB.singToken(log);
  const { password: hashPassword, id, login } = user;
  const hashPass = await checkHashPassword(password, hashPassword);
  if (!hashPass) {
    throw { message: 'wrong login or password', status: FORBIDDEN };
  }
  return jwt.sign({ id, login }, JWT_SECRET_KEY);
};

module.exports = { singToken };
