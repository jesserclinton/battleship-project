onload = function() {
  var rows = document.getElementsByClassName('tableRow');
  for (row of rows) {
    for (var i = 0; i < 15; i++) {
      var td = document.createElement('td');
      var wave = document.createTextNode('~');
      td.appendChild(wave);
      row.appendChild(td);
      // console.log('append');
    }
  }
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
  var username = document.getElementById('username').value;
  if (username == '') {
    alert('Username Required!');
  } else {
    hideAll();
    document.getElementById('waiting').removeAttribute('hidden');
  }
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
  document.getElementById('fire_button').setAttribute('disabled');
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


