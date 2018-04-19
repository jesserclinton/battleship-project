//=====Settings=====
onsubmit = function(e) {
  e.preventDefault();
}

onload = function() {
  setInterval(animateBg,80);
}

var l = 0;
var s = 1;
function animateBg() {
  bg = $('body').css('backgroundPosition',(-l)+'px '+l+'px');
  l += s;
  if (Math.abs(l) > 1000) {
    s = -s;
  }
}

//=====Variables=====
var id;

//=====Functions=====
function displayAll() {
  $('.hidable').show();
}

//-----Rooms-----
/*function listRooms(data = {rooms: ['a','b','c']}) {
  var rooms = $('#room');
  var form = $(document.createElement('form'));
  form.addClass('portal').attr('id', 'room');
  for (room of data.rooms) {
    $(document.createElement('input')).attr('id','room_'+room).attr('name','room').val(room).attr('type', 'radio').appendTo(form);
    $(document.createElement('label')).attr('for','room_'+room).text(room).appendTo(form);
    $(document.createElement('br')).appendTo(form);
  }
  here = form.children(':first-child').attr('checked', '');
  console.log(here);
  rooms.append(form);
}

//-----Login-----
function listUsers(res) {
  console.log('build',res);

  (section = $('#players')).empty();

  var ol = $(document.createElement('ol'));
  for (player of res.users) {
    li = $(document.createElement('li'));
    li.text(player.name);
    li.appendTo(ol);
  }
  section.append(ol);
}

function buildGameboard(data) {
  var section = $('#gameboard');
  section.empty();
  var table = $(document.createElement('table'));
  var tr = $(document.createElement('tr')).appendTo(table);
  $(document.createElement('td')).attr('class','coords').appendTo(tr);
  for (var i = 1; i < data.size+1; i++) {
    var td = $(document.createElement('td')).addClass('coords').text(i).appendTo(tr);
  }
  table.append(tr);
  for (var i = 0; i < data.size; i++) {
    tr = $(document.createElement('tr'));
    $(document.createElement('td')).addClass('coords').text(String.fromCharCode(i+65)).appendTo(tr);
    for (var j = 0; j < data.size; j++) {
      $(document.createElement('td')).attr('id',String.fromCharCode(i+65)+(j+1)).addClass('game_square').text('~').appendTo(tr);
    }
    table.append(tr);
  }
  section.append(table);
  // for (ship of data.ships) {
  //   $('#'+ship.x+ship.y).text('☺︎');
  // }
}

function buildAttack(size) {
  if (size < 10) size = 10;
  var section = $('#attack');
  section.empty();

  var form = $(document.createElement('form')).attr('id','attack');
  var select = $(document.createElement('select')).attr('id','letter_select');
  for (var i = 0; i < size; i++) {
    var letter = String.fromCharCode(i+65);
    var option = $(document.createElement('option')).val(i).text(letter).appendTo(select);
  }
  form.append(select);

  select = $(document.createElement('select')).attr('id','number_select');
  for (var i = 1; i < size+1; i++) {
    var option = $(document.createElement('option')).val(i).text(i).appendTo(select);
  }
  form.append(select);

  $(document.createElement('input')).attr({'id': 'fire_button', 'value': 'Fire!', 'type': 'submit'}).appendTo(form);
  section.append(form);
}

function buildScoreboard(players) {
  var scoreboards = $('.scoreboard');
  scoreboards.empty();
  var table = $(document.createElement('table'));
  for (player of players) {
    // console.log(player);
    var tr = $(document.createElement('tr'));
    $(document.createElement('td')).text(player.name).appendTo(tr);
    $(document.createElement('td')).text(player.score).appendTo(tr);
    table.append(tr);
  }
  scoreboards.append(table);
}

//-----Game-----
function updateGameboard(layout) {
  if (layout.damages) {
    for (damage of layout.damages) {
      $('#'+damage).text('☻').addClass('alert');
    }
  }
  if (layout.hits) {
    for (hit of layout.hits) {
      $('#'+hit).text('■').addClass('alert');
    }
  }
  if (layout.misses) {
    for (miss of layout.misses) {
      $('#'+miss).text('□').addClass('alert');
    }
  }
}

function death(res) {
  if (res.dead) {
    $('#died').show();
    $('#fire_button').attr('disabled','');
  } else {
    $('#died').hide();
    $('#fire_button').removeAttr('disabled');
  }
}

function remaining(res) {
  var diff = res.max - res.users.length;
  $('#remaining').text((diff > 0) ? 'Waiting for ' + ((diff > 1) ? diff + ' more players!' : '1 more player!') : 'Starting soon!')
}*/

//=====jQuery=====
$(function() {
  //-----Begin-----
  $('#begin').submit(function() {
    $.post('/begin', function(data, status) {
      res = JSON.parse(data);
      console.log('begin',res);
      // listRooms();
      $('#welcome').hide();
      $('#rooms').show();
    });
  });

  //-----Login-----
  $('#login').submit(function() {
    var data = {
      name: $('#username').val(),
      max: $('#num_players').val()
    };
    if (!data.name) {
      $('#required_username').show();
    } else if (!data.max || data.max < 2) {
      $('#required_number').show();
    } else {
      $.post('/login', data, function(data, status) {
        res = JSON.parse(data);
        console.log('login',res);
        id = res.player.id;
        listUsers(res);
        remaining(res);
        $('#welcome').hide();
        $('#waiting').show();
        login = setInterval(wait, 3000);
      });
    }
  });

  function wait() {
    var data = {
      id: id
    };
    console.log('id',data);
    $.post('/login', data, function(data, status) {
      res = JSON.parse(data);
      console.log('wait',res);
      listUsers(res);
      remaining(res);
      if (res.max == res.users.length) {
        buildGameboard({size: res.size, ships: res.player.ships});
        buildScoreboard(res.users);
        buildAttack(res.size);
        $('#waiting').hide();
        $('#game').show();
        clearInterval(login);
        game = setInterval(ping, 3000);
      }
    });
  }

  //-----Game-----
  function ping() {
    data = {
      id: id
    };
    $.post('/game', data, function(data, status) {
      res = JSON.parse(data);
      console.log('ping',res);
      updateGameboard(res.shots);
      buildScoreboard(res.users);
      death(res);
    });
  }

  //-----Attack-----
  $('#attack').submit(function() {
    var data = {
      id: id,
      coord: $('#letter_select').val() + $('#number_select').val()
    };
    $.post('/game', {coord: ''}, function(data, status) {
      res = JSON.parse(data);
      console.log('attack',res);
      death(res);
    });
  });

  //-----Again-----
  $('#again').submit(function() {
    $.post('/again', function(data, status) {
      res = JSON.parse(data);
      console.log('again',res);
      $('.hidable').hide();
      $('#welcome').show();
    })
  });
});
