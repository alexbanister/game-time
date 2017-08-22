const Render = require('./Render.js');

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

  movePaddle(canvas, e) {
    this.x = e.clientX - this.width / 2;
    if (this.x < 10) {
      this.x = 10;
    } else if (this.x > canvas.width - (this.width + 10)) {
      this.x = canvas.width - (this.width + 10);
    }
  }

  launchBall (ball, level, canvas) {
    level.start = false;
    if (ball.velocityX === 0 && ball.velocityY === 0) {
      ball.velocityX = -1.8;
      ball.velocityY = -1.8;
    }
    canvas.classList.remove('fail');
  }

  displayLives(context) {
    context.font = "16px Monospace";
    context.fillStyle = "black";
    context.textAlign = "left"
    context.fillText("Lives: " + this.balls, 15, 25);
  }

  displayLevel(context, level, canvas) {
    context.font = "16px Monospace";
    context.fillStyle = "black";
    context.textAlign = "center"
    context.fillText("Level: " + level.currentLevel, canvas.width / 2, 25);
  }

  displayScore(context, canvas) {
    context.font = "16px Monospace";
    context.fillStyle = "black";
    context.textAlign = "right"
    context.fillText("Score: " + this.score, canvas.width - 15, 25);
  }

  increaseScore (theyGotHit) {
    theyGotHit.forEach(() => {
      this.score++;
    });
  }

  addBall () {

  }

  removeBall () {
    this.balls--;
  }


}

module.exports = Player;
