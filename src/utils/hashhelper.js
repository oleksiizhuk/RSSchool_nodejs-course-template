const bcrypt = require('bcrypt');
const { DEFAULT_SALT_ROUND } = require('../common/constants/constants');

const onHashPassword = async password => {
  const salt = await bcrypt.genSalt(DEFAULT_SALT_ROUND);
  return await bcrypt.hash(password, salt);
};

const checkHashPassword = async (password, hash) =>
  await bcrypt.compare(password, hash);

module.exports = { onHashPassword, checkHashPassword };
