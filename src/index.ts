import Minesweeper from './Minesweeper';
import Board from './dom/Board';

const minesweeper = new Minesweeper(5, 10);
const board = new Board();
board.create(minesweeper.pieces);
