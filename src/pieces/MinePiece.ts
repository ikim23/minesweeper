import Minesweeper from '../Minesweeper';
import Piece from './Piece';

export default class MinePiece extends Piece {
  constructor(x: number, y: number, minesweeper: Minesweeper) {
    super(x, y, 'field-flag', minesweeper);
  }

  leftClickImpl(): void {
    this.visibleCssClass = 'field-mine';
    this.minesweeper.gameOver = true;
  }
}
