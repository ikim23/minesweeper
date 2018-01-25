/* eslint-disable no-undef */
import _ from 'lodash';

export default class Board {
  constructor() {
    this.board = document.getElementById('board');
    this.fields = [];
  }

  create(pieces) {
    this.board.style.gridTemplateRows = `repeat(${pieces.length}, auto)`;
    this.board.style.gridTemplateColumns = `repeat(${pieces[0].length}, auto)`;
    _.each(_.flatten(pieces), (piece) => {
      const field = this.createField();
      if (piece.type === 'mine') {
        field.className = 'field-mine';
      } else if (_.isNumber(piece.type)) {
        field.className = `field-${piece.type}`;
      } else {
        field.className = 'field';
      }
      this.fields.push(field);
    });
  }

  createField() {
    const field = document.createElement('div');
    this.board.appendChild(field);
    return field;
  }
}
