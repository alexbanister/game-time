const Render = require('./render.js');

class Ball extends Render {
  constructor (x = 440, y = 555, width, height, velocity = -1.8) {
    super(x, y, width, height);
    this.velocityX = velocity;
    this.velocityY = velocity;
  }

  makeBall(context) {
    context.save();
    context.translate(this.x, this.y);
    context.beginPath();
    context.moveTo(9.5, 4.8);
    context.bezierCurveTo(9.5, 7.4, 7.4, 9.5, 4.8, 9.5);
    context.bezierCurveTo(2.2, 9.5, 0.1, 7.4, 0.1, 4.8);
    context.bezierCurveTo(0.1, 2.2, 2.2, 0.1, 4.8, 0.1);
    context.bezierCurveTo(7.4, 0.1, 9.5, 2.2, 9.5, 4.8);
    context.closePath();
    let gradient = context.createRadialGradient(3.2, 3.2, 0.0, 3.2, 3.2, 7.6);

    gradient.addColorStop(0.52, "rgb(255, 255, 255)");
    gradient.addColorStop(0.76, "rgb(127, 127, 127)");
    gradient.addColorStop(1.00, "rgb(0, 0, 0)");
    context.fillStyle = gradient;
    context.fill();
    context.lineWidth = 0.2;
    context.stroke();
    context.translate(-this.x, -this.y);
    this.x += this.velocityX;
    this.y += this.velocityY;
    context.restore();
  }

  checkForCollisionsWithBrick (level) {
    if (this.y > 400) {
      return;
    }
    let hitDatShiz = level.bricks.filter((brick) => {
      return (brick.y + 25 >= this.y) &&
             (brick.y <= this.y + 10) &&
             (brick.x + 75 >= this.x) &&
             (brick.x <= this.x + 10);
    });

    if (hitDatShiz.length > 0) {
      var theyGotHit = [];

      hitDatShiz.forEach((hitBrick, i) => {
        console.log('brick Y ', hitBrick.y);
        console.log('ball Y ', this.y + 10);
        if ((hitBrick.y + 25 == this.y) || (hitBrick.y == this.y + 10)) {
          this.velocityY = this.velocityY * -1;
        }
      });

      hitDatShiz.forEach((hitBrick, i) => {
        theyGotHit.push(level.bricks.findIndex((brick) => {
          return brick.x === hitBrick.x && brick.y === hitBrick.y;
        }));
      });
      theyGotHit.forEach((i) => {
        level.bricks[i];
        level.bricks[i].density += -1;
      });
    }
  }

  checkforCollisionsWithWall (canvas) {
    if (this.y <= 0) {
      this.velocityY = this.velocityY * -1;
    }
    if (this.x <= 0 || this.x + 10 >= canvas.width) {
      this.velocityX = this.velocityX * -1;
    }
  }

  checkforCollisionsWithPaddle (player) {
    if (this.y + 10 === player.y && (this.x + 10 > player.x && this.x < player.x + player.width)) {
      this.velocityY += .1;
      this.velocityX += .1;
      this.velocityY = this.velocityY * -1;
    }
  }
}

module.exports = Ball;
