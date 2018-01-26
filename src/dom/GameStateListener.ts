import Minesweeper from '../Minesweeper';
import MineCounter from './MineCounter';
import Clock from './Clock';

export default class GameStateListener {
  counter: MineCounter;
  clock: Clock;
  smile: HTMLElement;

  constructor(counter: MineCounter, clock: Clock) {
    this.counter = counter;
    this.clock = clock;
    this.smile = document.getElementById('smile');
  }

  setCounter = (value: number) => {
    this.counter.setValue(value);
  }

  update = (minesweeper: Minesweeper) => {
    if (this.clock.time <= 0) {
      this.clock.start();
    }
    if (minesweeper.gameOver) {
      this.clock.stop();
      this.smile.classList = minesweeper.allPiecesCorrect() ? 'smile-done' : 'smile-fail';
    }
    this.counter.setValue(minesweeper.minesLeft());
  }
}
