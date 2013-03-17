function Background(accelerator) {
	var self = this;
	self.accelerator = accelerator;
  
	var music = new Audio();
	music.src = "llanero-solitario.mp3";

	this.init = function() { 
		music.loop = true;
		music.volume = 0;
		music.play(); 
	}
	
	this.update = function(delta) {
    var volume = accelerator.getVelocity() / 10;
    if (volume < 0) {
      volume = 0;
    } else if (volume > 1) {
      volume = 1;
    }
    music.volume = volume;
	}
}