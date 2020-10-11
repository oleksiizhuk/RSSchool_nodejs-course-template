const DB = require('../../dataBase/dataBase');
const User = require('./user.model');
const { USERS } = require('../../common/constants/constants');

const getAll = async () => {
  const { Users } = DB.dataBase;
  return Users;
};

const getForId = async userId => {
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

const deleteUser = async id => {
  // drop or remove
  await DB.deleteFromDb(USERS, id);
};

const update = async (id, params) => {
  console.log('1 ', params);
  const entity = await DB.updateEntity(USERS, id, params);
  console.log('update - entity', entity);
  return entity;
};

module.exports = { getAll, getForId, create, deleteUser, update };
