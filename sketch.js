var PLAY = 1
var END = 0
var gameState = PLAY;

var bird, birdflying, birdgroup;
var plane, planeImage
var sky, skyImage
var cloud, cloud1, cloud2, cloudgroup
var block

var edges;


function preload() {

  birdflying = loadAnimation("bird1.png", "bird2.png", "bird3.png", "bird4.png");

  planeImage = loadImage("plane1.png");

  skyImage = loadImage("sky.jpg");

  cloud1 = loadImage("cloud1.png");
  cloud2 = loadImage("cloud2.png");





}



function setup() {
  createCanvas(windowWidth, windowHeight);

  sky = createSprite(300, 300);
  sky.addImage("sky", skyImage);
  sky.x = sky.width / 2;
  //sky.scale = 0.8;
  sky.velocityX = -5;

  plane = createSprite(150, 200, 20, 20);
  plane.addImage("plane", planeImage);
  plane.scale = 0.3;
  //plane.debug = true;

  block = createSprite(150, 300, 150, 10);
  block.lifetime = 100;
  block.visible = false;
  edges = createEdgeSprites();

  cloudgroup = new Group();
  birdgroup = new Group();

}

//draw function

function draw() {
  background("skyImage");

  if (gameState === PLAY) {
    plane.bounceOff(edges[2]);

    if (sky.x < 200) {
      sky.x = sky.width / 2;

    }

    if (keyDown("space")) {
      plane.velocityY = -5;
    }
    plane.velocityY = plane.velocityY + 0.8;
    plane.collide(block)

    spawnClouds();
    spawnBirds();

    if(plane.isTouching(birdgroup)||plane.y > 600){
      gameState = END;
    }

    drawSprites();
  }
  //end of play state
  if(gameState===END){
    background("black")
    plane.destroy();
    stroke("white");
    fill("white");
    textSize(40);
    text("You Lost Better luck Next time:(", width/4, height/2)
  }
}

function spawnClouds() {
  if (frameCount % 125 === 0) {
    cloud = createSprite(width+10, 50, 10, 10);
    cloud.y = Math.round(random(50, height-50));
    cloud.velocityX = -3;
    var choice = Math.round(random(1, 2));
    if (choice === 1) {
      cloud.addImage("cloud1", cloud1);
      cloud.scale = 0.4;

    }
    if (choice === 2) {
      cloud.addImage("cloud2", cloud2);
      cloud.scale = 0.4;
    }
    cloud.lifetime = 220;
    cloudgroup.add(cloud)
  }
}

function spawnBirds() {
  if (frameCount % 100 === 0) {
    bird = createSprite(width+10, 200, 20, 20);
    bird.y = Math.round(random(50, height-50));
    bird.addAnimation("flying", birdflying);
    bird.scale = 0.7;
    bird.velocityX = -3

    bird.mirrorX(bird.mirrorX() * -1);
    birdgroup.add(bird);
    

  }
}