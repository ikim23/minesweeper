import * as _ from 'lodash';
import Minesweeper from './Minesweeper';
import Board from './dom/Board';
import MineCounter from './dom/MineCounter';
import Clock from './dom/Clock';
import GameStateListener from './dom/GameStateListener';

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

const board = new Board();
const counter = new MineCounter();
const clock = new Clock();
const listener = new GameStateListener(counter, clock);
const minesweeper = new Minesweeper(5, 10, listener);

board.create(minesweeper.pieces);
clock.start();
