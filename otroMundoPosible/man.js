function Man(canvasSize) {
  var self = this;
  var distance = 0;
  var sprite = new Sprite("man2.png", 116, 32, 4, true);
  var vehicle = new Vehicle({
    x: 0,
    y: 0,
    size: sprite.getSingleSize(),
    canvasSize: canvasSize
  });
  
  var target = new Vector2(0, 0);
  var wasFoward = false;
  
	self.init = function(delta) {
    canvas.addEventListener("mousemove", self.moveToThisPoint , false);
	}

  self.moveToThisPoint = function(e) {
    target = new Vector2(e.offsetX, e.offsetY);
  }
  
	self.visible = function() {
		return true;
	}

	self.update = function(delta) {
    vehicle.seek(target);
    vehicle.update();
    
    distance += delta;
    if (distance > 0.1) {
      sprite.nextFrame();
      
      var isFoward = (vehicle.velocity.heading() > 0);
      if (isFoward != wasFoward) {
        isFoward = wasFoward;
        sprite.revert();
      }
      distance = 0;
    }
	}

	self.draw = function(context) {
		sprite.draw(context, vehicle.location);
	}
}
