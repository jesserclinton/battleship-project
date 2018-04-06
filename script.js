onload = function() {
  var rows = document.getElementsByClassName('table_row');
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

var goToWaiting = function() {

  xmlhttp = new XMLHttpRequest();
  xmlhttp.onreadystatechange = HandleData;
  // xmlhttp.onreadystatechange = function () {
  //   alert("READY STATE!");
  // };
  xmlhttp.open("GET", "get_players.php", true);
  xmlhttp.send();

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
    alert(xmlhttp.responseText);
    var mailboxes = eval ('(' + xmlhttp.responseText + ')');
    var table = document.getElementById("mailboxes");

    var cnt = 0;
    for(var key in mailboxes) {
      document.getElementById("box_table").rows[cnt].cells[0].innerHTML=key;
      document.getElementById("box_table").rows[cnt].cells[1].innerHTML=mailboxes[key];
      cnt = cnt + 1;
    };
  } else {
    alert("xmlhttp.readyState = " + xmlhttp.readyState + ", xmphttp.status = " + xmlhttp.status);
  }
};

var startGame = function() {
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
