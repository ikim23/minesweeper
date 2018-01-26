import * as _ from 'lodash';
import Piece from '../pieces/Piece';
import PieceListener from './PieceListener';

export default class Board {
  board: HTMLElement;
  fields: HTMLElement[];

  constructor() {
    this.board = document.getElementById('board');
  }

  create(pieces: Piece[][]) {
    this.board.innerHTML = '';
    this.board.style.gridTemplateRows = `repeat(${pieces.length}, auto)`;
    this.board.style.gridTemplateColumns = `repeat(${pieces[0].length}, auto)`;
    this.fields = _.map(_.flatten(pieces), this.createField);
  }

  private createField = (piece: Piece) => {
    const field = document.createElement('div');
    this.board.appendChild(field);
    field.className = piece.visibleCssClass;
    field.addEventListener('click', piece.leftClick);
    field.addEventListener('contextmenu', (evt) => {
      evt.preventDefault();
      piece.rightClick();
    });
    piece.setListener(new PieceListener(field));
    return field;
  }
}
