var board = [];

function genEmptyTable(size = 12) {
  var table = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) {
      row.push(0);
    }
    table.push(row);
  }
  for (row of table) {
    console.log(row);
  }
  return table;
}

function genShips(size = 12) {
  board = genEmptyTable();
  ship = {
    m: false,
    n: 0,
    y: 0,
    x: 0
  }
  flag = true;
  for (var n = 5; n > 1; n--) {
    ship.m = Math.random() >= 0.5;
    ship.n = n;
    ship.y = Math.floor(Math.random()*(ship.m ? size-n : size));
    ship.x = Math.floor(Math.random()*(!ship.m ? size-n : size)+1);
    if (n == 3 && flag) {
      n++;
      flag = false;
    }
    console.log(ship);
  }
}
