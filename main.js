//=====Settings=====
onsubmit = function(e) {
  e.preventDefault();
}

//=====Functions=====
//-----Login-----
function buildLogins(players) {
  // console.log(players);
  var section = $('#players');
  section.empty();
  var ol = $(document.createElement('ol'));
  for (player of players) {
    $(document.createElement('li')).text(player.name).appendTo(ol);
  }
  section.append(ol);
}

//-----Start-----
function buildGameboard(size) {
  if (size > 26) console.log('WARNING! SIZES LARGER THAN 26 COULD LEAD TO POOR PERFORMANCE');
  if (size < 12) size = 12;

  var section = $('#gameboard');
  section.empty();
  var table = $(document.createElement('table'));
  var tr = $(document.createElement('tr')).appendTo(table);
  $(document.createElement('td')).attr('class','coords').appendTo(tr);
  for (var i = 1; i < size+1; i++) {
    var td = $(document.createElement('td')).addClass('coords').text(i).appendTo(tr);
  }
  table.append(tr);
  for (var i = 0; i < size; i++) {
    tr = $(document.createElement('tr'));
    $(document.createElement('td')).addClass('coords').text(String.fromCharCode(i+65)).appendTo(tr);
    for (var j = 0; j < size; j++) {
      $(document.createElement('td')).attr('id',String.fromCharCode(i+65)+(j+1)).addClass('game_square').text('~').appendTo(tr);
    }
    table.append(tr);
  }
  section.append(table);
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

function buildAttack(size) {
  if (size < 12) size = 12;
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

//=====jQuery=====
$(function() {
  //-----Login-----
  $('#login').submit(function() {
    var user = {
      name: $('#username').val(),
      points: 0
    };
    if (!user.name) {
      $('#required').show();
    } else {
      // console.log(user);
      $.post('/login', user, function(data, status) {
        res = JSON.parse(data);
        console.log('login',res);
        buildLogins(res.players);
        $('#welcome').hide();
        $('#waiting').show();
      });
    }
  });

  //-----Start-----
  $('#start').submit(function() {
    $.post('/start', function(data, status) {
      res = JSON.parse(data);
      console.log('start',res);
      buildGameboard(res.size);
      buildScoreboard(res.players);
      buildAttack(res.size);
      $('#waiting').hide();
      $('#game').show();
      game = setInterval(pingGame, 3000);
    });
  });

  //-----Game-----
  function pingGame() {
    console.log('syn');
    $.post('/game', function(data, status) {
      console.log('ack');
      res = JSON.parse(data);
      console.log('game',res);
      if (res.dead) {
        $('#died').show();
        $('#fire_button').attr('disabled','');
      } else {
        $('#died').hide();
        $('#fire_button').removeAttr('disabled');
      }
    });
  }

  //-----Attack-----
  $('#attack').submit(function() {
    console.log('kaboom!');
    $.post('/attack',function(data, status) {
      res = JSON.parse(data);
      console.log('attack',res);
      if (res.dead) $('#died').show();
    });
  });
});
