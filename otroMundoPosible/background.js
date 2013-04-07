function Background(level) {
	var self = this;
  self.level = level;
	
  var sprite = new Image();
	sprite.src = "world0.jpg";
  
  var music = new Audio();
	music.src = "imagine.mp3";
  
	this.init = function() { 
    //music.loop = true;
		music.volume = 0.5;
		music.play(); 
	}
	
	this.visible = function() {	return true; }
	
	this.update = function(delta) {
    sprite.src = "world" + self.level.getLevel() + ".jpg";
	}
		
	this.draw = function(context) {
		context.drawImage(sprite, 0, 0);
	}
}