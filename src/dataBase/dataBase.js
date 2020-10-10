const User = require('../resources/users/user.model');
const usersMock = require('../common/mock/users');

const dataBase = {
  Users: [],
  Boards: [],
  Tasks: [],

  init: () => {
    dataBase.Users = usersMock.map(
      ({ name, login, password }) => new User({ name, login, password })
    );
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

const getEntity = async (tableName, id) => {
  const table = dataBase[tableName];
  const result = table.find(item => item.id === id);
  if (!result) {
    throw `error in ${tableName} don't have entity with this id - ${id}`;
  }
  console.log('4 result - ', result);
  return result;
};

const create = async (tableName, val) => {
  const table = dataBase[tableName];
  table.push(val);
  return await getEntity(tableName, val.id);
};

const deleteFromDb = async (tableName, id) => {
  await getEntity(tableName, id);
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
  return await getEntity(tableName, id);
};

module.exports = { dataBase, create, deleteFromDb, updateEntity };
