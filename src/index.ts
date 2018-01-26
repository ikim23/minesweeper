import * as _ from 'lodash';
import Minesweeper from './Minesweeper';
import Board from './dom/Board';

const segments = document.getElementsByClassName('segment');
const setSegmentSize = () => {
  const scale = 26 / 46;
  const width = window.innerWidth * 0.05;
  _.each(segments, (segment) => {
    segment.style.width = `${width}px`;
    segment.style.height = `${width / scale}px`;
  });
};

setSegmentSize();
window.addEventListener('resize', setSegmentSize);

const minesweeper = new Minesweeper(5, 10);
const board = new Board();
board.create(minesweeper.pieces);
