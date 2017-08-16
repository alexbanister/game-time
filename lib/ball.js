const Render = require('./render.js');

class Ball extends Render {
  constructor (x, y, width, height, velocity = 1) {
    super(x, y, width, height);
    this.velocity = velocity;
  }

  makeBall (context){

  }

  moveBall () {
    this.x += this.velocity;
  }

  checkForCollisionsWithBrick () {
    if (this.x > 400) {
      return;
    }
    let hitDatShiz = level.bricks.filter((brick) => {
      return (brick.x + 25 >= this.x) &&
             (brick.x <= this.x + 10) &&
             (brick.y + 75 >= this.y) &&
             (brick.y <= this.y + 10);
    });
    if (hitDatShiz.length > 0) {
      var theyGotHit = [];
      hitDatShiz.forEach((hitBrick, i) => {
        theyGotHit.push(level.bricks.findIndex((brick) => {
          return brick.x === hitDatShiz[i].x && brick.y === hitDatShiz[i].y;
        }));
      });
      theyGotHit.forEach((i) => {
        level.bricks[i].density--;
      });
    }
  }

  doTheBallThing(context){
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
      this.x += this.xDir;
      this.y += this.yDir;
  }
}

module.exports = Ball;
