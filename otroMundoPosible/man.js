function Man() {
	var self = this;
	var current = {x: 0, y: 0};
  var target = {x: 0, y: 0};
	var frame = 1;
	var distance = 0;
  var width = 58;
  var height = 32;
  var halfWidth = width / 2;
  
	this.init = function(delta) {
    canvas.addEventListener("click", self.moveToThisPoint , false);
	}
	
  self.moveToThisPoint = function(e) {
    target.x = e.offsetX;
    target.y = e.offsetY;
  }
  
	this.visible = function() {
		return true;
	}
	
	this.update = function(delta) {
    distance += delta;
		current.x += (target.x - current.x) * distance;
    current.y += (target.y - current.y) * distance;
    if (distance > 0.1) {
			frame = frame + 1 > 1 ? 0 : 1;
			distance = 0;
    }
	}
	
	this.draw = function(context) {
		var image = new Image();
		image.src = "man.png";
		context.drawImage(image, 0 + halfWidth * frame, 0, halfWidth, height, current.x, current.y, halfWidth, height);
	}
}