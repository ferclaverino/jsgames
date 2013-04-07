function Vehicle(config) {
  var self = this;
  self.location = new Vector2(config.x, config.y);
  self.velocity = new Vector2(0, 0);
  self.size = config.size;
  
  var acceleration = new Vector2(0, 0);
  var maxspeed = 10;
  var maxforce = 0.5;
  var mass = config.mass;
  var canvasSize = config.canvasSize;
  
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
    //desired.rotate(target.heading());
    desired.normalize();
    desired.mult(maxspeed);
    var steer = Vector2.sub(desired, self.velocity);
    steer.limit(maxforce);
    privateMembers.applyForce(steer);
  };
  
  self.stayWithinWalls = function() {
    if (self.location.x > canvasSize.width - self.size.width) {
      self.location.x = canvasSize.width - self.size.width;
      privateMembers.reverseX();
    } else if (self.location.x < 0) {
      self.location.x = 0;
      privateMembers.reverseX();
    }
 
    if (self.location.y > canvasSize.height - self.size.height) {
      self.location.y = canvasSize.height - self.size.height;
      privateMembers.reverseY();
    } else if (self.location.y < 0) {
      self.location.y = 0;
      privateMembers.reverseY();
    }
  }
  
  self.isOut = function() {
    if (self.location.x > canvasSize.width - self.size.width) {
      return true;
    } else if (self.location.x < 0) {
      return true;
    }
 
    if (self.location.y > canvasSize.height - self.size.height) {
      return true;
    } else if (self.location.y < 0) {
      return true;
    }
    
    return false;
  }
  privateMembers.reverseX = function() {
    self.velocity.x = self.velocity.x * (-1);
  }
  
  privateMembers.reverseY = function() {
    self.velocity.y = self.velocity.y * (-1);
  }
  
	self.update = function() {
    self.velocity.add(acceleration);
    self.velocity.limit(maxspeed);
    self.location.add(self.velocity);
    acceleration.mult(0);
	}
  
  self.intersect = function(other) {
    if (self.location.x + self.size.width < other.location.x)
        return false;
    if (self.location.y + self.size.height < other.location.y)
        return false;
    if (self.location.x > other.location.x + other.size.width)
        return false;
    if (self.location.y > other.location.y + other.size.height)
        return false;
        
    return true;
  }
}