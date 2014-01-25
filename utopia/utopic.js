function Utopic(accelerator) {
	var self = this;
	var x = 450;
	var y = -355;
	var frame = 1;
	var distance = 0;
  var width = 150;
  var height = 66;
  var halfWidth = width / 2;
  var image;
  self.accelerator = accelerator;
  
	this.init = function(delta) {
    image = new Image();
    image.src = "utopic.png";    
	}
	
	this.visible = function() {
		return true;
	}
	
	this.update = function(delta) {
		var velocity = self.accelerator.getVelocity();
    distance += delta * velocity;
		if (distance > 0.1) {
			frame = frame + 1 > 1 ? 0 : 1;
			distance = 0;
		}
	}
	
	this.draw = function(context) {
    context.save();
    context.rotate(0.8); 
		context.drawImage(image, 0 + halfWidth * frame, 0, halfWidth, height, x, y, halfWidth, height);
    context.restore();
	}
}