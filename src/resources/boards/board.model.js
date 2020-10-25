const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const Board = new Schema(
  {
    title: String,
    columns: Array
  },
  { collection: 'Board' }
);

const toResponse = ({ columns, _id, title }) => {
  return {
    columns,
    id: _id,
    title
  };
};

module.exports = { Board: mongoose.model('boards', Board), toResponse };
