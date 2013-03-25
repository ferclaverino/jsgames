function Level() {
	var self = this;
	var level = 0;
	
	this.getLevel = function() { 
    return level;
	}
	
	this.nextLevel = function() {
    level++;
    
    if (level == 1) {
      $("#level1").text("compatriotas y contemporáneos");
      $("#level1").addClass("important");
    } else if (level == 2) {
      $("#level2").text("voluntad de belleza y voluntad de justicia");
      $("#level2").addClass("important");
    } else if (level == 3) {
      $("#level3").text("sin que importen ni un poquito");
      $("#level3").addClass("important");
    }
  }
}