import Minesweeper from './minesweeper';
import Board from './board';

const minesweeper = new Minesweeper(5, 10);
const board = new Board();

board.create(minesweeper.fields);
