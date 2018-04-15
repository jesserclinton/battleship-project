const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//=====Variables=====
var players = [];

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
    players: players,
    layout: {
      friends: [{x: 1, y: 'A', m: 0, n: 3},{x: 4, y: 'B', m: 1, n: 4}],
      damages: ['A3','A4'],
      hits: ['E7','A12','G2'],
      misses: ['G1','G3']
    },
    dead: true,
    done: false
  };
}

function placeShips(size = 15) {
  var letter = String.fromCharCode(Math.floor(Math.random()*size+1)+65);
  var number = Math.floor(Math.random()*size+1);
  var down = Math.random() >= 0.5;
  console.log(letter+number,down ? 'down' : 'side');
}

//=====Send Files=====
app.get('/', function(req, res) {
  console.log("Someone's here!");
  placeShips();
  res.sendFile(__dirname + '/warship.html');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});

app.get('/main.js', function(req, res) {
  res.sendFile(__dirname + '/main.js');
});

//=====AJAX Requests=====
app.post('/login', function(req, res) {
  // console.log('login',req.body);
  if (req.body.name) {
    console.log(req.body.name,'joined the game');
    players.push(req.body);
  }
  var info = {
    id: 'abcd',
    players: players
  };
  res.send(JSON.stringify(info));
});

app.post('/game', function(req, res) {
  // console.log('game',req.body);
  if (res.body.hasOwnProperty('coord')) {
    console.log('sploosh~');
  }

  res.send(JSON.stringify(calcResult()));
});

app.post('/restart', function(req, res) {
  players = [];
  console.log('new game');
});


app.listen(8012, function() {
  console.log('Listening on port: 8012');
});
