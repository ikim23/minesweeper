import Minesweeper from '../Minesweeper';
import MineCounter from './MineCounter';
import Clock from './Clock';

export default class GameStateListener {
  counter: MineCounter;
  clock: Clock;

  constructor(counter: MineCounter, clock: Clock) {
    this.counter = counter;
    this.clock = clock;
  }

  update = (minesweeper: Minesweeper) => {
    if (minesweeper.gameOver) {
      this.clock.stop();
    }
    this.counter.setValue(minesweeper.minesLeft());
  }
}
