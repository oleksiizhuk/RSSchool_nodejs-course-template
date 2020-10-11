const User = require('../resources/users/user.model');
const Borad = require('../resources/boards/board.model');
const usersMock = require('../common/mock/users');

const dataBase = {
  Users: [],
  Boards: [],
  Tasks: [],

  init: () => {
    dataBase.Users = usersMock.map(
      ({ name, login, password }) => new User({ name, login, password })
    );
    dataBase.Boards = [new Borad()];
  }
};

(() => {
  dataBase.init();
})();

// const checkForAvailability = (tableName, id) => {
//   const table = dataBase[tableName];
//   const findet = table.find(item => item.id === id);
//   if (!findet) {
//     throw `dont find by this id ${id}`;
//   }
// };

const getEntityById = async (tableName, id) => {
  const table = dataBase[tableName];
  console.log('id - ', id);
  console.log('table - ', table);
  const result = table.find(item => item.id === id);
  console.log('result - ', result);
  if (!result) {
    throw `error in ${tableName} don't have entity with this id - ${id}`;
  }
  console.log('4 result - ', result);
  return result;
};

const create = async (tableName, val) => {
  const table = dataBase[tableName];
  table.push(val);
  return await getEntityById(tableName, val.id);
};

const deleteFromDb = async (tableName, id) => {
  await getEntityById(tableName, id);
  const table = dataBase[tableName];
  dataBase[tableName] = table.filter(item => item.id !== id);
};

const updateEntity = async (tableName, id, params) => {
  const table = dataBase[tableName];
  console.log('2 - ', table);
  dataBase[tableName] = table.map(item => {
    if (item.id === id) {
      item.name = params.name;
      item.login = params.login;
      item.password = params.password;
    }
    return item;
  });
  console.log('3 - ', dataBase[tableName]);
  return await getEntityById(tableName, id);
};

const updateBoard = async (tableName, id, params) => {
  console.log('params - ', params);
  const table = dataBase[tableName];
  dataBase[tableName] = table.map(item => {
    if (item.id === id) {
      item.title = params.title;
      item.columns = params.columns;
    }
    return item;
  });
  return await getEntityById(tableName, id);
};

module.exports = {
  dataBase,
  create,
  deleteFromDb,
  updateEntity,
  updateBoard,
  getEntityById
};
