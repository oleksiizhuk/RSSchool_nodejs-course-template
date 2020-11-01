const { User } = require('../users/user.model');
const { NOT_FOUND } = require('http-status-codes');

const singToken = async login => {
  const user = await User.findOne({ login });
  if (!user) {
    throw { message: "user wasn't not found", status: NOT_FOUND };
  }
  return user;
};

module.exports = { singToken };
