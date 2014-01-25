function Background(level) {
	var self = this;
  self.level = level;
	
  var sprite = new Image();
	var worldImg = "world0.jpg";
  sprite.src = worldImg;
  
  var music = new Audio();
	music.src = "imagine.mp3";
  
	this.init = function() { 
    //music.loop = true;
		music.volume = 0.5;
		music.play(); 
	}
	
	this.visible = function() {	return true; }
	
	this.update = function(delta) {
    var newWorldImg = "world" + self.level.getLevel() + ".jpg";
    
    if (newWorldImg != worldImg) {
      worldImg = newWorldImg;
      sprite.src = worldImg;
    }
	}
		
	this.draw = function(context) {
		context.drawImage(sprite, 0, 0);
	}
}