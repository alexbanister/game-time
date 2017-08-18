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
var level = new Level(3);
var brick = new Brick(10, 100, 75, 25);
var level = new Level(5);
var ball = new Ball();
// var render = new Render();

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // level.drawBackground(context);
  level.drawLevel(context);
  player.drawPaddle(context);
  ball.checkForCollisionsWithBrick(level);
  ball.checkforCollisionsWithWall(canvas);
  ball.checkforCollisionsWithPaddle(player);
  ball.makeBall(context);
  // ball.doTheBallThing(context);
  requestAnimationFrame(gameLoop);
}
//
canvas.addEventListener('mousemove', player.movePaddle.bind(player), false);

// canvas.addEventListener('mousemove', function(e) {
//   console.log(e.clientX)
// });

requestAnimationFrame(gameLoop);
