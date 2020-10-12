const uuid = require('uuid');

class Board {
  constructor({
    id = uuid(),
    title = 'title',
    columns = [
      {
        id: uuid(),
        title: 'string',
        order: 1
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
