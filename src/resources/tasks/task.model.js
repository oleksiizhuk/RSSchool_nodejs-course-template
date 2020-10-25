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

module.exports = mongoose.model('tasks', Task);

// const uuid = require('uuid');
//
// class Task {
//   constructor({
//     id = uuid(),
//     title = 'title',
//     order = 0,
//     description = '',
//     userId = '',
//     boardId = '',
//     columnId = ''
//   } = {}) {
//     this.id = id;
//     this.title = title;
//     this.order = order;
//     this.description = description;
//     this.userId = userId;
//     this.boardId = boardId;
//     this.columnId = columnId;
//   }
// }
//
// module.exports = Task;
