
function startClock() {
  var clockSeg1 = document.getElementById('clock-seg-1');
  var clockSeg2 = document.getElementById('clock-seg-2');
  var clockSeg3 = document.getElementById('clock-seg-3');
  var timeSeconds = 0;
  var intervalId = setInterval(function () {
    timeSeconds = timeSeconds + 1;
    var seg1 = timeSeconds % 10;
    var seg2 = Math.trunc(timeSeconds / 10) % 10;
    var seg3 = Math.trunc(timeSeconds / 100) % 10;
    clockSeg1.classList = 'segment num-' + seg1;
    clockSeg2.classList = 'segment num-' + seg2;
    clockSeg3.classList = 'segment num-' + seg3;
  }, 1000);
}

// startClock();

function createField(parent) {
  var field = document.createElement('div');
  field.className = 'field';
  parent.appendChild(field);
}

function init(rows, cols) {
  var board = document.getElementById('board');
  board.style.gridTemplateRows = 'repeat(' + rows + ', auto)';
  board.style.gridTemplateColumns = 'repeat(' + cols + ', auto)';
  for (var i = 0; i < rows * cols; i++) {
    createField(board);
  }
}

init(5, 10);
