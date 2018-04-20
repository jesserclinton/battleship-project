const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//=====Variables=====
var lobby = new Lobby();
    lobby.addRoom(new Room('Helen',4));
    lobby.addRoom(new Room('Hughmungus',10));

//=====Constructors=====
//-----Lobby-----
function Lobby() {
  this.rooms = [];

  this.addRoom = function(room) {
    for (r of this.rooms) if (r.name == room.name) return false;
    this.rooms.push(room);
    return true;
  }

  this.getRoom = function(name) {
    for (room of this.rooms) if (room.name == name) return room;
    return null;
  }

  this.getRoomNames = function() {
    var roomNames = [];
    for (room of rooms) roomNames.push(room.name);
    return roomNames;
  }

  this.removeRoom = function(name) {
    var index = this.rooms.indexOf(name);
    if(index == -1) return false;
    this.rooms.splice(index, 1);
    return true;
  }

  this.findPlayer = function(id) {
    for (room of this.rooms) for (player of room.players) if(player.id == id) return room;
    return null;
  }
}

//-----Room-----
function Room(name, max) {
  this.name = name;
  this.players = [];
  this.max = max;
  this.board = new Gameboard((2*(max-1)+8));

  this.addPlayer = function(player) {
    this.players.push(player);
  };

  this.getPlayer = function(id) {
    for (player of this.players) if (player.id == id) return player;
    return null;
  }

  this.getScoreboardInfo = function() {
    var names = [];
    for (player of this.players) names.push({id: player.id, name: player.name, score: player.shots.hits.length});
    return names;
  }

  this.attack = function(id, coord) {
    var val = this.board.coords[coord.y][coord.x];
    // console.log(val);
    if (val != id) {
      if (val == 0) {
        this.getPlayer(id).shots.misses.push(coord.toString());
        return;
      } else {
        var enemy = this.getPlayer(val);
        enemy.shots.damages.push(coord.toString());
        this.getPlayer(id).shots.hits.push(coord.toString());
        this.board.coords[coord.y][coord.x] = 0;
        return;
      }
    }
    return;
  }
}

//-----Player-----
function Player(id, name) {
  this.id = id;
  this.name = name;
  this.ships = [];
  this.shots = {
    damages: [],
    hits: [],
    misses: []
  };

  this.genShips = function(gameboard = new Gameboard()) {
    var ships = [], ship, three = true;
    for (var n = 5; n > 1; n--) {
      miss = false;
      do {
        // if (miss) console.log('miss',ship);
        ship = new Ship(this.id, n, gameboard);
      } while (miss = !gameboard.place(ship));
      // console.log('place',ship);
      ships.push(ship);
      if (three && n == 3) {
        n++;
        three = false;
      }
    }
    // gameboard.print();
    this.ships = ships;
  }
}

//-----Gameboard-----
function Gameboard(size = 10) {
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
      open = this.coords[ship.m ? ship.y+i : ship.y][ship.m ? ship.x : ship.x+i] == 0;
      if (!open) break;
    }
    if (open) {
      for (var i = 0; i < ship.n; i++) this.coords[ship.m ? ship.y+i : ship.y][ship.m ? ship.x : ship.x+i] = ship.id;
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

//-----Ship-----
function Ship(id, n, gameboard) {
  this.id = id;
  this.m = m = Math.random() >= 0.5;
  this.n = n;
  this.x = Math.floor(Math.random()*(!m ? gameboard.size-n : gameboard.size));
  this.y = Math.floor(Math.random()*(m ? gameboard.size-n : gameboard.size));
};

//-----Coordinate-----
function Coordinate(x, y) {
  if (y != undefined && y != null) {
    this.x = Number.isInteger(y) ? x : x-1;
    this.y = Number.isInteger(y) ? y : y.charCodeAt(0)-65;
  } else {
    this.x = parseInt(x.substring(1))-1;
    this.y = x.charCodeAt(0)-65;
  }

  this.toString = function() {
    return String.fromCharCode(this.y+65)+(this.x+1);
  }
}

//=====Functions=====
function genId() {
  var chars = 'QWERTYUIOPASDFGHJKLZXCVBNMqwertyuiopasdfghjklzxcvbnm1234567890';
  (id = []).length = 12;
  for (var i = 0; i < id.length; i++) id[i] = chars.charAt(Math.floor(Math.random() * chars.length));
  return id.join('');
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
/**
 * Move player to lobby
 */
app.post('/begin', function(req, res) {
  // console.log('Moved to the lobby');
  var data = {
    id: genId(),
    lobby: lobby
  };
  res.send(JSON.stringify(data));
});

/**
 * send player lobby updates
 */
app.post('/lobby', function(req, res) {

});

/**
 * add a player to a game room
 */
app.post('/join', function(req, res) {
  // console.log(req.body);
  console.log(req.body.player.name,'joined',req.body.room);
  var room = lobby.getRoom(req.body.room);
  var player = new Player(req.body.player.id,req.body.player.name);
  room.addPlayer(player);
  player.genShips(room.board);
  // console.log('room',room);
  // console.log(player.ships);

  var data = {
    size: room.board.size,
    coords: player.ships,
    players: room.getScoreboardInfo()
  };

  res.send(JSON.stringify(data));
});

/**
 * create new room and add to lobby
 */
app.post('/new', function(req, res) {
  if (!req.body.id) {
    var data = {
      rooms: lobby.getRoomNames()
    };
    res.send(JSON.stringify(data));
  }
  var data = req.body;
  var room = new Room(data.name,data.max);
  lobby.addRoom(room);

  res.send(JSON.stringify(data));
});

/**
 * send player waiting room updates
 */
app.post('/wait', function(req, res) {
  var data = {
    room: room,
    player: player
  };
  res.send(JSON.stringify(room));
});

/**
 * start the game with a clean gameboard
 */
app.post('/start', function(req, res) {

});

/**
 * send player game updates
 */
var deadPeople = [];

app.post('/game', function(req, res) {
  console.log(req.body);

  room = lobby.findPlayer(req.body.id);

  var data = {
    coords: room.getPlayer(req.body.id).shots,
    scoreboard: room.getScoreboardInfo()
  };

  if (data.coords.damages.length == 17) {
    data.dead = true;
    var flag = true;
    for (person of deadPeople) {
      if (person == req.body.id) {
        flag = false
      }
    }
    if (flag) {
      deadPeople.push(req.body.id);
    }
  }
  if (room.players.length > 1 && deadPeople.length >= room.players.length-1) data.done = true;

  res.send(JSON.stringify(data));
});

/**
 * launch an attack on a square
 */
app.post('/attack', function(req, res) {
  room = lobby.findPlayer(req.body.id);
  coord = new Coordinate(req.body.coord);

  console.log((room.getPlayer(req.body.id)).name,'is attacking',coord.toString());

  room.attack(req.body.id, coord);

  var data = {
    coords: room.getPlayer(req.body.id).shots,
    scoreboard: room.getScoreboardInfo()
  };
  res.send(JSON.stringify(data));
});

/**
 * remove room and send player to lobby
 */
app.post('/again', function(req, res) {
  var data = {
    room: 'dummy'
  };

  res.send(JSON.stringify(data));
});

app.listen(8012, function() {
  console.log('Listening on port: 8012');
});
