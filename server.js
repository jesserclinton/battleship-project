const express = require('express');

var app = express();

app.get('/', function(req, res) {
  console.log("Someone's here!");
  res.sendFile(__dirname + '/warship.html');
});

app.get('/style.css', function(req, res) {
  res.sendFile(__dirname + '/style.css');
})

app.get('/script.js', function(req, res) {
  res.sendFile(__dirname + '/script.js');
})

app.listen(8012);
