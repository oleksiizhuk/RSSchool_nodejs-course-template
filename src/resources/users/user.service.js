const usersDB = require('./user.DB.repository');
const { onHashPassword } = require('../../utils/hashhelper');

const getAll = () => usersDB.getAll();

const create = async user => {
  const { login, name, password } = user;
  const newPass = await onHashPassword(password);
  return usersDB.create({ login, name, password: newPass });
};

const getById = id => usersDB.getById(id);

const update = (id, user) => usersDB.update(id, user);

const remove = id => usersDB.remove(id);

module.exports = { getAll, create, getById, update, remove };
