function Sprite(imgUrl, width, height, count) {
	var self = this;
  self.width = width;
  self.height = height;
  self.count = count;
  self.imgUrl = imgUrl;
  var isReverse = false;
  var frame = 0;
  
  self.nextFrame = function() {
    frame++;
    if (isReverse) {
      if (frame >= self.count) {
        frame = self.count / 2;
      }
    } else {
      if (frame >= self.count / 2) {
        frame = 0;
      }
    }
  };
  
  self.setIsReverse = function(newIsReverse) {
    isReverse = newIsReverse;
  };
  
  self.getSingleSize = function() {
    return { width: self.width / self.count, height: self.height };
  };
  
  self.draw = function(context, location) {
		var image = new Image();
		image.src = self.imgUrl;
    var singleSize = self.getSingleSize();
    context.drawImage(image, 0 + singleSize.width * frame, 0, singleSize.width, self.height, location.x, location.y, singleSize.width, self.height);
	};
}
