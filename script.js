onload = function() {
  buildTable();
}

// onclick = function(e) {
//   e.preventDefault();
// }

onsubmit = function(e) {
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

var buildTable = function() {
  table = document.getElementById('game_board');
  var tr = document.createElement('tr');
  table.appendChild(tr);
  var td = document.createElement('td');
  td.setAttribute('class','coords');
  tr.appendChild(td);
  for (var i = 1; i < 16; i++) {
    td = document.createElement('td');
    td.setAttribute('class','coords');
    var num = document.createTextNode(i);
    td.appendChild(num);
    tr.appendChild(td);
  }
  for (var i = 0; i < 15; i++) {
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.setAttribute('class','coords');
    var letter = document.createTextNode(String.fromCharCode(i+65));
    td.appendChild(letter);
    tr.appendChild(td);
    for (var j = 0; j < 15; j++) {
      var td = document.createElement('td');
      var wave = document.createTextNode('~');
      td.appendChild(wave);
      tr.appendChild(td);
    }
    table.appendChild(tr);
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

function HandleData()  {
  if(xmlhttp.readyState == 4 && xmlhttp.status == 200)
  {
    console.log(xmlhttp.responseText);
  };
};

var startGame = function() {
  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = HandleData;
  xmlhttp.open("GET", "get_players.php", true);
  xmlhttp.send();
  hideAll();
  document.getElementById('game').removeAttribute('hidden');
  document.getElementById('scoreboard').removeAttribute('hidden');
}

var setScore = function(points) {

}

var playerDied = function() {
  document.getElementById('died').removeAttribute('hidden');
  document.getElementById('fire_button').setAttribute('disabled','');
}

var endGame = function(win = true) {
  hideAll();
  document.getElementById('results').removeAttribute('hidden');
  if (win) {
    document.getElementById('win').removeAttribute('hidden');
  } else {
    document.getElementById('lose').removeAttribute('hidden');
  }
  document.getElementById('scoreboard2').removeAttribute('hidden');
}

var playAgain = function() {
  hideAll();
  document.getElementById('username').value = '';
  document.getElementById('welcome').removeAttribute('hidden');
}
