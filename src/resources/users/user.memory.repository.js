const DB = require('../../dataBase/dataBase');
const User = require('./user.model');
const { USERS } = require('../../common/constants/constants');

const getAll = async () => {
  const { Users } = DB.dataBase;
  return Users;
};

const getById = async userId => {
  const { Users } = DB.dataBase;
  const user = await Users.find(({ id }) => id === userId);
  if (!user) {
    return null;
  }
  return user;
};

const create = async (name, login, password) => {
  const newUser = new User({ name, login, password });
  return await DB.create(USERS, newUser);
};

const update = async (id, params) => {
  return await DB.updateEntity(USERS, id, params);
};

const remove = async id => {
  await DB.deleteUserFromTask(id);
  return await DB.deleteFromDb(USERS, id);
};

module.exports = { getAll, getById, create, remove, update };
