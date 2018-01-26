import Minesweeper from '../Minesweeper';
import Piece from './Piece';

export default class NumberPiece extends Piece {
  value: number;

  constructor(x: number, y: number, minesweeper: Minesweeper) {
    super(x, y, 'field-1', minesweeper);
    this.value = 1;
  }

  leftClickImpl(): void {
    this.visibleCssClass = this.cssClass;
  }

  increment = () => {
    this.value += 1;
    this.cssClass = `field-${this.value}`;
  }
}
