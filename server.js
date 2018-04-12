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
  var info = {
    key: 'abcd',
    players: players
  };
  res.send(JSON.stringify(info));
});

app.post('/start_game', function(req, res) {
  console.log('starting game');
});

app.post('/play_again', function(req, res) {
  console.log('new game');
});

app.post('/fire', function(req, res) {
  console.log('boom');
});

app.listen(8012);
