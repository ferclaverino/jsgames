function Friend(canvasSize, man, level) {
  var self = this;
  var distance = 0;
  var sprite = new Sprite("man2.png", 116, 32, 4, true);
  self.vehicle = new Vehicle({
    x: 0,
    y: 0,
    size: sprite.getSingleSize(),
    canvasSize: canvasSize,
    mass: 1
  });
  self.man = man;
  
  var status = "hide";
  
	self.init = function(delta) {
	};
  
	self.visible = function() {
		return status != "hide";
	};

	self.update = function(delta) {
    if (status == "helping") {
      self.vehicle.arrive(man.vehicle.location);
      self.vehicle.update();
    } else if (status == "getingOut") {
      self.vehicle.flee(man.vehicle.location);
      self.vehicle.update();
      
      if (self.vehicle.isOut()) {
        status = "hide";
        level.nextLevel();
      }
    }
    
    if (status == "helping" || status == "getingOut") {
      distance += delta;
      if (distance > 0.1) {
        var isReverse = (self.vehicle.velocity.heading() < 0);
        sprite.setIsReverse(isReverse);
        sprite.nextFrame();
        distance = 0;
      }
    }
	};

	self.draw = function(context) {
		sprite.draw(context, self.vehicle.location);
	};
  
  self.goHelp = function() {
    status = "helping";
  }
  
  self.goOut = function() {
    status = "getingOut";
  }
  
}
