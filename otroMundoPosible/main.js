function MainGame() {
	var canvas;
	var canvasSize = { width: 640, height: 480 };
  var context;
	var backBuffer;
	var gameObjects;
	var self = this;
	var objectToBeAdded = new Array();
	var objectToDeleted = new Array();
  
  
	this.init = function (canvasName) {
		canvas = document.getElementById(canvasName);
		context = canvas.getContext("2d");
		
		backBufferCanvas = document.createElement('canvas');
		backBufferCanvas.width = canvas.width;
		backBufferCanvas.height = canvas.height;
		backBuffer = backBufferCanvas.getContext('2d');
		
		gameObjects = new Array();
		
    var level = new Level();
    var man = new Man(canvas, canvasSize);
    var friend = new Friend(canvasSize, man, level);
    var background = new Background(level);
    
    var word1 = new Word(man, friend, "desconocidos", canvasSize);
    var word2 = new Word(man, friend, "diferencias", canvasSize);
    var word3 = new Word(man, friend, "seg�n", canvasSize);
    level.addWord(word1);
    level.addWord(word2);
    level.addWord(word3);
    
    add(level);
    add(background);
    add(man);
    add(word1);
    add(word2);
    add(word3);
    add(friend);
    
		
		setInterval(runGame, 1000 / 30);
	}

	function add(obj) {
		objectToBeAdded.push(obj);
	}
		
	function remove(obj) {
		objectToDeleted.push(obj);
	}

	function processAll() {
		//Added
		if (objectToBeAdded.length != 0) {
			for (var x = 0; x < objectToBeAdded.length; ++x) {
				gameObjects.push(objectToBeAdded[x]);
				objectToBeAdded[x].init(canvas);
			}
			objectToBeAdded.splice(0, objectToBeAdded.length);
		}
		
		//Remove
		if (objectToDeleted.length != 0)
		{
			for (var x = 0; x < objectToDeleted.length; ++x) {
				gameObjects.removeObject(objectToDeleted[x]);
			}
			objectToDeleted.splice(0, objectToDeleted.length);
		}
		self.sortObjects();
	}

	function runGame() {
		var thisFrame = new Date().getTime();
		var delta = (thisFrame - this.lastFrame) / 1000;
		this.lastFrame = thisFrame;
		
		backBuffer.fillStyle = "rgb(255,255,255)";
		backBuffer.fillRect(0, 0, canvas.width, canvas.height);
		
		for (var i = 0; i < gameObjects.length; i++) {
			gameObjects[i].update(delta);
			if (gameObjects[i].draw && gameObjects[i].visible()) {
				gameObjects[i].draw(backBuffer);
			}
		}
		
		//Loop finished, draw everything
		context.drawImage(backBufferCanvas, 0, 0);
		
		processAll();
	};

	this.sortObjects = function() {
		gameObjects.sort(function(a,b){return a.zOrder - b.zOrder;});
	}
}