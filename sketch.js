var caballero;
var caballeroImg;
var bruja;
var brujaImg;
var bosque;
var obstaculos;
var bolafuego;
var bolasenergias;
var tronco;
var obstaculosgroup;

var PLAY = 1;
var END = 0;

var gameState = PLAY;

var score=0;

var gameOver, restart;


function preload() {
  caballeroImg = loadImage("assets/caballero.png");
  brujaImg = loadImage("assets/bruja.png");
  bosque = loadImage("assets/bosque.png");
  bolafuego = loadImage("assets/bolafuego.png");
  bolasenergias = loadImage("assets/bolasenergia.png");
  tronco = loadImage("assets/tronco.png");
  gameOverImg = loadImage("assets/gameOver.png");
  restartImg = loadImage("assets/restart.png");
}


function setup() {
  createCanvas(800,400);
  caballero = createSprite(130, 330, 50, 50);
  caballero.addImage("caballero",caballeroImg);
  caballero.scale = 0.10;

  bruja = createSprite(700,80,40,40);
  bruja.addImage("bruja",brujaImg);
  bruja.scale = 0.35;

  invisibleGround = createSprite(400,350,1600,10);
  invisibleGround.visible = false;

  gameOver = createSprite(400,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(550,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.1;

  gameOver.visible = false;
  restart.visible = false;

  obstaculosgroup = createGroup();

  score = 0;
}

function draw() {
  background(bosque);    

  if(frameCount % 60 === 0||frameCount % 150 === 0||frameCount % 250 === 0){
    obstaculosgenerator();
  
  }

  if (gameState===PLAY){

  console.log(caballero.y)

  if(keyDown("space")&& caballero.y>270) {
    caballero.velocityY = -16;
  }

  caballero.velocityY = caballero.velocityY + 0.95;
  caballero.collide(invisibleGround);

  if(obstaculosgroup.isTouching(caballero)){
    gameState = END;
  }

  }
  else if (gameState === END) {
    
    caballero.velocityY = 0;
    gameOver.visible = true;
    restart.visible = true;
    caballero.velocityY = 0;
    obstaculosgroup.setVelocityXEach(0); 
    obstaculosgroup.setLifetimeEach(-1);

      
    if(mousePressedOver(restart)) {
      reset();
  }   
 }
 else if (gameState === WIN) {
  caballero.velocityX = 0;
  obstaculosgroup.setVelocityXEach(0);
  obstaculosgroup.setLifetimeEach(-1);
  
}

  drawSprites();
  
  textSize(20);
  stroke(3);
  fill("black")
  text("Puntuación: "+ score);
  
  if(score >= 10){
    caballero.visible = false;
    textSize(30);
    stroke(3);
    fill("black");
    text("¡Felicidades! ¡Atrapaste a la bruja! ", 70,200);
    gameState = WIN;
  }
}

function obstaculosgenerator(){

  obstaculos = createSprite(random(600,1500),330,30,30);
 
  var rand = Math.round(random(1,3));

  switch(rand){
    case 1: obstaculos.addImage("bolafuego",bolafuego);
      break;
    case 2: obstaculos.addImage("bolasenergia",bolasenergias);
      break;
    case 3: obstaculos.addImage("tronco",tronco);
      break;
    default: break;  
  }

  obstaculos.scale = 0.10;
  obstaculos.velocityX = -15;
  obstaculos.lifetime = 200;
  obstaculosgroup.add(obstaculos);


}


function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  caballero.visible = true;
  obstaculosgroup.destroyEach();
  score = 0;
}