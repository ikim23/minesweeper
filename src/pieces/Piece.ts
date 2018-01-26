import Minesweeper from '../Minesweeper';
import PieceListener from '../dom/PieceListener';

export default abstract class Piece {
  x: number;
  y: number;
  isClickable: boolean;
  cssClass: string;
  visibleCssClass: string;
  minesweeper: Minesweeper;
  listener: PieceListener;

  constructor(x: number, y: number, cssClass: string, minesweeper: Minesweeper) {
    this.x = x;
    this.y = y;
    this.isClickable = true;
    this.cssClass = cssClass;
    this.visibleCssClass = 'field';
    this.minesweeper = minesweeper;
  }

  abstract leftClickImpl(): void;

  leftClick = () => {
    if (!this.minesweeper.gameOver && this.isClickable && this.visibleCssClass === 'field') {
      this.isClickable = false;
      this.leftClickImpl();
      this.listener.update(this);
    }
  }
  rightClick = () => {
    if (!this.minesweeper.gameOver && this.isClickable) {
      if (this.visibleCssClass === 'field') {
        this.visibleCssClass = 'field-flag';
      } else if (this.visibleCssClass === 'field-flag') {
        this.visibleCssClass = 'field';
      }
      this.listener.update(this);
    }
  }

  isCorrent = (): boolean => this.cssClass === this.visibleCssClass;

  setListener = (listener: PieceListener) => {
    this.listener = listener;
  }
}
