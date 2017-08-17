const Render = require('./render.js');
const Brick = require('./brick.js');
const Ball = require('./ball.js');
const Player = require('./player.js');
const PowerUp = require('./powerUp.js');
const Level = require('./level.js');
const Style = require('./style.css');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var player = new Player();
<<<<<<< HEAD
var level = new Level(3);
=======
var brick = new Brick(10, 100, 75, 25);
var level = new Level(1);
var ball = new Ball();
// var render = new Render();
// var ball = new Ball(10, 10, 10, 10);
>>>>>>> 5a1fb57efec000fa2447a6092a53d481ac8f9549

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // level.drawBackground(context);
  level.drawLevel(context);
  ball.makeBall(context);
  player.drawPaddle(context);
  ball.checkForCollisionsWithBrick(level);
  ball.checkforCollisionsWithWall(canvas);
  ball.checkforCollisionsWithPaddle(player);
  // ball.doTheBallThing(context);
  requestAnimationFrame(gameLoop);
}
//
canvas.addEventListener('mousemove', player.movePaddle.bind(player), false);

// canvas.addEventListener('mousemove', function(e) {
//   console.log(e.clientX)
// });

requestAnimationFrame(gameLoop);
