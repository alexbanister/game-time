const Render = require('./render.js');

// let width = 75;
// let height = 25;
// let x = (game.width - width)/2;
// let y = (game.height - height);

class Player extends Render {
  constructor (x = 450, width = 100, height = 20, score = 0, balls = 3, powerUp) {
    super(x, 565, width, height);
    this.score = score;
    this.balls = balls;
    this.powerUp = powerUp;
  }

  drawPaddle(context) {
    context.beginPath();
    context.rect(this.x, this.y, this.width, this.height);
    context.fillStyle = "black";
    context.fill();
    context.closePath();
  }

  movePaddle(context) {

  }

  increaseScore () {

  }

  addBall () {

  }

  removeBall () {

  }
}

module.exports = Player;
