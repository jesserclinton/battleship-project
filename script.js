onload = function() {
  // buildTable();
}

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

var unhideAll = function() {
  var all = document.getElementsByClassName('hidable');
  // console.log(all);
  for (item of all) {
    // console.log(item);
    item.removeAttribute('hidden');
  }
}

function buildTable(size = 15) {
  if (size > 26) size = 26;
  if (size < 12) size = 12;
  var section = document.getElementById('gameboard');
  while (section.lastChild) section.removeChild(section.lastChild);
  var table = document.createElement('table')
  var tr = document.createElement('tr');
  var td = document.createElement('td');
  td.setAttribute('class','coords');
  tr.appendChild(td);
  for (var i = 1; i < size+1; i++) {
    td = document.createElement('td');
    td.setAttribute('class','coords');
    var num = document.createTextNode(i);
    td.appendChild(num);
    tr.appendChild(td);
  }
  table.appendChild(tr);
  for (var i = 0; i < size; i++) {
    tr = document.createElement('tr');
    td = document.createElement('td');
    td.setAttribute('class','coords');
    var letter = document.createTextNode(String.fromCharCode(i+65));
    td.appendChild(letter);
    tr.appendChild(td);
    for (var j = 0; j < size; j++) {
      var td = document.createElement('td');
      var wave = document.createTextNode('~');
      td.appendChild(wave);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  section.appendChild(table);
}

function buildScoreboard(
  players = [
    {
      name: "Bill Nye",
      points: 0
   },
   {
     name: "John Wayne",
     points: 3
   },
   {
    name: "Dirty Harry",
    points: 2
  },
  {
    name: "Fred",
    points: 0
  },
  {
    name: "2D",
    points: 2
  }
  ]
) {
  var section = document.getElementById('scoreboard');
  while (section.lastChild) section.removeChild(section.lastChild);
  var table = document.createElement('table');
  for (player of players) {
    // console.log(player);
    var tr = document.createElement('tr');
    var td = document.createElement('td');
    var name = document.createTextNode(player.name);
    td.appendChild(name);
    tr.appendChild(td);
    td = document.createElement('td');
    var score = document.createTextNode(player.points);
    td.appendChild(score);
    tr.appendChild(td);
    table.appendChild(tr);
  }
  section.appendChild(table);
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
  buildTable();
  console.log('table built');
  buildScoreboard();
  // document.getElementById('scoreboard').removeAttribute('hidden');
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
