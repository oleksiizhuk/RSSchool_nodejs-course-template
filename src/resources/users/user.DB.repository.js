const { User } = require('./user.model');
const { Task } = require('../tasks/task.model');
const { NOT_FOUND } = require('http-status-codes');

const getAll = async () => User.find({});

const create = async user => User.create(user);

const getById = async id => {
  const user = await User.findById(id);
  if (!user) {
    throw { message: 'user was not found', status: NOT_FOUND };
  }
  return user;
};

const remove = async id => {
  await User.deleteOne({ _id: id });
  await Task.updateMany({ userId: id }, { userId: null });
};

const update = async (id, user) => {
  await User.updateOne({ _id: id }, user, { new: true });
  return await getById(id);
};

module.exports = { getAll, create, getById, remove, update };
