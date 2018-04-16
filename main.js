//=====Settings=====
onsubmit = function(e) {
  e.preventDefault();
}

//=====Variables=====
var id;

//=====Functions=====
//-----Login-----
function buildLogins(res) {
  (section = $('#players')).empty();
  var ol = $(document.createElement('ol'));
  for (player of res.users) {
    $(document.createElement('li')).text(player.name).appendTo(ol);
  }
  section.append(ol);
}

function buildGameboard(data) {
  if (size > 26) console.log('WARNING! SIZES LARGER THAN 26 COULD LEAD TO POOR PERFORMANCE');
  if (size < 10) data.size = 10;

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
  for (friend of layout.friends) {
    $('#'+friend.front).text('☺︎');
  }
}

function buildAttack(size) {
  if (size < 10) size = 10;
  var section = $('#attack');
  section.empty();

  var form = $(document.createElement('form')).attr('id','attack');
  var select = $(document.createElement('select')).attr('id','letter_select');
  for (var i = 0; i < size; i++) {
    var letter = String.fromCharCode(i+65);
    var option = $(document.createElement('option')).val(letter).text(letter).appendTo(select);
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
    $(document.createElement('td')).text(player.points).appendTo(tr);
    table.append(tr);
  }
  scoreboards.append(table);
}

//-----Game-----
function updateGameboard(layout) {
  if (layout.damages) {
    for (damage of layout.damages) {
      $('#'+damage).text('☻');
    }
  }
  if (layout.hits) {
    for (hit of layout.hits) {
      $('#'+hit).text('■');
    }
  }
  if (layout.misses) {
    for (miss of layout.misses) {
      $('#'+miss).text('□');
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

//=====jQuery=====
$(function() {
  //-----Login-----
  $('#login').submit(function() {
    var data = {
      name: $('#username').val(),
      num_players: $('#num_players').val()
    };
    if (!data.name) {
      $('#required_username').show();
    } else if (!data.num_players || data.num_players < 2) {
      $('#required_number').show();
    } else {
      $.post('/login', data, function(data, status) {
        res = JSON.parse(data);
        console.log('login',res);
        id = res.player.id;
        buildLogins(res);
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
      buildLogins(res);
      if (res.max == res.users.length) {
        buildGameboard(res.size);
        buildAttack(res.size);
        $('#waiting').hide();
        $('#gameboard').show();
      }
    });
  }

  //-----Game-----
  function ping() {
    $.post('/game', function(data, status) {
      res = JSON.parse(data);
      console.log('ping',res);
      updateGameboard(res.layout);
      buildScoreboard(res.players);
      death(res);
    });
  }

  //-----Attack-----
  $('#attack').submit(function() {
    $.post('/game',function(data, status) {
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
