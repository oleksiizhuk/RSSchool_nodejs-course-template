const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    title: String,
    order: Number,
    description: String,
    userId: String,
    boardId: String,
    columnId: String
  },
  { collection: 'Task' }
);

const toResponse = ({
  _id,
  title,
  order,
  description,
  userId,
  boardId,
  columnId
}) => {
  return {
    id: _id,
    title,
    order,
    description,
    userId,
    boardId,
    columnId
  };
};

module.exports = { Task: mongoose.model('tasks', Task), toResponse };
