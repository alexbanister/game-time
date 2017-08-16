class Ball {
  constructor (x, y, width, height, velocity) {
    super(x, y, width, height);
    this.velocity = velocity || 1;
  }

  makeBall (context){

  }

  moveBall () {

  }

  checkForCollisions () {

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
