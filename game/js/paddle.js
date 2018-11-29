
/**
 * @param {Player} player
 * @param {object} options
 * */
var Paddle = function(player, options) {
  var self = this;

  self.width = 10;
  self.height = 150;

  self.position = new Point(player.other ? GAME_WIDTH - CONTENT_OFFSET - self.width : CONTENT_OFFSET, CONTENT_OFFSET);
  self.speed = PADDLE_SPEED;

  self.upKey = options.upKey;
  self.downKey = options.downKey;

  self.update = function(dt) {
    if(Keyboard.Keys[self.upKey] >= Keyboard.State.Pressed) self.position.y -= self.speed * dt;
    if(Keyboard.Keys[self.downKey] >= Keyboard.State.Pressed) self.position.y += self.speed * dt;

    self.position.y = clamp(self.position.y, CONTENT_OFFSET, GAME_HEIGHT - CONTENT_OFFSET - self.height);
  };

  self.render = function(ctx) {
    ctx.fillStyle = "#fff";

    ctx.fillRect(self.position.x, self.position.y, self.width, self.height);
  };
};