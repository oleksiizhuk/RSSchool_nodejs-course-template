// const uuid = require('uuid');

class Board {
  constructor({
    id = '1',
    title = 'title',
    columns = [
      {
        id: '2',
        title: 'string',
        order: 1
      },
      {
        id: '3',
        title: 'string',
        order: 2
      }
    ]
  } = {}) {
    this.id = id;
    this.title = title;
    this.columns = columns;
  }
}

module.exports = Board;
