//-----Variables-----
var players = [];

//-----Settings-----
onsubmit = function(e) {
  e.preventDefault();
}

//-----Login-----
function buildLogins() {
  // console.log(players);
  var section = $('#players');
  section.empty();
  var ol = document.createElement('ol');
  for (player of players) {
    var li = document.createElement('li');
    li.innerHTML = player.name;
    ol.appendChild(li);
  }
  section.append(ol);
}

function login() {
  console.log(req.readyState+':'+req.status);
  if (req.readyState == 4 && req.status == 200) {
    var res = JSON.parse(req.responseText);
    console.log(res);
    players = res.players;
    buildLogins();
    $('#welcome').hide();
    $('#waiting').show();
  }
}

//-----Start-----
function buildGameboard(size) {
  if (size > 26) console.log('WARNING! SIZES LARGER THAN 26 COULD LEAD TO POOR PERFORMANCE');;
  if (size < 12) size = 12;

  var section = $('#gameboard');
  section.empty();
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
      td.setAttribute('id',(String.fromCharCode(i+65)+(j+1)));
      td.setAttribute('class','game_square');
      var water = document.createTextNode('~');
      td.appendChild(water);
      tr.appendChild(td);
    }
    table.appendChild(tr);
  }
  section.append(table);
}

function buildScoreboard() {

}

function buildAttack() {

}

function start() {
  // var res = JSON.parse(req.responseText);
  buildGameboard(15);
  $('#waiting').hide();
  $('#game').show();
}

//-----jQuery-----
$(function() {
  $('#login').submit(function() {
    var user = {
      name: $('#username').val(),
      points: 0
    };
    if (!user.name) {
      $('#required').show();
    } else {
      console.log(user);
      $.post('/login', user, function(data, status) {
        var res = JSON.parse(data);
        console.log(res);
        players = res.players;
        buildLogins();
        $('#welcome').hide();
        $('#waiting').show();
      });
    }
  });

  $('#start').submit(function() {
    req = new XMLHttpRequest();
    req.onreadystatechange = start;
    req.open('post', '/start', true);
    req.send();
  });
});
