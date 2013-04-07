function Level() {
	var self = this;
	var level = 0;
  var words = [];
  
  self.addWord = function(word) {
    words.push(word);
  }
  self.init = function(delta) {
    $("#level1").addClass("important");
    words[level].show();
	};

  self.update = function() { 
	}
  
	self.getLevel = function() { 
    return level;
	}
	
	self.nextLevel = function() {
    words[level].hide();
    level++;
    if (level < words.length) {
      words[level].show();
    }
    
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