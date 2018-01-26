import Minesweeper from '../Minesweeper';
import Piece from './Piece';

export default class EmptyPiece extends Piece {
  constructor(x: number, y: number, minesweeper: Minesweeper) {
    super(x, y, 'field-empty', minesweeper);
  }

  leftClickImpl(): void {
    this.visibleCssClass = this.cssClass;
    this.minesweeper.showAllEmpty({
      x: this.x,
      y: this.y,
    });
  }
}
