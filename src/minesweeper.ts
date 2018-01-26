import * as _ from 'lodash';
import Piece from './pieces/Piece';
import MinePiece from './pieces/MinePiece';
import EmptyPiece from './pieces/EmptyPiece';
import NumberPiece from './pieces/NumberPiece';
import GameStateListener from './dom/GameStateListener';

interface Position {
  x: number;
  y: number;
}

export default class Minesweeper {
  rows: number;
  cols: number;
  mineCount: number;
  pieces: Piece[][];
  gameOver: boolean;
  listener: GameStateListener;

  constructor(listener: GameStateListener) {
    this.listener = listener;
  }

  showAllEmpty = (p: Position) => {
    const piece = this.pieces[p.x][p.y];
    if (piece instanceof NumberPiece) {
      piece.leftClick();
    } else  if (piece instanceof EmptyPiece) {
      piece.leftClick();
      const neighbours = this.getNeighbours(p);
      const clickable = _.filter(neighbours, ({x, y}) => this.pieces[x][y].isClickable);
      _.each(clickable, this.showAllEmpty);
    }
  }

  updateListener = () => {
    if (!this.gameOver) {
      this.gameOver = this.allPiecesCorrect();
    }
    this.listener.update(this);
  }

  minesLeft = (): number => {
    const flagCount = _.sumBy(_.flatten(this.pieces), piece => piece.visibleCssClass === 'field-flag' ? 1 : 0);
    return this.mineCount - flagCount;
  }

  allPiecesCorrect = (): boolean => {
    return _.every(_.flatten(this.pieces), piece => piece.isCorrent());
  }

  create = (rows: number, cols: number): Piece[][] => {
    this.rows = rows;
    this.cols = cols;
    this.mineCount = _.ceil(rows * cols * 0.12);
    this.gameOver = false;
    this.pieces = _.times(rows, row => _.times(cols, col => new EmptyPiece(row, col, this)));
    this.setMines();
    this.listener.setCounter(this.mineCount);
    return this.pieces;
  }

  private setMines = () => {
    const minePositions = [];
    while (minePositions.length < this.mineCount) {
      const pos = {
        x: _.random(0, this.rows - 1),
        y: _.random(0, this.cols - 1),
      };
      if (!_.some(minePositions, pos)) {
        minePositions.push(pos);
        this.pieces[pos.x][pos.y] = new MinePiece(pos.x, pos.y, this);
      }
    }
    _.each(minePositions, this.setMineCounts);
  }

  private setMineCounts = (mine: Position) => {
    const neighbours = this.getNeighbours(mine);
    _.each(neighbours, ({ x, y }) => {
      const piece = this.pieces[x][y];
      if (piece instanceof EmptyPiece) {
        this.pieces[x][y] = new NumberPiece(x, y, this);
      } else if (piece instanceof NumberPiece) {
        piece.increment();
      }
    });
  }

  private getNeighbours = (p: Position): Position[] => {
    const delta = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];
    const neighbours = _.map(delta, ([dX, dY]) => ({ x: p.x + dX, y: p.y + dY }));
    return _.filter(neighbours, ({ x, y }) => x >= 0 && x < this.rows && y >= 0 && y < this.cols);
  }
}
