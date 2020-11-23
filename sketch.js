
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var foodGroup, obstaclesGroup
var score;
var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstaclesImage = loadImage("obstacle.png");
 
 
}



function setup() {
  
 
  survivalTime = 0;
  score=0;
  
  monkey=createSprite(60,315,10,10);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale=0.1;
  
  ground=createSprite(400,350,450,10);
  ground.velocityX=-4;
  ground.x=ground.width/2;
  
  foodGroup= new Group();
  
  obstaclesGroup= new Group();
  
}


function draw() {
  background("black");
  createCanvas(400,400);
  createEdgeSprites();
  
  if(ground.x<200){
    ground.x=ground.width/2;
  }  
  
  if(World.frameCount%80===0){
    spawnBananas();
  }
  
    if(World.frameCount%200===0){
     spawnObstacles();
  }
  
  if(keyDown("space")&&monkey.y>=314.3){
    monkey.velocityY=-18;
  }
  
  monkey.velocityY = monkey.velocityY+0.8;
  
  monkey.collide(ground);
  
  if(monkey.isTouching(obstaclesGroup)){
    monkey.velocityX=0;
    obstaclesGroup.destroyEach();
    foodGroup.destroyEach();
    score=0;
  }
  
  obstaclesGroup.debug=true;
  
  stroke("white");
  textSize(12);
  fill("black");
  text("Survival time : " + score, 200, 80)
  score=Math.ceil(frameCount/frameRate());
  
  drawSprites();
  
}


function spawnBananas(){

    banana=createSprite(450,200,10,10);
    banana.addImage("banana", bananaImage);
    banana.scale=0.1;
    banana.velocityX=-5;
    banana.y=Math.round(random(120,200))

    foodGroup.add(banana);

}

function spawnObstacles(){
    obstacle=createSprite(450,325,10,10);
    obstacle.addImage("obstacle", obstaclesImage);
    obstacle.scale=0.15;
    obstacle.velocityX=-3;
  
    obstaclesGroup.add(obstacle);
}