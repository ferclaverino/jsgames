function Word(man, level, word, canvasSize) {
	var self = this;
  self.man = man;
  self.level = level;
  self.word = word;
  
  var size = { width: 80, height: 20 };
	var vehicle = new Vehicle({
    x: 100,
    y: 100,
    size: size,
    canvasSize: canvasSize,
    mass: 0.5
  });
  

  var isVisible = true;
  var state = "escaping";
  
	this.init = function(delta) {
	}
	
	this.visible = function() {
		return isVisible;
	}
	
	this.update = function(delta) {
    vehicle.flee(self.man.getLocation());
    vehicle.update();
	}
	
	this.draw = function(context) {
		context.fillStyle = "white";
    context.font = 'italic 20px Calibri';
    context.fillText(self.word, vehicle.location.x, vehicle.location.y + size.height);
	}
}