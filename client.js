//=====Settings=====
onsubmit = function(e) {
  e.preventDefault();
}

onload = function() {
  setInterval(animateBg,80);
  // displayAll();
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
    var form = $(document.createElement('form')).addClass('portal').attr('id', 'room');
    for (room of this.rooms) {
      $(document.createElement('input')).attr('id','rm_'+room.name).attr('name','room').val(room.name).attr('type', 'radio').appendTo(form);
      $(document.createElement('label')).attr('for','rm_'+room.name).text(' '+room.name).appendTo(form);
      $(document.createElement('span')).attr('id','rm_'+room.name+'_cur').text(room.players.length).appendTo(form);
      $(document.createTextElement(' / ')).appendTo(form);
      $(document.createTextElement(room.max)).appendTo(form);
      $(document.createElement('br')).appendTo(form);
    }
    $(document.createElement('input')).attr('type','radio').attr('name','room').attr('id','new_rm').appendTo(form);
    $(document.createElement('label')).attr('for','new_rm').text(' new room ').appendTo(form);
    $(document.createElement('br')).appendTo(form);
    form.children(':first-child').attr('checked', '');
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

//=====Functions=====
function displayAll() {
  $('.hidable').show();
}

//-----Rooms-----


//=====jQuery=====
$(function() {
  //-----Begin-----
  $('#begin').submit(function() {
    $.post('/begin', function(data, status) {
      res = JSON.parse(data);
      console.log('begin',res);
      // listRooms();
      id = res.id;
      (new Lobby(res.rooms)).appendTo($('#lobby'));
      $('#welcome').hide();
      $('#rooms').show();
    });
  });

  //-----Login-----
  $('#login').submit(function() {
    var data = {
      name: $('#username').val(),
      room: {name: $('#')}
    };
    if (!data.name) {
      $('#required_username').show();
    } else if (data.room.max == -1) {
      // make new room
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
});
