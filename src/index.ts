import { resize } from './dom/HeaderResize';
import Minesweeper from './Minesweeper';
import Board from './dom/Board';
import MineCounter from './dom/MineCounter';
import Clock from './dom/Clock';
import GameStateListener from './dom/GameStateListener';

resize();

const board = new Board();
const counter = new MineCounter();
const clock = new Clock();
const listener = new GameStateListener(counter, clock);
const minesweeper = new Minesweeper(listener);
board.create(minesweeper.create(5, 10));

const smile = document.getElementById('smile');
smile.addEventListener('click', () => {
  smile.classList = 'smile';
  clock.stop();
  clock.draw();
  board.create(minesweeper.create(5, 10));
});
