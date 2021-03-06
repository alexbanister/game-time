const BuildingBlock = require('./BuildingBlock.js');

class powerUp extends BuildingBlock {
  constructor (x, y, width, height, player, context, ball) {
    super(x, y, width, height);
    this.powerUpList = [
      {
        fillStyle: 'green',
        power: this.extraLife,
        player,
        ball
      },
      {
        fillStyle: 'blue',
        power: this.smallPaddle,
        player,
        ball
      },
      {
        fillStyle: 'purple',
        power: this.largePaddle,
        player,
        ball
      },
      {
        fillStyle: 'orange',
        power: this.stickyPaddle,
        player,
        ball
      }
      // this.threeBalls,
      // this.guns,
      // this.wreckingBall,
    ],
    this.powerUp = this.powerUpList[Math.floor(Math.random() * this.powerUpList.length)]
    this.context = context;
    this.player = player;
    this.ball = ball;
    this.velocity = (Math.random() * 1.5) + 1;
  }

  drawPowerUp () {
    this.context.translate(this.x, this.y);
    this.context.save();
    this.context.beginPath();
    this.context.moveTo(26.0, 20.0);
    this.context.lineTo(10.0, 20.0);
    this.context.bezierCurveTo(4.5, 20.0, 0.0, 15.5, 0.0, 10.0);
    this.context.lineTo(0.0, 10.0);
    this.context.bezierCurveTo(0.0, 4.5, 4.5, 0.0, 10.0, 0.0);
    this.context.lineTo(26.0, 0.0);
    this.context.bezierCurveTo(31.5, 0.0, 36.0, 4.5, 36.0, 10.0);
    this.context.lineTo(36.0, 10.0);
    this.context.bezierCurveTo(36.0, 15.5, 31.5, 20.0, 26.0, 20.0);
    this.context.closePath();
    this.context.fillStyle = this.powerUp.fillStyle;
    this.context.fill();

    let gradient = this.context.createLinearGradient(18.0, 0.0, 18.0, 20.0);

    gradient.addColorStop(0.00, "rgba(255, 255, 255, 0.20)");
    gradient.addColorStop(0.18, "rgba(255, 255, 255, 0.50)");
    gradient.addColorStop(0.34, "rgba(255, 255, 255, 0.80)");
    gradient.addColorStop(0.54, "rgba(255, 255, 255, 0.45)");
    gradient.addColorStop(1.00, "rgba(255, 255, 255, 0.10)");
    this.context.fillStyle = gradient;
    this.context.fill();
    this.context.lineWidth = 0.5;
    this.context.stroke();
    this.context.restore();
    this.context.translate(-this.x, -this.y);

    this.y += this.velocity;
    this.hitPaddle ();
    this.fallOffScreen ();
  }

  removePowerUp () {
    this.player.scale = 1;
    this.player.width = 100;
    this.ball.sticky = false;
  }

  extraLife () {
    this.player.balls++;
  }

  smallPaddle () {
    this.player.scale = this.player.scale / 2
    this.player.width = this.player.width / 2;
  }

  largePaddle () {
    this.player.scale = this.player.scale * 2;
    this.player.width = this.player.width * 2;

  }

  stickyPaddle () {
    this.ball.sticky = true;
  }

  // threeBalls (canvas, level, render) {
  //   let ball2 = new Ball(this.player.x + (this.player.width / 2), this.player.y - 12, 10, 10, 1.8);
  //   let ball3 = new Ball(this.player.x + (this.player.width / 2), this.player.y - 12, 10, 10, -1.8);
  //
  //   render.makeBall(this.context, ball2);
  //   render.makeBall(this.context, ball3);
  //   ball2.checkForCollisionsWithBrick(level, this.player);
  //   ball2.checkForCollisionsWithWall(canvas.width);
  //   ball2.checkForCollisionsWithPaddle(this.player);
  //   ball3.checkForCollisionsWithBrick(level, this.player);
  //   ball3.checkForCollisionsWithWall(canvas.width);
  //   ball3.checkForCollisionsWithPaddle(this.player);
  //
  //   this.context.beginPath();
  //   this.context.rect(this.x, this.y, this.width, this.height);
  //   this.context.fillStyle = "red";
  //   this.context.fill();
  //   this.context.closePath();
  //   this.hitPaddle ();
  //   this.fallOffScreen ();
  //   this.y += this.velocity;
  // }
  //
  // guns () {
  // }
  //
  // wreckingBall () {
  // }

  fallOffScreen () {
    if (this.y > 600) {
      let thisIndex = this.player.currentPowerUps.findIndex((powerUp) => {
        return powerUp.x === this.x && powerUp.y === this.y;
      });

      this.player.currentPowerUps.splice(thisIndex, 1);
    }
  }

  hitPaddle () {
    if (this.y + this.height >= this.player.y &&
        this.y <= this.player.y + this.player.height &&
        this.x + this.width >= this.player.x &&
        this.x <= this.player.x + this.player.width) {
      let thisIndex = this.player.currentPowerUps.findIndex((powerUp) => {
        return powerUp.x === this.x && powerUp.y === this.y;
      });

      this.player.activePowerUp = this.player.currentPowerUps.splice(thisIndex, 1);
      this.removePowerUp();
      this.powerUp.power();
      return true;
    } else {
      return false;
    }
  }
}
module.exports = powerUp;
