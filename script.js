onload = function() {
  var row = document.getElementById('row_a');
  console.log(row);
}

onclick = function(e) {
  e.preventDefault();
}

var hideAll = function() {
  var all = document.getElementsByClassName('hidable');
  // console.log(all);
  for (item of all) {
    // console.log(item);
    item.setAttribute('hidden','');
  }
}

var goToWaiting = function() {
  hideAll();
  document.getElementById('waiting').removeAttribute('hidden');
}

var startGame = function() {
  hideAll();
  document.getElementById('game').removeAttribute('hidden');
  document.getElementById('scoreboard').removeAttribute('hidden');
}

var setScore = function(points) {

}

var playerDied = function() {
  document.getElementById('died').removeAttribute('hidden');
}

var endGame = function(win = true) {
  hideAll();
  document.getElementById('results').removeAttribute('hidden');
  if (win) {
    document.getElementById('win').removeAttribute('hidden');
  } else {
    document.getElementById('lose').removeAttribute('hidden');
  }
  document.getElementById('scoreboard').removeAttribute('hidden');
}

var playAgain = function() {
  hideAll();
  document.getElementById('username').value = '';
  document.getElementById('welcome').removeAttribute('hidden');
}
