var score = 0;
var milleniumFalcon, imperialTroop, laser, background, tatooine;
var mfImage, laserImage, imperialTroopImage, tatooineImage, backgroundImg;
var lasers = [];
var imperialTroops = [];
var life = 5;
var gameState = 0;

function preload() {
  mfImage = loadImage("PC.png");
  laserImage = loadImage("laser.png");
  imperialTroopImage = loadImage("enemyShip.png");
  tatooineImage = loadImage("tatooine.png");
}
function setup() {
  createCanvas(windowWidth,windowHeight);

  tatooine = createSprite(width+310,height/2,10,10);
  tatooine.addImage(tatooineImage);
  tatooine.scale = 5;

  milleniumFalcon = createSprite(width-280,height/2,30,30);
  milleniumFalcon.addImage(mfImage);
  milleniumFalcon.scale = 0.4;

  //laserGroup = new Group();
  //imperialTroopGroup = new Group();
}

function draw() {
  background("black"); 

  if (gameState == 0) {
    push();
    fill("gold");
    textSize(50);
    text("Lives: "+life, width-300, 50);
    text("Score: "+score, width-300, 793); 
    pop();

    move();
    if(keyDown("space")) {
      shoot();
    }
    if(frameCount % 60 == 0) {
      createEnemies();
    }
    collideFunction();
  }

  drawSprites();

}

function createEnemies() {
  imperialTroop = createSprite(0, random(50, height), 10, 10);
  imperialTroop.addImage(imperialTroopImage);
  imperialTroop.scale = 0.2;
  imperialTroop.velocityX = 10;
  imperialTroops.push(imperialTroop);
}

function shoot() {
  laser = createSprite(width-280,height,30,30)
  laser.y = milleniumFalcon.y;
  laser.x = milleniumFalcon.x - 100;
  laser.addImage(laserImage);
  laser.scale = 0.2;
  laser.velocityX = -10;
  laser.lifetime = width;
  lasers.push(laser);
}

function move() {
  if(keyDown("UP")) {
    milleniumFalcon.y -= 5;
  }
  if(keyDown("DOWN")) {
    milleniumFalcon.y += 5;
  }
}

function collideFunction() {
  for(var i = 0; i<imperialTroops.length; i++) {
    for(var x = 0; x<lasers.length; x++) {
      if(imperialTroops[i].isTouching(lasers[i])) {
        console.log("hello");
        lasers[x].destroy();
        imperialTroops[i].destroy();
      }
    }
  }
}

function gameOverAndLifeReduction() {
  if (life > 0) {
    life -= 1;
    // destruction of one ship
  }

  else if (life == 0) {
    gameState = 1;
      swal({
      title: `Game Over!`,
      text: "you lost, loser.",
      text: "score: " + score,
      imageUrl: "https://cdn.shopify.com/s/files/1/1061/1924/products/Thumbs_Down_Sign_Emoji_Icon_ios10_grande.png",
      imageSize: "100x100",
      confirmButtonText: "thanks for playing, bot" 
    })
  }
}