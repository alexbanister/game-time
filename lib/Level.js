const Brick = require('./Brick.js');

class Level {
  constructor (currentLevel = 1) {
    this.currentLevel = currentLevel;
    this.start = true;
    this.bricks = this.buildBricks();
    this.gameOver = false;
  }

  buildBricks () {
    let allBricks = [];
    let counter = 0;
    let x = 44;
    let y = 44;

    this.getLevelTemplate(this.currentLevel).forEach((i) => {
      let brick = new Brick(x, y, 75, 25, i);

      allBricks.push(brick);
      x += 76;
      counter++;
      if (counter === 12) {
        counter = 0;
        y = y + 26;
        x = 44;
      }
    });
    return allBricks
  }

  getBrickIndexs (hitBricks) {
    let theyGotHit = [];

    hitBricks.forEach((hitBrick) => {
      theyGotHit.push(this.bricks.findIndex((brick) => {
        return brick.x === hitBrick.x && brick.y === hitBrick.y;
      }));
    });
    return theyGotHit;
  }

  updateHitBricks (theyGotHit) {
    theyGotHit.forEach((i) => {
      this.bricks[i].density--;
    });
  }

  drawStartScreenText (context, canvas) {
    if (this.start === true) {
      context.font = "60px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Breakout", canvas.width / 2, 300);

      context.font = "20px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Welcome to Breakout", canvas.width / 2, 350);

      context.font = "20px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Your mouse controls the paddle", canvas.width / 2, 375);

      context.font = "20px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Click to start", canvas.width / 2, 400);
    }
  }

  drawLevel (context) {
    this.bricks.forEach((brick, i) => {
      if (brick.density < 1) {
        this.bricks[i] = '';
      }
      if (brick) {
        brick.makeBrick(context);
      }
    });
  }

  checkGameState (canvas, context, player, ball) {
    let activeBricks = this.bricks.filter((brick) => {
      return brick.density > 0 && brick.density < 10;
    });

    if (activeBricks.length === 0) {
      ball.velocityX = 0;
      ball.velocityY = 0;
      this.currentLevel++;
      this.bricks = this.buildBricks();
    }

    if (ball.y > canvas.height) {
      player.removeBall();
      ball.velocityX = 0;
      ball.velocityY = 0;
      canvas.classList.add('fail');
    }
    if (player.balls === 0) {
      this.gameOver = true;
      context.font = "60px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Game Over", canvas.width / 2, 300);

      context.font = "20px Monospace";
      context.fillStyle = "#BEC3C1";
      context.textAlign = "center";
      context.fillText("Click to start a new game", canvas.width / 2, 350);
    }
  }

  restartGame (ball, player) {
    if (this.gameOver === true) {
      this.gameOver = false;
      this.currentLevel = 1;
      this.bricks = this.buildBricks();
      player.score = 0;
      player.balls = 3;
      ball.velocityY = 0;
      ball.velocityX = 0;
    }
  }

  getLevelBackground () {
    let colors = [ '',
      'rgb(247, 123, 62)',
      'rgb(247, 62, 62)',
      'rgb(247, 62, 151)',
      'rgb(199, 62, 247)',
      'rgb(62, 64, 247)',
      'rgb(62, 153, 247)',
      'rgb(62, 247, 231)',
      'rgb(62, 247, 103)',
      'rgb(160, 247, 62)',
      'rgb(247, 234, 62)'
    ];
    let background = 'rgb(225, 225, 200)';

    if (colors[this.currentLevel]) {
      background = colors[this.currentLevel];
    }
    return background;
  }

  drawRandomLevel () {
    let randomLevel = [];

    for (var i = 0; i < 84; i++) {
      let brickDensity = Math.floor(Math.random() * this.currentLevel);

      randomLevel.push(brickDensity);
    }
    return randomLevel;
  }

  getLevelTemplate (level) {
    switch (level) {
    case 1:
      return [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ];
    case 2:
      return [
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1,
        1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1
      ];
    case 3:
      return [
        1, 1, 1, 2, 2, 1, 1, 2, 2, 1, 1, 1,
        1, 1, 2, 2, 2, 2, 2, 2, 2, 2, 1, 1,
        1, 2, 2, 2, 2, 3, 3, 2, 2, 2, 2, 1,
        1, 1, 2, 2, 3, 3, 3, 3, 2, 2, 1, 1,
        1, 1, 1, 2, 2, 3, 3, 2, 2, 1, 1, 1,
        1, 1, 1, 1, 2, 2, 2, 2, 1, 1, 1, 1,
        0, 0, 1, 1, 1, 2, 2, 1, 1, 1, 0, 0,
      ];
    case 4:
      return [
        4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
        4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
        4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
        4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
        4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
        4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
        4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
        4, 4, 4, 5, 5, 6, 6, 5, 5, 4, 4, 4,
        0, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 0
      ];
    case 5:
      return [
        5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
        5, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 5,
        5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 1, 5,
        5, 1, 5, 1, 1, 1, 1, 1, 1, 5, 1, 5,
        5, 1, 5, 1, 5, 5, 5, 5, 5, 5, 1, 5,
        5, 1, 5, 1, 1, 1, 1, 1, 1, 1, 1, 5,
        5, 1, 5, 5, 5, 5, 5, 5, 5, 5, 5, 5,
      ];
    case 6:
      return [
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0,
      ];
    case 7:
      return [
        8, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 8,
        0, 0, 0, 0, 10000, 3, 3, 10000, 0, 0, 0, 0,
        10000, 2, 2, 10000, 10000, 10000, 10000, 10000, 10000, 2, 2, 10000,
        10000, 0, 2, 2, 10000, 10000, 10000, 10000, 2, 2, 0, 10000,
        10000, 10000, 10000, 0, 0, 0, 0, 0, 0, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 0, 0, 0, 0, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 2, 2, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 10000, 0, 0, 10000, 10000, 10000, 10000, 10000,
        10000, 10000, 10000, 10000, 0, 0, 0, 0, 10000, 10000, 10000, 10000
      ];
    default:
      return this.drawRandomLevel();
    }
  }
}

module.exports = Level;
