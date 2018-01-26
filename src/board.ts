/* eslint-disable no-undef */
import _ from 'lodash';

export default class Board {
  constructor() {
    this.board = document.getElementById('board');
    this.gameOver = false;
    this.fields = [];
    this.decorated = this.decorated.bind(this);
  }

  create(pieces) {
    this.pieces = pieces;
    this.board.style.gridTemplateRows = `repeat(${pieces.length}, auto)`;
    this.board.style.gridTemplateColumns = `repeat(${pieces[0].length}, auto)`;
    _.each(pieces, (row) => {
      const fieldRow = [];
      _.each(row, (piece) => {
        const field = this.createField();
        if (piece.type === 'mine') {
          this.setupMine(field);
          field.className = 'field-mine';
        } else if (_.isNumber(piece.type)) {
          this.setupNumberField(field, piece);
          field.className = 'field-' + piece.type;
        } else {
          this.setupEmpty(field, piece);
        }
        fieldRow.push(field);
      });
      this.fields.push(fieldRow);
    });
  }

  createField() {
    const field = document.createElement('div');
    this.board.appendChild(field);
    field.className = 'field';
    return field;
  }

  setupMine(field) {
    field.addEventListener('click', this.decorated(() => {
      this.gameOver = true;
      field.className = 'field-mine';
    }));
    field.addEventListener('contextmenu', this.decorated((evt) => {
      evt.preventDefault();
      field.className = 'field-flag';
    }));
  }

  setupNumberField(field, piece) {
    field.addEventListener('click', this.decorated(() => {
      field.className = `field-${piece.type}`;
    }));
    field.addEventListener('contextmenu', this.decorated((evt) => {
      evt.preventDefault();
      field.className = 'field-flag';
    }));
  }

  setupEmpty(field, piece) {
    field.addEventListener('click', this.decorated(() => {
      console.log('click');
    }).bind(this));
    field.addEventListener('contextmenu', this.decorated((evt) => {
      evt.preventDefault();
      console.log('right click');
    }));
  }

  clickEmpty(piece) {
    
  }

  decorated(listener) {
    return (event) => {
      if (!this.gameOver) {
        listener(event);
      }
    };
  }
}
