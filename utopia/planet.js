function Planet(accelerator) {
	var self = this;
	var PI = 3.1415;
  var rotateInRadians = 2 * PI;
  var width = 712;
  var height  = 717;
  self.accelerator = accelerator;
  
  this.init = function() {
  }
  
	this.visible = function() {
		return true;
	}
  
	this.update = function(delta) {
    var velocity = self.accelerator.getVelocity();
    if (velocity > 0) {
      rotateInRadians -= delta * velocity;
      
      if (rotateInRadians < 0) {
        rotateInRadians = 2 * PI;
      }
    }
	}
	
	this.draw = function(context) {
		var image = new Image();
		image.src = "planet.png";
    
    // save the context's co-ordinate system before 
    // we screw with it
    context.save(); 
    
    // move the origin to 50, 35   
    //context.translate((context.width-width) / 2, 300); 
    context.translate((context.canvas.width - width) / 2, 50); 
    
    // now move across and down half the 
    // width and height of the image (which is 128 x 128)
    context.translate(width/2, height /2); 
    
    // rotate around this point
    context.rotate(rotateInRadians); 
    
    // then draw the image back and up
    context.drawImage(image, width/-2, height /-2); 
    
    // and restore the co-ordinate system to its default
    // top left origin with no rotation
    context.restore();
    
	}
}