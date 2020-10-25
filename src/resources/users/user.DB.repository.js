const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');

const getAll = async () => User.find({});

const create = async user => User.create(user);

const getById = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw 'user was not found';
  }
  return user;
};

const remove = async id => {
  await User.deleteOne({ _id: id });
  await Task.updateMany({ userId: id }, { userId: null });
};

const update = async (id, user) => {
  await User.updateOne({ _id: id }, user);
  return await getById(id);
};

module.exports = { getAll, create, getById, remove, update };
