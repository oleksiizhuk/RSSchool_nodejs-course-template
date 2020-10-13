const DB = require('../../dataBase/dataBase');
const User = require('./user.model');
const { USERS } = require('../../common/constants/constants');

const getAll = async () => {
  return await DB.getAllItems(USERS);
};

const getById = async userId => {
  return await DB.getEntityById(USERS, userId);
};

const create = async (name, login, password) => {
  return await DB.create(USERS, new User({ name, login, password }));
};

const update = async (id, params) => {
  return await DB.updateEntity(USERS, id, params);
};

const remove = async id => {
  await DB.deleteUserFromTask(id);
  return await DB.deleteFromDb(USERS, id);
};

module.exports = { getAll, getById, create, remove, update };
