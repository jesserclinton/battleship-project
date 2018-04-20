//-----Attack-----
function Attack() {

}

//-----Scoreboard-----
function Entry(id, name, score) {
  this.id = id;
  this.name = name;
  this.score = score;
}

function Scoreboard() {
  this.entries = [];

  this.addEntry = function(id, name) {
    for (entry of this.entries) if (entry.id == id) return false;
    this.entries.push(new Entry(id, name, 0));
    return true;
  }

  this.incrementScore = function(id) {
    for (entry of this.entries) {
      if (entry.id == id) {
        entry.score++;
        return true;
      }
    }
    return false;
  }

  this.addToScore = function(id, points) {
    for (entry of this.entries) {
      if (entry.id == id) {
        entry.score += points;
        return true;
      }
    }
    return false;
  }
}
