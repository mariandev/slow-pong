
/**
 * @param {object} options
 * @param {object} options.players
 * @param {Player} options.players.one
 * @param {Player} options.players.two
 * */
var Puck = function(options) {

  var self = this;

  self.size = 10;
  self.speed = PUCK_SPEED;

  self.position = null;
  self.angle = null;

  var checkLeftExit = function() { return self.position.x <= -self.size; };
  var checkRightExit = function() { return self.position.x + self.size >= GAME_WIDTH + self.size; };

  self.update = function(dt) {
    self.position.x += Math.cos(self.angle * DEG_TO_RAD) * self.speed * dt;
    self.position.y += Math.sin(self.angle * DEG_TO_RAD) * self.speed * dt;


    if(self.position.y <= CONTENT_OFFSET) {
      self.position.y = CONTENT_OFFSET;

      self.angle = 360 - self.angle;
    } else if(self.position.y + self.size >= GAME_HEIGHT - CONTENT_OFFSET) {
      self.position.y = GAME_HEIGHT - CONTENT_OFFSET - self.size;

      self.angle = 360 - self.angle;
    }

    if(checkLeftExit()) playerTwoScored();
    else if(checkRightExit()) playerOneScored();

    self.collidesWithPaddle(options.players.one);
    self.collidesWithPaddle(options.players.two);
  };
  self.render = function(ctx) {
    ctx.fillStyle = "#fff";
    ctx.fillRect(self.position.x, self.position.y, self.size, self.size);
  };

  /**
   * @param {Player} player
   * */
  self.collidesWithPaddle = function(player) {
    var xCheckZone = 5;

    var xPaddle = player.paddle.position.x + (player.other ? 0 : player.paddle.width);
    var xPuck = self.position.x + (player.other ? self.size : 0);

    if(self.position.y + self.size >= player.paddle.position.y &&
       self.position.y <= player.paddle.position.y + player.paddle.height &&
       xPuck <= xPaddle + (player.other ? xCheckZone : 0) &&
       xPuck >= xPaddle - (player.other ? 0 : xCheckZone)) {

      self.angle = 180 - self.angle;

      if(player.other) self.position.x = xPaddle - self.size - 1;
      else self.position.x = xPaddle + 1;

    }
  };

  var playerOneScored = function() {
    options.players.one.score();

    aPlayerScored();
  };

  var playerTwoScored = function() {
    options.players.two.score();

    aPlayerScored();
  };

  var aPlayerScored = function() {
      reset();
  };

  /** @type {function} */
  var reset;
  (reset = function() {
    self.position = new Point((GAME_WIDTH - self.size) / 2, (GAME_HEIGHT - self.size) / 2);
    self.angle = Math.random() * 90 - 45;
  })();

};