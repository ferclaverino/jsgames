function Vehicle(config) {
  var self = this;
  self.location = new Vector2(config.x, config.y);
  self.velocity = new Vector2(0, 0);
  
  var acceleration = new Vector2(0, 0);
  var maxspeed = 10;
  var maxforce = 0.5;
  var mass = config.mass;
  var canvasSize = config.canvasSize;
  var size = config.size;
  var privateMembers = {};
  
  privateMembers.applyForce = function(force) {
    force.div(mass);
    acceleration.add(force);
  };
  
  self.arrive = function(target) {
    var desired = Vector2.sub(target, self.location);
 
    //The distance is the magnitude of the vector pointing from location to target.
    d = desired.mag();
    desired.normalize();
    //If we are closer than 100 pixels...
    if (d < 50) {
      //...set the magnitude according to how close we are.
      //m = map(d,0,100,0,maxspeed);
      m = maxspeed * d / 50;
      desired.mult(m);
    } else {
      //Otherwise, proceed at maximum speed.
      desired.mult(maxspeed);
    }
 
    //The usual steering = desired - velocity
    var steer = Vector2.sub(desired,self.velocity);
    steer.limit(maxforce);
    privateMembers.applyForce(steer);
  }
  
  self.seek = function(target) {
    var desired = Vector2.sub(target, self.location);
    desired.normalize();
    desired.mult(maxspeed);
    var steer = Vector2.sub(desired, self.velocity);
    steer.limit(maxforce);
    privateMembers.applyForce(steer);
  };
  
  self.flee = function(target) {
    var desired = Vector2.sub(self.location, target);
    desired.rotate(target.heading());
    desired.normalize();
    desired.mult(maxspeed);
    var steer = Vector2.sub(desired, self.velocity);
    steer.limit(maxforce);
    privateMembers.applyForce(steer);
  };
  
  privateMembers.checkEdges = function() {
    if (self.location.x > canvasSize.width - size.width) {
      self.location.x = canvasSize.width - size.width;
      self.velocity.x = self.velocity.x * (-1);
    } else if (self.location.x < 0) {
      self.velocity.x = self.velocity.x * (-1);
      self.location.x = 0;
    }
 
    if (self.location.y > canvasSize.height - size.height) {
      self.location.y = canvasSize.height - size.height;
      self.velocity.y = self.velocity.y * (-1);
    } else if (self.location.y < 0) {
      self.velocity.y = self.velocity.y * (-1);
      self.location.y = 0;
    }
  }
  
	self.update = function() {
    self.velocity.add(acceleration);
    self.velocity.limit(maxspeed);
    self.location.add(self.velocity);
    privateMembers.checkEdges();
    acceleration.mult(0);
	}
}