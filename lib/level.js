class Level {
  constructor (currentLevel) {
    this.currentLevel = currentLevel || 1;
  }

  brickContainer () {
    let bricks = [];

    function getBricks () {
	       return bricks;
    }
    function hitBrick (index) {
	       bricks[index].desity--;
    }

    let gate = {
  	  getBricks,
      hitBrick
    };

    return gate;
  })();

  buildLevel (context){

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
