const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var players = [];

app.get('/', function(req, res) {
  console.log("Someone's here!");
  res.sendFile(__dirname + '/warship.html');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
});

app.get('/script.js', function(req, res) {
  res.sendFile(__dirname + '/script.js');
});

app.post('/login', function(req, res) {
  console.log(req.body);
  console.log('joined the game');
  players.push({name: 'Fred', points: 0});
  var info = {
    key: 'abcd',
    players: players
  };
  res.send(JSON.stringify(info));
});

app.post('/game', function(req, res) {
  var result = {
    players: players,
    layout: {
      friend: [{front: 'A1', back: 'A5'},{front: 'B4', back: 'B7'}],
      damage: ['A3','A4'],
      hit: ['E7','A12','G2'],
      miss: ['G1','G3']
    }
  };
  
  res.send(JSON.stringify(result));
});

app.post('/attack', function(req, res) {
  console.log('boom');
  var result = {
    players: players,
    layout: {
      friend: [{front: 'A1', back: 'A5'},{front: 'B4', back: 'B7'}],
      damage: ['A3','A4'],
      hit: ['E7','A12','G2'],
      miss: ['G1','G3']
    }
  };

  console.log('layout:',layout);
  res.send(JSON.stringify(result));
});

app.post('/start_game', function(req, res) {
  console.log('starting game');
});

app.post('/play_again', function(req, res) {
  console.log('new game');
});


app.listen(8012, function() {
  console.log('Listening on port: 8012');
});
