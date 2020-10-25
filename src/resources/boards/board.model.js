const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: String,
    columns: Array
  },
  { collection: 'Board' }
);

module.exports = mongoose.model('boards', Board);

// const uuid = require('uuid');
//
// class Board {
//   constructor({ id = uuid(), title = 'title', columns = [] } = {}) {
//     this.id = id;
//     this.title = title;
//     this.columns = columns;
//   }
// }
//
// module.exports = Board;
