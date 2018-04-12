const express = require('express');

var app = express();

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

app.post('/join_game.php', function(req, res) {
  console.log('joined the game');
  // res.send(JSON.stringify({name: "test", value: 0}));
  // res.sendStatus(200);
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
