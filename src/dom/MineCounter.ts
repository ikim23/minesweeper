export default class MineCounter {
  segment1: HTMLElement;
  segment2: HTMLElement;
  segment3: HTMLElement;
  value: number;

  constructor() {
    this.segment1 = document.getElementById('count-seg-1');
    this.segment2 = document.getElementById('count-seg-2');
    this.segment3 = document.getElementById('count-seg-3');
    this.value = 0;
  }

  setValue = (value: number) => {
    if (value !== this.value) {
      this.value = value;
      const seg1 = Math.abs(value % 10);
      const seg2 = Math.abs(Math.trunc(value / 10) % 10);
      const seg3 = Math.abs(Math.trunc(value / 100) % 10);
      if (value >= 0) {
        this.segment1.classList = `segment num-${seg1}`;
        this.segment2.classList = `segment num-${seg2}`;
        this.segment3.classList = `segment num-${seg3}`;
      } else {
        this.segment1.classList = `segment num-${seg1}`;
        if (seg2 > 0) {
          this.segment2.classList = `segment num-${seg2}`;
          this.segment3.classList = 'segment minus';
        } else {
          this.segment2.classList = 'segment minus';
          this.segment3.classList = 'segment off';
        }
      }
    }
  }
}
