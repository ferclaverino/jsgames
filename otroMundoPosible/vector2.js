var Vector2 = function(x, y)
{
  var self = this;
  self.x = x;
  self.y = y;
  var DEGRAD = 0;
  
  self.add = function(vector) {
    self.x += vector.x;
    self.y += vector.y;
  };
  
  self.sub = function(vector) {
    self.x -= vector.x;
    self.y -= vector.y;
  };
  
  self.mult = function(scalar) {
    self.x = self.x * scalar;
    self.y = self.y * scalar;
  };
  
  self.div = function(scalar) {
    self.x = self.x / scalar;
    self.y = self.y / scalar;
  };
  
  self.mag = function() {
    return Math.sqrt(self.x * self.x + self.y * self.y);
  };
  
  self.normalize = function() {
    var m = self.mag();
    if (m != 0) {
      self.div(m);
    }
  };
  
  self.limit = function(max) {
    if (self.mag() > max) {
      self.normalize();
      self.mult(max);
    }
  };
  
  self.heading = function() {
    return -Math.atan2(-self.y, self.x)
  },
  
  self.rotate = function(deg) {
    var rad = deg * DEGRAD;
    var cos = Math.cos(rad);
    var sin = Math.sin(rad);
    self.x = self.x * cos - self.y * sin;
    self.y = self.y * cos + self.x * sin;
  };
  
  //self.lerp
  
  self.dist = function(vector) {
    var deltaX = self.x - vector.x;
    var deltaY = self.y - vector.y;
    return Math.sqrt( deltaX * deltaX + deltaY * deltaY );
  };
  
  //self.angleBetween
  
  self.dot = function(vector) {
    return (self.x * vector.x + self.y * vector.y);
  };
  
  //self.cross
  
  //self.random2D() 
};

Vector2.add = function (v1, v2) {
  return new Vector2(v1.x + v2.x, v1.y + v2.y);
};

Vector2.sub = function (v1, v2) {
  return new Vector2(v1.x - v2.x, v1.y - v2.y);
};

Vector2.mult = function(v, scalar) {
  return new Vector2(v1.x - v2.x, v1.y - v2.y);
  self.x = self.x * scalar;
  self.y = self.y * scalar;
};
