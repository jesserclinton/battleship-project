onclick = function(e) {
  e.preventDefault();
}

var goToWaiting = function() {
  var article = document.getElementsByClassName('welcome');
  article[0].setAttribute('hidden','');
  article = document.getElementsByClassName('waiting');
  article[0].removeAttribute('hidden');
}

var startGame = function() {
  var article = document.getElementsByClassName('waiting');
  article[0].setAttribute('hidden','');
  article = document.getElementsByClassName('game');
  article[0].removeAttribute('hidden');
}

var playerDied = function() {
  var section = document.getElementsByClassName('alert');
  section[0].removeAttribute('hidden');
}

var playerWon = function() {
  var article = document.getElementsByClassName('game');
  article[0].setAttribute('hidden','');
  article = document.getElementsByClassName('win');
  article[0].removeAttribute('hidden');
  article = document.getElementsByClassName('again');
  article[0].removeAttribute('hidden');
}

var playerLost = function() {
  var article = document.getElementsByClassName('game');
  article[0].setAttribute('hidden','');
  article = document.getElementsByClassName('lose');
  article[0].removeAttribute('hidden');
  article = document.getElementsByClassName('again');
  article[0].removeAttribute('hidden');
}

var playAgain = function() {
  var article = document.getElementsByTagName('article');
  // console.log(article);
  for (let item of article) {
    // console.log(item);
    item.setAttribute('hidden','');
  }
  var section = document.getElementsByClassName('alert');
  section[0].setAttribute('hidden','');
  document.getElementById('username').value = '';
  article = document.getElementsByClassName('welcome');
  article[0].removeAttribute('hidden');
}
