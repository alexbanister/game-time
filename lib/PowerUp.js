const Render = require('./Render.js');
const Ball = require('./Ball.js');

class powerUp extends Render {
  constructor (x, y, width, height, player) {
    super(x, y, width, height);
    this.powerUpList = [
      {
        fillStyle: 'green',
        power: this.extraLife,
        arg: player
      },
      {
        fillStyle: 'blue',
        power: this.smallPaddle,
        arg: player
      },
      {
        fillStyle: 'purple',
        power: this.largePaddle,
        arg: player
      }
      // this.threeBalls,
      // this.guns,
      // this.wreckingBall,
      // this.stickyPaddle
    ],
    this.powerUp = this.powerUpList[Math.floor(Math.random() * this.powerUpList.length)]
    this.context = document.getElementById('game').getContext('2d');
    this.player = player;
    this.velocity = (Math.random() * 1.5) + 1;
  }

  drawPowerUp () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = this.powerUp.fillStyle;
    this.context.fill();
    this.context.closePath();
    this.y += this.velocity;
    this.hitPaddle ();
    this.fallOffScreen ();
  }

  removePowerUp () {
    this.player.width = 100;
  }

  extraLife () {
    this.arg.balls++;
  }

  smallPaddle () {
    this.arg.width = this.arg.width / 2;
  }

  largePaddle () {
    this.arg.width = this.arg.width * 1.5;
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
  //   this.context.beginPath();
  //   this.context.rect(this.x, this.y, this.width, this.height);
  //   this.context.fillStyle = "purple";
  //   this.context.fill();
  //   this.context.closePath();
  //   this.hitPaddle ();
  //   this.fallOffScreen ();
  //   this.y += this.velocity;
  // }
  //
  // wreckingBall () {
  //   this.context.beginPath();
  //   this.context.rect(this.x, this.y, this.width, this.height);
  //   this.context.fillStyle = "grey";
  //   this.context.fill();
  //   this.context.closePath();
  //   this.hitPaddle ();
  //   this.fallOffScreen ();
  //   this.y += this.velocity;
  // }

  // stickyPaddle () {
  //   //Build ball array
  //   if ((this.y + 10 > this.arg.y - 1 &&
  //        this.y + 10 < this.arg.y + 2) &&
  //       (this.x + 10 > this.arg.x &&
  //        this.x < this.arg.x + this.arg.width)) {
  //     ball.velocityY = 0;
  //     ball.velocityX = 0;
  //   }
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
    }
  }
}
module.exports = powerUp;
