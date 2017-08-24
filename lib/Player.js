const Render = require('./Render.js');
const PowerUp = require('./PowerUp.js');

class Player extends Render {
  constructor (x = 450, width = 100, height = 20, score = 0, balls = 3) {
    super(x, 565, width, height);
    this.score = score;
    this.balls = balls;
    this.scale = 1;
    this.currentPowerUps = [];
    this.activePowerUp;
  }

  checkForPowerUp (bricks, context) {
    bricks.forEach( (brick) => {
      if (Math.random() > .9 && brick.density === 1) {
        this.currentPowerUps.push(new PowerUp (brick.x + 17, brick.y, 36, 20, this, context, ball));
      }
    });
}

  removePowerUp (powerUp) {
    let thisIndex = this.currentPowerUps.findIndex((powerUpFromArray) => {
      return powerUp.x === powerUpFromArray.x && powerUp.y === powerUpFromArray.y;
    });

    this.currentPowerUps.slice(thisIndex, 1);
  }

  movePaddle(canvas, e) {
    this.x = e.layerX - this.width / 2;
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

  increaseScore (theyGotHit) {
    theyGotHit.forEach(() => {
      this.score++;
    });
  }

  removeBall () {
    this.balls--;
  }
}

module.exports = Player;
