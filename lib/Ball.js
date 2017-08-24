const Render = require('./Render.js');

class Ball extends Render {
  constructor (x, y, width = 10, height = 10, velocity = 0) {
    super(x, y, width, height);
    this.velocityX = velocity;
    this.velocityY = velocity;
    this.sticky = false;
  }

  stickyBall(player) {
    if (this.velocityX === 0 && this.velocityY === 0) {
      this.x = player.x + ((player.width / 2) - (this.width / 2));
      this.y = 553;
    }
  }

  checkAllBricks (level) {
    return level.bricks.filter((brick) => {
      return (brick.y + 25 >= this.y) &&
             (brick.y <= this.y + 10) &&
             (brick.x + 75 >= this.x) &&
             (brick.x <= this.x + 10);
    });
  }

  bounceBall (hitBricks) {
    if (((hitBricks[0].y < this.y + 10) && (hitBricks[0].y > this.y)) ||
    ((hitBricks[0].y + 25 > this.y) && (hitBricks[0].y + 25 < this.y + 10))) {
      this.velocityY = this.velocityY * -1;
    }
    if (((hitBricks[0].x < this.x + 10) && (hitBricks[0].x > this.x)) ||
        ((hitBricks[0].x + 25 > this.x) && (hitBricks[0].x + 25 < this.x + 10))) {
      this.velocityX = this.velocityX * -1;
    }
  }

  checkForCollisionsWithBrick (level, player, context) {
    let hitBricks = this.checkAllBricks(level);

    if (hitBricks.length > 0) {
      player.checkForPowerUp(hitBricks, context, this);
      this.bounceBall(hitBricks);
      level.updateHitBricks(level.getBrickIndexs(hitBricks))
      player.increaseScore(level.getBrickIndexs(hitBricks))
    }
  }

  checkForCollisionsWithWall (width) {
    if (this.y <= 0) {
      this.velocityY = this.velocityY * -1;
    }
    if (this.x <= 0 || this.x + 10 >= width) {
      this.velocityX = this.velocityX * -1;
    }
  }

  checkForCollisionsWithPaddle (player) {
    if ((this.y + 10 > player.y - 1 &&
         this.y + 10 < player.y + 2) &&
        (this.x + 10 > player.x &&
         this.x < player.x + player.width)) {
      this.checkForSticky(player);
      return true;
    } else {
      return false;
    }
  }

  checkForSticky (player) {
    if (this.sticky) {
      this.velocityX = 0;
      this.velocityY = 0;
    } else {
      this.velocityY += .1;
      this.velocityX = (this.x - player.x - (player.width / 2)) / (player.width / 8);
      this.velocityY = this.velocityY * -1;
    }
  }
}

module.exports = Ball;
