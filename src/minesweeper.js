import _ from 'lodash';

export default class Minesweeper {
  constructor(rows, cols) {
    this.rows = rows;
    this.cols = cols;
    this.mineCount = _.ceil(rows * cols * 0.12);
    this.fields = [];
    this.createFields();
    this.setMines();
  }

  createFields() {
    for (let row = 0; row < this.rows; row += 1) {
      const rowFields = [];
      for (let col = 0; col < this.cols; col += 1) {
        rowFields.push({
          type: null,
          x: row,
          y: col,
        });
      }
      this.fields.push(rowFields);
    }
  }

  setMines() {
    const minePositions = [];
    while (minePositions.length < this.mineCount) {
      const position = {
        x: _.random(0, this.rows - 1),
        y: _.random(0, this.cols - 1),
      };
      if (!_.some(minePositions, position)) {
        minePositions.push(position);
        this.fields[position.x][position.y].type = 'mine';
      }
    }
    this.setMineCounts(minePositions);
  }

  setMineCounts(minePositions) {
    const delta = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    _.each(minePositions, ({ x, y }) => {
      const neighbors = _.filter(_.map(delta, ([dX, dY]) => [x + dX, y + dY]), this.validPosition.bind(this));
      _.each(neighbors, ([pX, pY]) => {
        const field = this.fields[pX][pY];
        if (_.isNull(field.type)) {
          field.type = 1;
        } else if (_.isNumber(field.type)) {
          field.type += 1;
        }
      });
    });
  }

  validPosition([x, y]) {
    return x >= 0 && x < this.rows && y >= 0 && y < this.cols;
  }
}
