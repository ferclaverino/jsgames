function Accelerator() {
	var self = this;
  var state = "stop";
  var velocity = 0;
  var aceleration = 0.02;
  var maxVelocity = 0.5;
  
  this.init = function(canvas) {
    canvas.addEventListener("click", self.push , false);
	}
  
  self.push = function () {
    state = "starting";
    maxVelocity += 0.1;
  }
  
  this.update = function () {
    if (state == "starting") {
      self.accelerate();
    } else if (state == "stoping") {
      self.deAccelerate();
    }
  }
  
  this.getVelocity = function () {
    return velocity;
  }
  
  self.accelerate = function () {
    if (velocity >= maxVelocity) {
      state = "stoping";
      velocity = maxVelocity;
    } else if (velocity < maxVelocity) {
      velocity += aceleration;
    }
  }
  
  self.deAccelerate = function () {
    if (velocity <= 0) {
      state = "stop";
      velocity = 0;
    } else if (velocity > 0) {
      velocity -= aceleration * 2;
    }
    self.resetMaxVelocity();
  }
  
  self.resetMaxVelocity = function () {
    maxVelocity = 0.5;
  }
}