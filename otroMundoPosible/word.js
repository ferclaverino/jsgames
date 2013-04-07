function Word(man, friend, word, canvasSize) {
	var self = this;
  self.man = man;
  self.friend = friend;
  self.word = word;
  
  var size = { width: 80, height: 20 };
	var vehicle = new Vehicle({
    x: 100,
    y: 100,
    size: size,
    canvasSize: canvasSize,
    mass: 1.5
  });

  var isVisible = true;
  var state = "hide";
  
	this.init = function(delta) {
	}
	
	this.visible = function() {
		return state != "hide";
	}
	
	this.update = function(delta) {
    
    if (state == "escaping") {
      vehicle.flee(self.man.vehicle.location);
      vehicle.stayWithinWalls();
      vehicle.update();
      
      if (vehicle.intersect(self.man.vehicle)) {
        state = "catchedByMan";
      }
    } else if (state == "catchedByMan") {
      vehicle.location = self.man.vehicle.location;
      self.friend.goHelp();
      
      if (vehicle.intersect(self.friend.vehicle)) {
        state = "catchedByFriend";
        self.friend.goOut();
      }
    } else if (state == "catchedByFriend") {
      vehicle.location = self.friend.vehicle.location;
    }
	}
	
  this.hide = function() {
    state = "hide";
  }
  
  this.show = function() {
    state = "escaping";
  }
  
	this.draw = function(context) {
		context.fillStyle = "white";
    context.font = 'italic 20px Calibri';
    context.fillText(self.word, vehicle.location.x, vehicle.location.y + size.height);
	}
}