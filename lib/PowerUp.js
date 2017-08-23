const Render = require('./Render.js');

class powerUp extends Render {
  constructor (x, y, width, height, player) {
    super(x, y, width, height);
    this.powerUpList = [
      this.extraLife,
      this.smallPaddle,
      this.largePaddle,
      this.threeBalls,
      this.guns,
      this.wreckingBall,
      this.stickyPaddle
    ],
    this.powerUp = this.powerUpList[Math.floor(Math.random() * this.powerUpList.length)]
    this.context = document.getElementById('game').getContext('2d');
    this.player = player;
    this.velocity = (Math.random() * 1.5) + 1;
  }

  noPower () {

  }

  extraLife () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = "blue";
    this.context.fill();
    this.context.closePath();
    this.fallOffScreen ();
    this.y += this.velocity;
  }

  smallPaddle () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = "green";
    this.context.fill();
    this.context.closePath();
    this.fallOffScreen ();
    this.y += this.velocity;
  }

  largePaddle () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = "yellow";
    this.context.fill();
    this.context.closePath();
    this.fallOffScreen ();
    this.y += this.velocity;
  }

  threeBalls () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = "red";
    this.context.fill();
    this.context.closePath();
    this.fallOffScreen ();
    this.y += this.velocity;
  }

  guns () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = "purple";
    this.context.fill();
    this.context.closePath();
    this.fallOffScreen ();
    this.y += this.velocity;
  }

  wreckingBall () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = "grey";
    this.context.fill();
    this.context.closePath();
    this.fallOffScreen ();
    this.y += this.velocity;
  }

  stickyPaddle () {
    this.context.beginPath();
    this.context.rect(this.x, this.y, this.width, this.height);
    this.context.fillStyle = "dark blue";
    this.context.fill();
    this.context.closePath();
    this.fallOffScreen ();
    this.y += this.velocity;
  }

  fallOffScreen () {
    if (this.y > 600) {
      let thisIndex = this.player.currentPowerUps.findIndex((powerUp) => {
        return powerUp.x === this.x && powerUp.y === this.y;
      });

      this.player.currentPowerUps.splice(thisIndex, 1);
    }
  }
}
module.exports = powerUp;
