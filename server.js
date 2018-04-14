const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//-----Variables-----
// var board = [][];
var players = [];

//-----Functions-----
function calcResult() {
  return {
    players: players,
    layout: {
      friend: [{front: 'A1', back: 'A5'},{front: 'B4', back: 'B7'}],
      damage: ['A3','A4'],
      hit: ['E7','A12','G2'],
      miss: ['G1','G3']
    },
    dead: false,
    done: false
  };
}

//-----Send Files-----
app.get('/', function(req, res) {
  console.log("Someone's here!");
  res.sendFile(__dirname + '/warship.html');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});

// app.get('/script.js', function(req, res) {
//   res.sendFile(__dirname + '/script.js');
// });

app.get('/main.js', function(req, res) {
  res.sendFile(__dirname + '/main.js');
});

//-----AJAX Requests-----
app.post('/login', function(req, res) {
  // console.log(req.body);
  console.log(req.body.name,'joined the game');
  players.push(req.body);
  var info = {
    key: 'abcd',
    players: players
  };
  res.send(JSON.stringify(info));
});

app.post('/start', function(req, res) {
  console.log('starting game');
  var game = {
    size: 15,
    players: players
  };
  res.send(JSON.stringify(game));
});

app.post('/game', function(req, res) {
  // console.log('syn-ack');
  var result = calcResult();

  res.send(JSON.stringify(result));
});

app.post('/attack', function(req, res) {
  console.log('sploosh~');
  var result = calcResult();

  // console.log('result:',result);
  res.send(JSON.stringify(result));
});

app.post('/restart', function(req, res) {
  players = [];
  console.log('new game');
});


app.listen(8012, function() {
  console.log('Listening on port: 8012');
});
