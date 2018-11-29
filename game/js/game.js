var Game = function(options) {

  var self = this;

  self.playerOne = new Player({
    paddleOptions: {
      upKey: Keyboard.Key.Up,
      downKey: Keyboard.Key.Down
    }
  });

  self.playerTwo = new Player({
    other: true,
    paddleOptions: {
      upKey: Keyboard.Key.ARROW_UP,
      downKey: Keyboard.Key.ARROW_DOWN
    }
  });

  self.puck = new Puck({
    players: {
      one: self.playerOne,
      two: self.playerTwo
    }
  });

  self.target = options.target || document.body;

  self.init = function() {
    self.canvas = document.createElement("canvas");
    self.canvas.id = "game";

    self.canvas.width = GAME_WIDTH;
    self.canvas.height = GAME_HEIGHT;

    self.ctx = self.canvas.getContext("2d");

    self.target.appendChild(self.canvas);

    Keyboard.init();

    self.loop();
  };


  self.lsts = null;
  self.loop = function() {
    requestAnimationFrame(self.loop);

    var ts = Date.now();
    if(!self.lsts) self.lsts = ts;
    var dt = (ts - self.lsts) / 1000;
    self.lsts = ts;

    self.update(dt);
    self.render();
  };

  self.update = function(dt) {
    self.playerOne.update(dt);
    self.playerTwo.update(dt);
    self.puck.update(dt);
  };

  self.render = function() {
    self.ctx.clearRect(0, 0, self.canvas.width, self.canvas.height);

    renderTableAddons();
    renderScoreForPlayer(self.playerOne);
    renderScoreForPlayer(self.playerTwo);

    self.playerOne.render(self.ctx);
    self.playerTwo.render(self.ctx);
    self.puck.render(self.ctx);
  };

  var renderTableAddons = function () {
    var smallCircle = 3, bigCircle = 100;

    self.ctx.fillStyle = self.ctx.strokeStyle = "#fff";

    self.ctx.save();
    self.ctx.globalAlpha = .5;
    self.ctx.beginPath();
    self.ctx.rect(GAME_WIDTH / 2 - .5, CONTENT_OFFSET, 1, GAME_HEIGHT - 2 * CONTENT_OFFSET);
    self.ctx.ellipse(GAME_WIDTH / 2, GAME_HEIGHT / 2, smallCircle, smallCircle, 0, 0, Math.PI * 2);
    self.ctx.fill();

    self.ctx.beginPath();
    self.ctx.ellipse(GAME_WIDTH / 2, GAME_HEIGHT / 2, bigCircle, bigCircle, 0, 0, Math.PI * 2);
    self.ctx.stroke();

    self.ctx.restore();
  };

  var renderScoreForPlayer = function (player) {
    self.ctx.save();
    self.ctx.globalAlpha = .5;
    self.ctx.font = '80px monospace';
    self.ctx.fillStyle = "#fff";
    self.ctx.textAlign = 'center';
    self.ctx.fillText(player.getScore(), GAME_WIDTH / 4 * (player.other ? 3 : 1), GAME_HEIGHT / 5);
    self.ctx.restore();
  };

};

var game = new Game({});

game.init();