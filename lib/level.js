const Brick = require('./brick.js');
class Level {
  constructor (currentLevel = 1) {
    this.currentLevel = currentLevel;
    this.bricks = this.buildBricks();
  }

  buildBricks (){
    this.bricks = [];
    return this.getLevelTemplate(this.currentLevel).forEach((i) => {
      let counter = 0;
      let x = 10;
      let y = 10;
      let brick = new Brick(x, y, 75, 25, i);
      this.bricks.push(brick);
      x += 75;
      if (counter === 12) {
        counter = 0;
        y = x+25;
        x = 10;
      }
    });
    debugger;
  }

  drawLevel () {

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
          1, 1, 1, 1, 1, 2, 2, 1, 1, 1, 1, 1
        ];
    }

  }
}

module.exports = Level;
