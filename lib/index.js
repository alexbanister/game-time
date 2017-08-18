const Render = require('./render.js');
const Brick = require('./brick.js');
const Ball = require('./ball.js');
const Player = require('./player.js');
const PowerUp = require('./powerUp.js');
const Level = require('./level.js');
const startScreen = require('./startScreen.js')
const Style = require('./style.css');

var canvas = document.getElementById('game');
var context = canvas.getContext('2d');

var player = new Player();
var level = new Level(3);
var level = new Level(3);
var ball = new Ball();
// var render = new Render();

function gameLoop () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  // level.drawBackground(context);
  level.drawLevel(context);
  player.drawPaddle(context);
  player.displayScore(context)
  player.displayLives(context, canvas);
  ball.makeBall(context);
  ball.checkForCollisionsWithBrick(level, player);
  ball.checkForCollisionsWithWall(canvas);
  ball.checkForCollisionsWithPaddle(player);
  ball.checkForGameOver(canvas, context, player);

  requestAnimationFrame(gameLoop);
}
//
canvas.addEventListener('mousemove', player.movePaddle.bind(player), false);
canvas.addEventListener('click', player.launchBall.bind(player, ball, canvas), false);

// canvas.addEventListener('mousemove', function(e) {
//   console.log(e.clientX)
// });

requestAnimationFrame(gameLoop);
