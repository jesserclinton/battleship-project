app.post('/login', function(req, res) {
  console.log('login',req.body);
  var data = {
    max: max,
    users: users,
    size: size
  };
  if (req.body.id) {
    for (player of players) {
      if (player.id == req.body.id) {
        data.player = player;
      }
    }
  } else {
    console.log(req.body.name,'joined the game');

    if (max == -1) {
      max = req.body.max;
      size = 2*(req.body.max-1)+8;  // Thank you Jack for coming up with this formula!
      maxSet = true;
    }
    player = {
      id: genId(),
      name: req.body.name,
      score: 0,
      ships: []
    }
    if (players.length < max) {
      users.push({name: req.body.name, score: 0});
      players.push(player);
    }
    data.max = max;
    data.users = users;
    data.player = player;
    data.size = size;
  }
  res.send(JSON.stringify(data));
});

app.post('/game', function(req, res) {
  console.log('game',req.body);
  if (req.body.coord) {
    console.log('sploosh~');
  }

  res.send(JSON.stringify(calcResult()));
});

app.post('/restart', function(req, res) {
  players = [];
  console.log('new game');
});
