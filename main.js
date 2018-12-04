//config
{
  //make variables
  {
    var walkerxdirection = "right";
    var timer = 0;
    var level = 0;
    var points = 0;
    //one level points required is used for something else than the other
    var levelPointsRequired = 0;
    var levelRequiredPoints = 0;
    var totalLevels = 10;
  }

  //create sprites
  //sprite: walker
  {
    var walker = createSprite(0,200,100,100);
    walker.setAnimation("walker");
  }
  //sprite: flier
  {
    var flier = createSprite(200,200,20,20);
    flier.setAnimation("flier");
    flier.visible = false;
  }
  //sprite: coin1
  {
    var coin1 = createSprite(200,200);
    var coin1Counted = false;
    coin1.setAnimation("coin");
    coin1.visible = false;
    coin1.setCollider("circle");
    coin1.scale = 0.5;
  }
  //sprite: coin2
  {
    var coin2 = createSprite(200,200);
    var coin2Counted = false;
    coin2.setAnimation("coin");
    coin2.visible = false;
    coin2.setCollider("circle");
    coin2.scale = 0.5;
  }
  //sprite: coin3
  {
    var coin3 = createSprite(200,200);
    var coin3Counted = false;
    coin3.setAnimation("coin");
    coin3.visible = false;
    coin3.setCollider("circle");
    coin3.scale = 0.5;
  }
  //sprite: coin4
  {
    var coin4 = createSprite(200,200);
    var coin4Counted = false;
    coin4.setAnimation("coin");
    coin4.visible = false;
    coin4.setCollider("circle");
    coin4.scale = 0.5;
  }
  walker.debug = true;
  flier.debug = true;
  coin1.debug = true;
  coin2.debug = true;
  coin3.debug = true;
  coin4.debug = true;
}

//draw loop
function draw() {
  if (level === 0) {
    background(rgb(29, 57, 102));
    //change direction
    if (walker.x < 48 && walkerxdirection === "left") {
      walkerxdirection = "right";
    } else if (walker.x > 352 && walkerxdirection === "right") {
      walkerxdirection = "left";
    }
    //move the walker
    if (walkerxdirection === "right") {
      walker.x = walker.x + 1;
    } else if (walkerxdirection === "left") {
      walker.x = walker.x - 1;
    }
    fill("white");
    textSize(20);
    //message
    if (timer < 100) {
      text("Time to walk", 125, 300);
    } else if (timer < 200 && timer > 100) {
      text("What should I do out here?", 100, 300);
    } else if (timer < 300 && timer > 200) {
      text("Maybe I'll just walk around.", 50, 300);
    } else if (timer < 400 && timer > 300) {
      text("Or maybe I'll fly!", 40, 300);
    } else if (timer < 500 && timer > 400) {
      background("white");
      walker.visible = false;
    }
    //advance timer
    timer++;
    console.log(timer);
    if (timer > 500) {
      level++;
      timer = 0;
    }
    flier.x = 200;
    flier.y = 200;
    //draw sprites
    drawSprites();
  } else if (level >= 1 && level <= totalLevels) {
    if (level === 1) levelRequiredPoints = 1;
    if (level === 2) levelRequiredPoints = 3;
    if (level === 3) levelRequiredPoints = 6;
    if (level === 4) levelRequiredPoints = 10;
    if (level === 5) levelRequiredPoints = 14;
    if (level === 6) levelRequiredPoints = 18;
    if (level === 7) levelRequiredPoints = 22;
    if (level === 8) levelRequiredPoints = 26;
    if (level === 9) levelRequiredPoints = 30;
    if (level === 10) levelRequiredPoints = 34;
    makeLevel(level, levelRequiredPoints);
  } else if (level > totalLevels) {
    progressLevel(totalLevels+1);
  }
  //if (level > totalLevels) {
    //progressLevel(0);
  //}
}

//create level
function makeLevel(currentLevel, requiredPoints) {
  levelPointsRequired = requiredPoints;
  sceneSetup();
  coins(currentLevel);
  progressLevel(currentLevel);
  drawSprites();
}

//create coins
function coins(currentLevel) {
  if (currentLevel === 1) {
    makeCoin1();
  } else if (currentLevel === 2) {
    makeCoin1();
    makeCoin2();
  } else if (currentLevel === 3) {
    makeCoin1();
    makeCoin2();
    makeCoin3();
  } else if (currentLevel >= 4) {
    makeCoin1();
    makeCoin2();
    makeCoin3();
    makeCoin4();
  }
}

//level progression
function progressLevel(currentLevel) {
  if (flier.y < 0) {
    level = currentLevel + 1;
    flier.x = 200;
    flier.y = 200;
    coin1Counted = false;
    coin2Counted = false;
    coin3Counted = false;
    coin4Counted = false;
  }
  if (currentLevel > totalLevels) {
    background("white");
    fill("red");
    textSize(20);
    text("Level incomplete.", 80, 200);
  }
}

//scene setup
function sceneSetup() {
  //setup
    flier.width = 75;
    flier.height = flier.width;
    flier.visible = true;
    background(rgb(117, 170, 255));
    
    //clouds
    fill("white");
    noStroke();
    ellipse(0,350,400,50);
    ellipse(200,350,400,50);
    ellipse(400,350,400,50);
    ellipse(0, 50, 400, 50);
    ellipse(200, 50, 400, 50);
    ellipse(400, 50, 400, 50);
    
    //points and level counter
    fill("brown");
    rect(0,0,60,30);
    fill("white");
    text("Level: "+level, 3, 15);
    text("Points: "+points, 3, 25);
    
    //move flier
    moveFlier();
}

//move the flier
function moveFlier() {
  if ((keyDown("left") || keyDown("a")) && flier.x > 0) {
    flier.velocityX = -5;
    flier.velocityY = 0;
  } else if ((keyDown("right") || keyDown("d")) && flier.x < 400) {
    flier.velocityX = 5;
    flier.velocityY = 0;
  } else if ((keyDown("up") || keyDown("w")) && (flier.y > 85 || points === levelPointsRequired)) {
    flier.velocityY = -4;
    flier.velocityX = 0;
  } else if ((keyDown("down") || keyDown("s")) && flier.y < 300) {
    flier.velocityY = 5;
    flier.velocityX = 0;
  } else {
    flier.velocityX = 0;
    if (flier.y < 300) {
      flier.velocityY = 1;
    } else {
      flier.velocityY = 0;
    }
  }
}

//code behind all the coins
function makeCoin1() {
  if (coin1.visible === false && coin1Counted === false) {
    coin1.visible = true;
    coin1.x = randomNumber(0,400);
    coin1.y = randomNumber(60, 300);
  } else if (coin1Counted === true) {
    coin1.visible = false;
  }
  if (flier.collide(coin1)) {
    points++;
    coin1.visible = false;
    coin1Counted = true;
    coin1.x = 500;
    coin1.y = 500;
  }
}
function makeCoin2() {
  if (coin2.visible === false && coin2Counted === false) {
    coin2.visible = true;
    coin2.x = randomNumber(0,400);
    coin2.y = randomNumber(60, 300);
  } else if (coin2Counted === true) {
    coin2.visible = false;
  }
  if (flier.collide(coin2)) {
    points++;
    coin2.visible = false;
    coin2Counted = true;
    coin2.x = 500;
    coin2.y = 500;
  }
}
function makeCoin3() {
  if (coin3.visible === false && coin3Counted === false) {
    coin3.visible = true;
    coin3.x = randomNumber(0,400);
    coin3.y = randomNumber(60, 300);
  } else if (coin3Counted === true) {
    coin3.visible = false;
  }
  if (flier.collide(coin3)) {
    points++;
    coin3.visible = false;
    coin3Counted = true;
    coin3.x = 500;
    coin3.y = 500;
  }
}
function makeCoin4() {
  if (coin4.visible === false && coin4Counted === false) {
    coin4.visible = true;
    coin4.x = randomNumber(0,400);
    coin4.y = randomNumber(60, 300);
  } else if (coin3Counted === true) {
    coin4.visible = false;
  }
  if (flier.collide(coin4)) {
    points++;
    coin4.visible = false;
    coin4Counted = true;
    coin4.x = 500;
    coin4.y = 500;
  }
}
