function Ship(id, n, gameboard) {
  this.id = id;
  this.m = m = Math.random() >= 0.5;
  this.n = n;
  this.x = Math.floor(Math.random()*(!m ? gameboard.size-n : gameboard.size));
  this.y = Math.floor(Math.random()*(m ? gameboard.size-n : gameboard.size));
};

function Coordinate(x, y) {
  var coord = this;

  if (y) {
    this.x = Number.isInteger(y) ? x : x-1;
    this.y = Number.isInteger(y) ? y : y.charCodeAt(0)-65;
  } else {
    this.x = parseInt(x.substring(1))-1;
    this.y = x.charCodeAt(0)-65;
  }

  this.toString = function() {
    return String.fromCharCode(y+65)+(x+1);
  }
}
