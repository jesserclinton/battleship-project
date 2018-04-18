function genEmptyTable(size = 10) {
  var table = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      row.push(0);
    }
    table.push(row);
  }
  // printBoard(table);
  return table;
}

 function Ship(id, m, n, x, y) {
  this.id = id;
  this.m = m;
  this.n = n;
  this.place = function(board) {
    open = true;
    for (var i = 0; i < n; i++) {
      open = board[m ? y+i : y][m ? x : x+i] == 0;
      if (!open) break;
    }
    if (open) {
      for (var i = 0; i < n; i++) board[m ? y+i : y][m ? x : x+i] = this.id;
      return true;
    }
    return false;
  },
  this.x = x;
  this.y = y;
};

function genShips(id = 'abc123', board = genEmptyTable()) {
  var ships = [], ship, three = true;
  for (var n = 5; n > 1; n--) {
    miss = false;
    do {
      ship = new Ship(
        id,
        m = Math.random() >= 0.5,
        n,
        Math.floor(Math.random()*(!m ? board.length-n : board.length)),
        Math.floor(Math.random()*(m ? board.length-n : board.length))
      );
      if (miss) console.log('miss',ship);
      if (three && n == 3) {
        n++;
        three = false;
      }
    } while (miss = !ship.place(board));
    console.log('place',ship);
    ships.push(ship);
  }
  printBoard(board);
  return ships;
}

function printBoard(board) {
  for (row of board) {
    console.log(row);
  }
}
