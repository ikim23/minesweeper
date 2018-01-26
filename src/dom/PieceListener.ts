import Piece from '../pieces/Piece';

export default class PieceListener {
  field: HTMLElement;

  constructor(field: HTMLElement) {
    this.field = field;
  }

  update = (piece: Piece) => {
    this.field.className = piece.visibleCssClass;
  }
}
