const express = require('express');

var app = express();

app.get('/', function(req, res) {
  console.log("Someone's here!");
  res.sendFile(__dirname + '/index.html');
});

app.get('/styles', function(req, res) {
  res.sendFile(__dirname + '/styles.css');
})

app.listen(8012);
