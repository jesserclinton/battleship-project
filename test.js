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
    create:
    miss = false;
    do {
      if (miss) console.log('miss',ship);
      ship = new Ship(
        id,
        m = Math.random() >= 0.5,
        n,
        Math.floor(Math.random()*(!m ? board.length-n : board.length)),
        Math.floor(Math.random()*(m ? board.length-n : board.length))
      );
    } while (miss = !ship.place(board));
    console.log('place',ship);
    ships.push(ship);
    if (three && n == 3) {
      n++;
      three = false;
    }
  }
  printBoard(board);
  return ships;
}

function printBoard(board) {
  for (row of board) {
    console.log(row);
  }
}

// ----------
function Room(name, max) {
  this.name = name;
  this.max = max;
}

function Entry(id, name, score) {
  this.id = id;
  this.name = name;
  this.score = score;
}

function Scoreboard() {
  this.entries = [];

  this.addEntry = function(id, name) {
    this.entries.push(new Entry(id, name, 0));
    return this;
  }

  this.changeScore = function(id, score) {
    for (entry of this.entries) {
      if (entry.id == id) {
        entry.score = score;
        return true;
      }
    }
    return false;
  }

  this.incrementScore = function(id) {
    for (entry of this.entries) {
      if (entry.id == id) {
        entry.score++;
        return true;
      }
    }
    return false;
  }

  this.addToScore = function(id, points) {
    for (entry of this.entries) {
      if (entry.id == id) {
        entry.score += points;
        return true;
      }
    }
    return false;
  }
}

function buildSb(
  sb = ((new Scoreboard()).addEntry('chaos8012','sdent')).addEntry('hatguy76','jdent'),
  loc = $('body')) {
  table = $(document.createElement('table')).addClass('scoreboard');
  for (entry of sb.entries) {
    tr = $(document.createElement('tr'));
    $(document.createElement('td')).text(entry.name).appendTo(tr);
    $(document.createElement('td')).text(entry.score).appendTo(tr);
    tr.appendTo(table)
  }
  table.appendTo(loc);
}
