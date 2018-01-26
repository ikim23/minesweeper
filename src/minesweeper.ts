import * as _ from 'lodash';
import Piece from './pieces/Piece';
import MinePiece from './pieces/MinePiece';
import EmptyPiece from './pieces/EmptyPiece';
import NumberPiece from './pieces/NumberPiece';

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

  constructor(rows: number, cols: number) {
    this.rows = rows;
    this.cols = cols;
    this.mineCount = _.ceil(rows * cols * 0.12);
    this.gameOver = false;
    this.create();
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

  private create = () => {
    this.pieces = _.times(this.rows, row => _.times(this.cols, col => new EmptyPiece(row, col, this)));
    this.setMines();
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
