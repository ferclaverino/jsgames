function Man(canvasSize) {
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
  var target = new Vector2(0, 0);
  
	self.init = function(delta) {
    canvas.addEventListener("mousemove", self.moveToThisPoint , false);
	};

  self.moveToThisPoint = function(e) {
    target = new Vector2(e.offsetX, e.offsetY);
  };
  
	self.visible = function() {
		return true;
	};

	self.update = function(delta) {
    self.vehicle.arrive(target);
    self.vehicle.stayWithinWalls();
    self.vehicle.update();
    
    distance += delta;
    if (distance > 0.1) {
      var isReverse = (self.vehicle.velocity.heading() < 0);
      sprite.setIsReverse(isReverse);
      sprite.nextFrame();
      distance = 0;
    }
	};

	self.draw = function(context) {
		sprite.draw(context, self.vehicle.location);
	};
  
}
