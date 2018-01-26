import * as _ from 'lodash';

const smile = document.getElementById('smile');
const segments = document.getElementsByClassName('segment');

const setSegmentSize = () => {
  const scale = 26 / 46;
  const width = _.min([window.innerWidth, 800]) * 0.05;
  const height = width / scale;
  smile.style.width = `${height}px`;
  smile.style.height = `${height}px`;
  _.each(segments, (segment) => {
    segment.style.width = `${width}px`;
    segment.style.height = `${height}px`;
  });
};

const resize = () => {
  setSegmentSize();
  window.addEventListener('resize', setSegmentSize);
};

export {
  resize,
};
