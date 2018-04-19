const express = require('express');
const bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//=====Variables=====
var users = [];
var players = [];
var max = -1;
var size;

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
  var data = {
    id: genId()
  }
  res.send(JSON.stringify(data));
});

// app.post('/login', function(req, res) {
//   console.log('login',req.body);
//   var data = {
//     max: max,
//     users: users,
//     size: size
//   };
//   if (req.body.id) {
//     for (player of players) {
//       if (player.id == req.body.id) {
//         data.player = player;
//       }
//     }
//   } else {
//     console.log(req.body.name,'joined the game');
//
//     if (max == -1) {
//       max = req.body.max;
//       size = 2*(req.body.max-1)+8;  // Thank you Jack for coming up with this formula!
//       maxSet = true;
//     }
//     player = {
//       id: genId(),
//       name: req.body.name,
//       score: 0,
//       ships: []
//     }
//     if (players.length < max) {
//       users.push({name: req.body.name, score: 0});
//       players.push(player);
//     }
//     data.max = max;
//     data.users = users;
//     data.player = player;
//     data.size = size;
//   }
//   res.send(JSON.stringify(data));
// });
//
// app.post('/game', function(req, res) {
//   console.log('game',req.body);
//   if (req.body.coord) {
//     console.log('sploosh~');
//   }
//
//   res.send(JSON.stringify(calcResult()));
// });
//
// app.post('/restart', function(req, res) {
//   players = [];
//   console.log('new game');
// });


app.listen(8012, function() {
  console.log('Listening on port: 8012');
});
