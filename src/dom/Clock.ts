export default class Clock {
  segment1: HTMLElement;
  segment2: HTMLElement;
  segment3: HTMLElement;
  time: number;
  intervalId: any;

  constructor() {
    this.segment1 = document.getElementById('clock-seg-1');
    this.segment2 = document.getElementById('clock-seg-2');
    this.segment3 = document.getElementById('clock-seg-3');
    this.time = 0;
  }

  start = () => {
    this.intervalId = setInterval(this.tick, 1000);
  }

  stop = () => {
    clearInterval(this.intervalId);
  }

  reset = () => {
    this.stop();
    this.time = 0;
  }

  private tick = () => {
    this.time += 1;
    const seg1 = this.time % 10;
    const seg2 = Math.trunc(this.time / 10) % 10;
    const seg3 = Math.trunc(this.time / 100) % 10;
    this.segment1.classList = `segment num-${seg1}`;
    this.segment2.classList = `segment num-${seg2}`;
    this.segment3.classList = `segment num-${seg3}`;
  }
}
