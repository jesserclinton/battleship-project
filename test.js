//-----Room-----
function Player(id, name) {
  this.id = id;
  this.name = name;
  this.ships = [];

  this.genShips = function(gameboard = new Gameboard()) {
    var ships = [], ship, three = true;
    for (var n = 5; n > 1; n--) {
      miss = false;
      do {
        if (miss) console.log('miss',ship);
        ship = new Ship(
          this.id,
          m = Math.random() >= 0.5,
          n,
          Math.floor(Math.random()*(!m ? gameboard.size-n : gameboard.size)),
          Math.floor(Math.random()*(m ? gameboard.size-n : gameboard.size))
        );
      } while (miss = !gameboard.place(ship));
      console.log('place',ship);
      ships.push(ship);
      if (three && n == 3) {
        n++;
        three = false;
      }
    }
    gameboard.print();
    this.ships = ships;
  }
}

function Room(name, max) {
  this.name = name;
  this.players = [];
  this.max = max;
  this.board = genEmptyTable((2*(max-1)+8));

  this.addPlayer = function(id) {

  };
}

function RoomList() {
  this.rooms = [];

  this.addRoom = function(name, max) {

  }
}

//-----Gameboard-----
function Gameboard(size = 10) {
  var gameboard = this;
  this.size = size;
  this.coords = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) row.push('~');
    this.coords.push(row);
  }

  this.place = function(ship) {
    open = true;
    for (var i = 0; i < ship.n; i++) {
      open = gameboard.coords[ship.m ? ship.y+i : ship.y][ship.m ? ship.x : ship.x+i] == '~';
      if (!open) break;
    }
    if (open) {
      for (var i = 0; i < ship.n; i++) gameboard.coords[ship.m ? ship.y+i : ship.y][ship.m ? ship.x : ship.x+i] = ship.id;
      return true;
    }
    return false;
  }

  this.print = function() {
    for (row of this.coords) {
      console.log(row);
    }
  }

  this.appendTo = function(location = $('body')) {
    var table = $(document.createElement('table'));
    var tr = $(document.createElement('tr'));
    $(document.createElement('th')).appendTo(tr);
    for (var i = 1; i < this.size+1; i++) {
      var td = $(document.createElement('td')).text(i).appendTo(tr);
    }
    table.append(tr);
    for (var i = 0; i < this.size; i++) {
      tr = $(document.createElement('tr'));
      $(document.createElement('td')).addClass('coords').text(String.fromCharCode(i+65)).appendTo(tr);
      for (var j = 0; j < this.size; j++) {
        $(document.createElement('td')).attr('id',String.fromCharCode(i+65)+(j+1)).addClass('game_square').text('~').appendTo(tr);
      }
      table.append(tr);
    }
    location.append(table);
  }
}

function Ship(id, m, n, x, y) {
  this.id = id;
  this.m = m;
  this.n = n;
  this.x = x;
  this.y = y;
};

//-----Scoreboard-----
function Entry(id, name, score) {
  this.id = id;
  this.name = name;
  this.score = score;
}

function Scoreboard() {
  this.entries = [];

  this.addEntry = function(id, name) {
    for (entry of this.entries) if (entry.id == id) return false;
    this.entries.push(new Entry(id, name, 0));
    return true;
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

  this.appendTo = function(location = $('body')) {
    table = $(document.createElement('table')).addClass('scoreboard');
    for (entry of this.entries) {
      tr = $(document.createElement('tr'));
      $(document.createElement('td')).text(entry.name).appendTo(tr);
      $(document.createElement('td')).text(entry.score).appendTo(tr);
      tr.appendTo(table)
    }
    table.appendTo(location);
  }
}

//-----Kill-----


//-----Game Over-----
