function Word(level, word) {
	var self = this;
  self.level = level;
  self.word = word;
	var current = {x: Math.floor(Math.random()*641), y: Math.floor(Math.random()*481)};
  var target = {x: current.x, y: current.y};
  var direction = {x: 1, y: 1};
  var width = 80;
  var height = 10;
  var isVisible = true;
  
	this.init = function(delta) {
    canvas.addEventListener("click", self.moveAwayToThisPoint , false);
	}
	
  self.moveAwayToThisPoint = function(e) {
    target.x = e.offsetX;
    target.y = e.offsetY;
    direction.x = (current.x > target.x) ? 1 : -1;
    direction.y = (current.y > target.y) ? 1 : -1;
  }
  
	this.visible = function() {
		return isVisible;
	}
	
	this.update = function(delta) {
    if (isVisible) {
      var distance = delta * 80;
      current.x += distance * direction.x;
      current.y += distance * direction.y;
      
      if (current.x < 0) {
        current.x = 0;
        direction.x = 1;
      } else if (current.x > 640 - width) {
        current.x = 640 - width;
        direction.x = -1;
      }
      
      if (current.y < 0) {
        current.y = 0;
        direction.y = 1;
      } else if (current.y > 480 - height) {
        current.y = 480 - height;
        direction.y = -1;
      }
      
      if (current.x < 10 && current.y < 10) {
        isVisible = false;
        self.level.nextLevel();
      }
    }
	}
	
	this.draw = function(context) {
		context.fillStyle = "white";
    context.font = 'italic 20px Calibri';
    context.fillText(self.word, current.x, current.y);
	}
}