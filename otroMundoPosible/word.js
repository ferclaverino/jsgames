function Word(man, level, word) {
	var self = this;
  self.level = level;
  self.word = word;
  self.man = man;
	var position = {x: Math.floor(Math.random()*641), y: Math.floor(Math.random()*481)};
  var target = {x: position.x, y: position.y};
  var direction = {x: 1, y: 1};
  var width = 80;
  var height = 10;
  var isVisible = true;
  var state = "escaping";
  
  self.moveWithMan = function() {
    return self.man.position;
  }
  
  self.moveAwayMan = function(delta) {
    var distance = delta * 80;
    
    direction.x = (position.x > man.position.x) ? 1 : -1;
    direction.y = (position.y > man.position.y) ? 1 : -1;
    
    var nextPosition = {
      x: position.x + distance * direction.x,
      y: position.y + distance * direction.y
    };
    
    if (nextPosition.x < 0) {
      nextPosition.x = 0;
      direction.x = 1;
    } else if (nextPosition.x > 640 - width) {
      nextPosition.x = 640 - width;
      direction.x = -1;
    }
    
    if (nextPosition.y < 0) {
      nextPosition.y = 0;
      direction.y = 1;
    } else if (nextPosition.y > 480 - height) {
      nextPosition.y = 480 - height;
      direction.y = -1;
    }
    
    //if (position.x < 10 && position.y < 10) {
      //isVisible = false;
      //self.level.nextLevel();
    //}
    
    return nextPosition;
  }
  
	this.init = function(delta) {
    //canvas.addEventListener("click", self.moveAwayToThisPoint , false);
	}
	
  //self.moveAwayToThisPoint = function(e) {
    //target.x = e.offsetX;
    //target.y = e.offsetY;
    //direction.x = (position.x > target.x) ? 1 : -1;
    //direction.y = (position.y > target.y) ? 1 : -1;
  //}
  
	this.visible = function() {
		return isVisible;
	}
	
	this.update = function(delta) {
    if (state != "cached") {
      var wordRectangle = new Rectangle();
      wordRectangle.startupRectangle(position.x, position.y, width, height);
      
      var manRectangle = new Rectangle();
      manRectangle.startupRectangle(self.man.position.x, self.man.position.y, self.man.width, self.man.height);
      
      if (wordRectangle.intersects(manRectangle)) {
        state = "cached";
      }
    }
    
    if (isVisible) {
      if (state == "cached") {
        position = self.moveWithMan();
      } else {
        position = self.moveAwayMan(delta);
      }
      
    }
	}
	
	this.draw = function(context) {
		context.fillStyle = "white";
    context.font = 'italic 20px Calibri';
    context.fillText(self.word, position.x, position.y);
	}
}