/**
 * @param {object} options
 * @param {object} options.paddleOptions
 * @param {boolean} [options.other]
 * */
var Player = function(options) {
  var self = this;

  self.other = options.other;
  self.paddle = new Paddle(self, options.paddleOptions);

  var score = 0;
  self.score = function () {
    score++;
  };

  self.getScore = function() {
    return score;
  };

  self.update = function (dt) {
    self.paddle.update(dt);
  };

  self.render = function (ctx) {
    self.paddle.render(ctx);
  };
};