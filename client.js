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
var player;
var gameboard;
var attack;
var scoreboard;

//=====Constructors=====
//-----Lobby-----
function Lobby(rooms) {
  this.rooms = rooms ? rooms : [];

  this.addRoom = function(room) {
    for (r of this.rooms) if (r.name == room.name) return false;
    this.rooms.push(room);
    return true;
  }

  this.appendTo = function(location = $('body')) {
    location.empty();
    var form = $(document.createElement('form')).addClass('portal').attr('id', 'join');
    form.append(
      $(document.createElement('div'))
        .append($(document.createElement('label')).attr('for','username').text('Username: '))
        .append($(document.createElement('input'))
          .attr({'type':'text', 'id':'username', 'title':'username', 'spellcheck':false, 'placeholder':'Fred'})
        )
    );
    for (room of this.rooms) {
      form.append(
        $(document.createElement('input'))
          .attr('id','rm_'+room.name)
          .attr('name','room')
          .val(room.name)
          .attr('type', 'radio')
      ).append(
        $(document.createElement('label'))
          .attr('for','rm_'+room.name)
          .text(' '+room.name+' ')
      ).append(
        $(document.createElement('span'))
          .attr('id','rm_'+room.name+'_cur')
          .text(room.players.length)
      ).append(
        $(document.createTextNode(' / '))
      ).append(
        $(document.createTextNode(room.max))
      ).append(
        $(document.createElement('br'))
      );
    }
    form.append(
      $(document.createElement('input'))
        .attr({'type': 'radio', 'name': 'room', 'id':'new_rm'})
        .val('_new')
    ).append(
      $(document.createElement('label'))
        .attr('for','new_rm')
        .text(' new room ')
    ).append(
      $(document.createElement('br'))
    ).append(
      $(document.createElement('input')).attr('type','submit').val('Join Room')
    )
    form.children(':first-child').next().attr('checked', '');
    location.append(form);
  }
}

//-----Gameboard-----
function Gameboard(size = 10) {
  var gameboard = this;
  this.size = size;
  this.coords = [];
  for (var i = 0; i < size; i++) {
    var row = [];
    for (var j = 0; j < size; j++) row.push(0);
    this.coords.push(row);
  }

  this.print = function() {
    for (row of this.coords) {
      console.log(row);
    }
  }

  this.appendTo = function(location = $('body')) {
    location.empty();
    var table = $(document.createElement('table'));
    var tr = $(document.createElement('tr'));
    $(document.createElement('th')).appendTo(tr);
    for (var i = 1; i < this.size+1; i++) {
      var td = $(document.createElement('td')).text(i).appendTo(tr);
    }
    table.append(tr);
    for (var i = 0; i < this.size; i++) {
      tr = $(document.createElement('tr'));
      $(document.createElement('td')).addClass('coords').text(String.fromCharCode(i+65)).appendTo(tr);
      for (var j = 0; j < this.size; j++) {
        $(document.createElement('td')).attr('id',String.fromCharCode(i+65)+(j+1)).addClass('game_square').text('~').appendTo(tr);
      }
      table.append(tr);
    }
    location.append(table);
  }

  this.updateView = function(coords) {
    if (coords.friends) {
      for (friend of coords.friends) {
        for (var i = 0; i < friend.n; i++) {
          $('#'+(new Coordinate((friend.m ? friend.x : friend.x+i),(friend.m ? friend.y+i : friend.y))).toString()).text('☺︎').addClass('info');
        }
      }
    }
    if (coords.damages) for (damage of coords.damages) $('#'+damage).text('☻').addClass('alert');
    if (coords.hits) for (hit of coords.hits) $('#'+hit).text('■').addClass('info');
    if (coords.misses) for (miss of coords.misses) $('#'+miss).text('□').addClass('alert');
  }
}

//-----Coordinate-----
function Coordinate(x, y) {
  var coord = this;

  if (y != undefined && y != null) {
    this.x = Number.isInteger(y) ? x : x-1;
    this.y = Number.isInteger(y) ? y : y.charCodeAt(0)-65;
  } else {
    this.x = parseInt(x.substring(1))-1;
    this.y = x.charCodeAt(0)-65;
  }

  this.toString = function() {
    return String.fromCharCode(this.y+65)+(this.x+1);
  }
}

//-----Scoreboard-----
function Scoreboard() {
  this.entries = [];

  this.appendTo = function(location = $('body')) {
    location.empty();
    table = $(document.createElement('table')).addClass('scoreboard');
    for (entry of this.entries) {
      tr = $(document.createElement('tr'));
      $(document.createElement('td')).text(entry.name).appendTo(tr);
      $(document.createElement('td')).text(entry.score).appendTo(tr);
      tr.appendTo(table)
    }
    table.appendTo(location);
  }
}

//-----Player-----
function Player(id, name) {
  this.id = id;
  this.name = name;
  this.ships = [];
}

//-----Player List-----
function PlayerList(room) {
  this.size = room.max;
  this.players = [];

  this.addPlayer = function(player) {
    for (p of players) if(p.id == player.id) return false;
    players.push(player);
    return true;
  }

  this.appendTo = function(location) {
    location.empty();
    var ul = $(document.createElement('ul'));
    for (player of players) {
      $(document.createElement('li'))
        .text(player.name)
        .appendTo(ul)
    }
    location.append(ul);
  }
}

//-----Command-----
function Command(size = 10) {
  this.size = size;

  this.appendTo = function(location) {
    location.empty();

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
    location.append(form);
  }
}

//=====Functions=====
function displayAll() {
  $('.hidable').show();
}

function hideAll() {
  $('.hidable').hide();
}

//=====jQuery=====
$(function() {
  //-----Begin-----
  $('#begin').submit(function() {
    $.post('/begin', function(data, status) {
      res = JSON.parse(data);
      console.log('begin',res);
      // listRooms();
      id = res.id;
      (new Lobby(res.lobby.rooms)).appendTo($('#rooms'));

      $('#join').submit(join);

      $('#welcome').hide();
      $('#lobby').show();
    });
  });

  //-----Join-----
  var join = function() {
    if ($('#username').val()) {
      for (radio of $('#join').children()) {
        if ($(radio).prop('checked')) {
          var selected = radio;
          break;
        }
      }

      player = new Player(id, $('#username').val());
      // console.log(player);

      var data = {
        player: player,
        room: $(selected).val()
      }

      if (data.room == '_new') {
        $.post('/new', function() {
          $('#lobby').hide();
          $('#create').show();
        });
      } else {
        $.post('/join', data, function(data, status) {
          var res = JSON.parse(data);
          console.log('join',res);
          // console.log('player',player);
          gameboard = new Gameboard(res.size);
            gameboard.appendTo($('#gameboard'));
            gameboard.updateView({friends: res.coords});
          scoreboard = new Scoreboard();
            scoreboard.entries = res.players;
            scoreboard.appendTo($('.scoreboard'));
          command = new Command(res.size);
            command.appendTo($('#command'));
          $('#attack').submit(attack);
          $('#lobby').hide();
          // $('#waiting').show();
          $('#game').show();
        });
      }
    } else $('#required_username').show();
  }

  //-----New-----
  $('#createRoom').submit(function() {
    console.log('NEW');

    var data = {
      id: id
    }

    $.post('/new',data,function() {

    });
  });

  //-----Attack-----
  var attack = function() {
    var data = {
      id: id,
      coord: (new Coordinate($('#letter_select').find(':selected').text()+$('#number_select').find(':selected').text())).toString()
    };
    // console.log(data);
    $.post('/attack',data,function(data, status) {
      var res = JSON.parse(data);
      console.log(res);
    });
  }

  //-----Restart-----
  $('#again').submit(function() {
    id = null;
    player = null;
    players = null;
    gameboard = null;
    attack = null;
    scoreboard = null;
    $.post('/again', function(data,status) {
      var res = JSON.parse(data);
      lobby.removeRoom(res.room);
      $('#results').hide();
      $('#lobby').show();
    });
  });
});
