const Render = require('./render.js');

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

  movePaddle(e) {
    var canvas = document.getElementById('game');
    this.x = e.clientX - this.width / 2;
    if (this.x < 10) {
      this.x = 10;
    } else if (this.x > canvas.width - this.width) {
      this.x = canvas.width - (this.width + 10);
    }

  }

  displayLives(context) {
    let lives = 3;
    context.font = "16px Monospace";
    context.fillStyle = "black";
    context.fillText("Lives: " + lives, (canvas.width/2), 20);
  }

  increaseScore () {

  }

  addBall () {

  }

  removeBall () {

  }


}

module.exports = Player;
