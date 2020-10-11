const uuid = require('uuid');

// {
//   "id": "string",
//   "title": "string",
//   "columns": [
//   {
//     "id": "string",
//     "title": "string",
//     "order": 0
//   }
// ]
// }
class Board {
  constructor({
    id = uuid(),
    title = 'title',
    columns = [
      {
        id: uuid(),
        title: 'string',
        order: 0
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
