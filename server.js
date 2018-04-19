const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//=====Variables=====
var lobby = new Lobby();
var players = [];

//=====Constructors=====
//-----Lobby-----
function Lobby() {
  this.rooms = [];

  this.addRoom = function(room) {
    for (r of this.rooms) if (r.name == room.name) return false;
    this.rooms.push(room);
    return true;
  }
}

//-----Room-----
function Room(name, max) {
  this.name = name;
  this.players = [];
  this.max = max;
  this.board = Gameboard((2*(max-1)+8));

  this.addPlayer = function(player) {
    this.players.push(player);
  };
}

//-----Player-----
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
        ship = new Ship(this.id, n, gameboard);
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

//-----Gameboard-----
function Gameboard(size = 10) {
  var gameboard = this;
  this.size = size;
  this.coords = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) row.push(0);
    this.coords.push(row);
  }

  this.place = function(ship) {
    open = true;
    for (var i = 0; i < ship.n; i++) {
      open = gameboard.coords[ship.m ? ship.y+i : ship.y][ship.m ? ship.x : ship.x+i] == 0;
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

//-----Attack-----
function Attack(size = 10) {

}

//-----Coordinate-----
function Coordinate(x, y) {
  var coord = this;

  if (y) {
    this.x = Number.isInteger(y) ? x : x-1;
    this.y = Number.isInteger(y) ? y : y.charCodeAt(0)-65;
  } else {
    this.x = parseInt(x.substring(1))-1;
    this.y = x.charCodeAt(0)-65;
  }

  this.toString = function() {
    return String.fromCharCode(y+65)+(x+1);
  }
}

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
}

//=====Functions=====
function genId() {
  var chars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
  (id = []).length = 12;
  for (var i = 0; i < id.length; i++) id[i] = chars.charAt(Math.floor(Math.random() * chars.length));
  return id.join('');
}

function calcResult() {
  return {
    size: 15,
    users: users,
    shots: {
      damages: ['A3','A4'],
      hits: ['E7','A12','G2'],
      misses: ['G1','G3']
    },
    dead: false,
    done: false
  };
}

//=====Send Files=====
app.get('/', function(req, res) {
  console.log("Someone's here!");
  res.sendFile(__dirname + '/warship.html');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});

app.get('/client.js', function(req, res) {
  res.sendFile(__dirname + '/client.js');
});

app.get('/test.js', function(req, res) {
  res.sendFile(__dirname + '/test.js');
});

//=====AJAX Requests=====
app.post('/begin', function(req, res) {
  console.log('Moved to the lobby');
  var data = {
    id: genId(),
    rooms: rooms
  };
  res.send(JSON.stringify(data));
});

app.post('/lobby', function(req, res) {
  // ping lobby to update rooms
});

app.post('/join', function(req, res) {
  // join a game room
});

app.post('/new', function(req, res) {
  // create new room
})

app.post('/wait', function(req, res) {
  // wait in room for other players
});

app.post('/start', function(req, res) {
  // start game with clean gameboard
});

app.post('/game', function(req, res) {
  // ping game for updates
});

app.post('/attack', function(req, res) {
  // launch an attack on a square
});

app.post('/again', function(req, res) {
  // remove room and start again
});

app.listen(8012, function() {
  console.log('Listening on port: 8012');
});
