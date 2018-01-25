function randInt(max) {
  return Math.floor(Math.random() * max);
}

var board = (function () {
  var fields = [];
  var timeSeconds = 0;

  var createField = function (parent) {
    var field = document.createElement('div');
    field.className = 'field';
    parent.appendChild(field);
    return field;
  };

  return {
    create: function(rows, cols, flds) {
      var board = document.getElementById('board');
      board.style.gridTemplateRows = 'repeat(' + rows + ', auto)';
      board.style.gridTemplateColumns = 'repeat(' + cols + ', auto)';
      flds.forEach(function (f) {
        var field = createField(board);
        if (f.type == 'mine') {
          field.className = 'field-mine';
        } else if (f.type > 0) {
          field.className = 'field-' + f.type;
        }
        fields.push(field);
      });
    },
  };
})();

var minesweeper = (function () {
  var fields = [];

  var createFields = function (rows, cols) {
    for (var r = 0; r < rows; r++) {
      for (var c = 0; c < cols; c++) {
        fields.push({
          x: r,
          y: c,
          type: null,
        });
      }  
    }
  };

  var setMines = function (numMines) {
    var mineFields = [];
    while (mineFields.length < numMines) {
      var index = randInt(fields.length);
      if (!mineFields.includes(index)) {
        mineFields.push(index);
        fields[index].type = 'mine';
      }
    }
    return mineFields;
  };

  var getNeighbours = function (index, rows, cols) {
    var row = Math.trunc(index / cols);
    var col = index % cols;
    var neighbours = [];
    for (var r = -1; r <= 1; r = r + 2) {
      for (var c = -1; c <= 1; c = c + 2) {
        if (row + r >= 0 && row + r < rows && col + c >= 0 && col + c < cols) {
          var neighbour = (row + r) * cols + col + c;
          neighbours.push(neighbour);
        }
      }  
    }
    return neighbours;
  };

  var setMineCounts = function (mineIndexes, rows, cols) {
    mineIndexes.forEach(function (i) {
      var neighbours = getNeighbours(i, rows, cols);
      neighbours.forEach(function (idx) {
        if (fields[idx].type == null) {
          fields[idx].type = 0;
        }
        if (!isNaN(fields[idx].type)) {
          fields[idx].type++;
        }
      });
    });
  };

  return {
    create: function (rows, cols, mines) {
      if (isNaN(mines)) {
        mines = Math.ceil(rows * cols * 0.25);
      }
      createFields(rows, cols);
      var mineIndexes = setMines(mines);
      setMineCounts(mineIndexes, rows, cols);
      return fields;
    },
  };
})();



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

var fields = minesweeper.create(5, 10);
board.create(5, 10, fields);
console.log(fields);
