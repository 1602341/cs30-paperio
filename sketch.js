// Major Project: Paper.io
// Natalie Woo
// January 00, 2024
//
// Extra for Experts:
// - flood fill
//
// Flood Fill:
// https://gist.github.com/syphh/8cbad50acb2e0f4ca60ef041814c271b
// https://codeguppy.com/code.html?ayLSdMZfjz8aJRGU7KfL
// https://www.youtube.com/watch?v=VuiXOc81UDM
// https://editor.p5js.org/micuat/sketches/xzRtK385
//
// Pixels:
// https://p5js.org/reference/#/p5/pixels

// let 0 = white
// let 8 = trail pink
// let 4 = block pink
// let 9 = red
// let 3 = blue
// let 2 = black
// let 5 = grey

let gridOne;
let gridTwo;
let gap;
let cellSize;
let bob;
//let state = "blank";
let x;
let y;
let newColor;
let logo;
let startBackground;
let endBoom;
let gameMusic;
let playerX = 0;
let playerY = 0;
let aiX = 40;
let aiY = 0;
const GRID_SIZE = 50;
let gameMode = "start screen";
let flood = "false";
let score = 0;
let ballArray = [];
let areaX = 0;
let areaY = 0;

class Character {
  constructor (x, y, color, colorValue, trail, trailValue, ai, aiValue, landWidth, landHeight) {
    this.x = x;
    this.y = y;
    this.color = color;
    this.colorValue = colorValue;
    this.trail = trail;
    this.trailValue = trailValue;
    this.ai = ai;
    this.aiValue = aiValue;
    this.landWidth = landWidth;
    this.landHeight = landHeight;
  }
  display() {
    if (gameMode === "game") {
      for (let y = 0; y < GRID_SIZE; y++) { 
        for (let x = 0; x < GRID_SIZE; x++) {
          if (gridOne[y][x] === 2) {
            fill(this.ai);
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
          else if (gridOne[y][x] === 5) {
            fill(this.trail);
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
          else if (gridOne[y][x] === 8) {
            fill("pink");
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
          else if (gridOne[y][x] === 4) {
            fill(255, 0, 70, 100);
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
          else if (gridOne[y][x] === 9) {
            fill("red");
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
          else if ((x >= this.landWidth) && (y <= this.landHeight)) {
            fill(this.color);
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
            gridOne[y][x] = 3;
          }
        }
      }
    }
  }

  move(aiX, aiY) {
    if (aiX + this.x >= 0 && aiX + this.x < GRID_SIZE && aiY + this.y >= 0 && aiY + this.y < GRID_SIZE) {
        if (((gridOne[(aiY + this.y) - 1][aiX + this.x] === this.color) 
        || (gridOne[aiY + this.y][(aiX + this.x) - 1] === this.color) 
     )) {
          flood = "true";
      }
      if ((gridOne[aiY + this.y][aiX + this.x] === 0) || (gridOne[aiY + this.y][aiX + this.x] === this.color)) {
        let tempX = aiX;
        let tempY = aiY;
        aiX += this.x;
        aiY += this.y;
        //update grid
        gridOne[aiY][aiX] = this.aiValue;
        gridOne[tempY][tempX] = this.trailValue;
      }
      else if ((gridOne[aiY + this.y][aiX + this.x] === this.trailValue)) {
        endBoom.play();
        endScreen();
      }
    }
  }
  // keyPressed() {
  //   if (key === "j") {//s
  //     move(0, 1);
  //   }
  //   else if (key === "u") {//w
  //     move(0, -1);
  //   }
  //   else if (key === "h") {//a
  //     move(-1, 0);
  //   }
  //   else if (key === "k") {//d
  //     move(1, 0);
  //   }
  // }
}

function preload() {
  logo = loadImage("paperio.png");
  startBackground = loadImage("paperio-background.png")
  endBoom = loadSound("endBoom.wav");
  gameMusic = loadSound("background-sound.mp3")
}

function setup() {
  new Canvas("1.5: 1.5");
  gridOne = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  gridOne[playerY][playerX] = 9;
  gridOne[aiY][aiX] = 2;
  rules = new Sprite(width - GRID_SIZE * 2, height - GRID_SIZE, GRID_SIZE + width/8, GRID_SIZE);
  // rules = createSelect();
  // rules.position(20, 20);
  // rules.option('VIEW RULES');
  // rules.option('Welcome to Paper.io! Use WASD to move yourself around the screen. The goal of the game is to increase your land. Do this by moving around the screen. Navigate your character');
   if (height >= width) {
    cellSize = width/GRID_SIZE
  }
  else if (height < width) {
    cellSize = height/GRID_SIZE
  }
  window.setInterval(spawnBall, 1000);
  bob = new Character(x, y, "blue", 3, "grey", 5, "black", 2, 40, 5);
  //bob.display();
  //bob.move();
}

// function startAnimation() {
//   rules = new Sprite(width - GRID_SIZE, height - GRID_SIZE);
//   rules.color = random(255);
//   if (rules.mouse.hovering()) {
//     rules.color = 'pink';
//   }
// }

function viewRules() {
  rules.color = "white";
  if (rules.mouse.hovering()) {
    rules.color = 'pink';
  }
  fill("black");
  text("Rules", width - GRID_SIZE * 2, height - GRID_SIZE);
}

function startScreen() {
  if (gameMode === "start screen") {
    //display title
    background("black");
    //startAnimation();
    for (let theBall of ballArray) {
      fill(theBall.color);
      //move
      theBall.x = noise(theBall.time) * width;
      theBall.y = noise(theBall.time + 300) * height;
      //display
      rect(theBall.x, theBall.y, theBall.size);
    
      theBall.time += 0.001; 
    }
    imageMode(CENTER);
    image(logo, width/2, height/2 - height/4, width/1.1 , height/4);
    //create start button
    textSize(width/12);
    fill('grey')
    stroke("white")
    imageMode(CORNER)
    rect(width/2 - width/6, height/2, width/3, height/4);
    fill('white');
    textAlign(CENTER);
    text('START', width/2 - width/6, height/2 + height/12, width/3);
    // let c = rules.selected();
    // background(c);

  }
}

function spawnBall() {
  let ball = {
    x: random(width),
    y: random(height),
    size: random(5, 50),
    color: color(random(255), random(255), random(255), random(255)),
    time: random(1000),
  };
 ballArray.push(ball);  
}

function endScreen() {
  gameMode = "end screen";
  gameMusic.stop();
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      gridOne[y][x] = 0;
    }
  }
}

//start button
function isInRect(x, y, top, bottom, left, right) {
  return x >= left && x <= right && y >= top && y <= bottom;
}


function mousePressed() {
  let startClicked = isInRect(mouseX, mouseY, (height/2), 
  (height/2 + height/4), (width/2 - width/6), (width/2 - width/6 + width/3));
  if (startClicked) {
    gameMode = "game";
    if (!gameMusic.isPlaying()) {
      if (gameMode === "game") {
        gameMusic.setVolume(0.5);
        gameMusic.loop();
        if (gameMode === "end screen"){
          gameMusic.stop();
        }
      }
    }
  }
}

function draw() {
  background("purple");
  noStroke();
  bob.display();
  //bob.move();
  //bob.keyPressed();
  displayGrid();
  if (gameMode === "start screen") {
    startScreen();
  }
  playerArea();
  viewRules();
}

function implementFlood() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      //if (state !== "full") {
        if (flood === "true") {
          let y = Math.floor(mouseY/cellSize);
          let x = Math.floor(mouseX/cellSize)
          floodFill(x, y, 4)
          return;
        }
      }
    }
  }
  
  
function floodFill(x, y, newColor) {
  if ((x <= areaX) && (y <= areaY)) {
    if ((x < 0 || x > GRID_SIZE || y < 0 || y > GRID_SIZE)) {
      if ((gridOne[y][x] === 4)) {//} || (gridOne[y][x] === 8)) {
        return;
      }
    }
    else if ((gridOne[y][x] === 0) || (gridOne[y][x] === 3)) {
      //state = "full";
      newColor = 4;
      //if ((gridOne[y][x] !== 4) && (gridOne[y][x] !== 8)) {
      gridOne[y][x] = newColor;
      floodFill(x + 1, y, newColor);
      floodFill(x - 1, y, newColor);
      floodFill(x, y + 1, newColor);
      floodFill(x, y - 1, newColor);
    }
  }
}

function playerArea() {
  if (playerX > areaX) {
    areaX = playerX;
  }
  if (playerY > areaY) {
    areaY = playerY
  }
}

function mouseClicked() {
  if (gameMode === "game") {
    if (flood = "true") {
      implementFlood();
    }
  }
}

function movePlayer(x, y) {
  //edge case check
  if (playerX + x >= 0 && playerX + x < GRID_SIZE && playerY + y >= 0 && playerY + y < GRID_SIZE) {
    //if (playerX + x >= 4 && playerX + x < GRID_SIZE && playerY + y >= 9 && playerY + y < GRID_SIZE) {
      if (((gridOne[(playerY + y) - 1][playerX + x] === 4) 
      || (gridOne[playerY + y][(playerX + x) - 1] === 4) 
     //|| (gridOne[(playerY + y) + 1][playerX + x] === 4)
     //|| (gridOne[playerY + y][(playerX + x) + 1] === 4)
   )) {
      //if (playerX + x >= 9 && playerX + x < GRID_SIZE && playerY + y >= 4 && playerY + y < GRID_SIZE) {
        flood = "true";
      //}
    }
    if ((gridOne[playerY + y][playerX + x] === 0) || (gridOne[playerY + y][playerX + x] === 4) || (gridOne[playerY + y][playerX + x] === 3)) {
      let tempX = playerX;
      let tempY = playerY;
      playerX += x;
      playerY += y;
      //update grid
      gridOne[playerY][playerX] = 9;
      gridOne[tempY][tempX] = 8;
    }
    else if (gridOne[playerY + y][playerX + x] === 8) {//|| (gridOne[playerY + y][playerX + x] !== 0) || (gridOne[playerY + y][playerX + x] !== 3)) {
      endBoom.play();
      endScreen();
    }
  }
}

function keyPressed() {
  if (key === "s") {//s
    movePlayer(0, 1);
  }
  else if (key === "w") {//w
    movePlayer(0, -1);
  }
  else if (key === "a") {//a
    movePlayer(-1, 0);
  }
  else if (key === "d") {//d
    movePlayer(1, 0);
  }
  else if (key === "j") {//s
    bob.move(0, 1);
  }
  else if (key === "u") {//w
    bob.move(0, -1);
  }
  else if (key === "h") {//a
    bob.move(-1, 0);
  }
  else if (key === "k") {//d
    bob.move(1, 0);
  }
}

function displayGrid() {
  if (gameMode === "game") {  
    for (let y = 0; y < GRID_SIZE; y++) { 
      for (let x = 0; x < GRID_SIZE; x++) {
        if (gridOne[y][x] === 9) {
          fill("red")
          rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
        //pink
        else if (y <= 5 && x < 10) {
          if (gameMode === "game") {
            fill(255, 0, 70, 100);
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
            gridOne[y][x] = 4;
          }
        }
        // //blue
        // else if (y <= 5 && x > 40) {
          //   if (gameMode === "game") {
            //     fill("blue");
            //     rect(x * cellSize, y * cellSize, cellSize, cellSize);
            //   }
            //   else if (gameMode === "end screen") {
              //     fill("white");
              //     rect(x * cellSize, y * cellSize, cellSize, cellSize);
              //   }
              // }
              // //green
              // else if (y >= 45 && x < 10) {
                //   if (gameMode === "game") {
                  //     fill("green");
                  //     rect(x * cellSize, y * cellSize, cellSize, cellSize);
                  //   }
                  //   else if (gameMode === "end screen") {
                    //     fill("white");
                    //     rect(x * cellSize, y * cellSize, cellSize, cellSize);
                    //   }
                    // }
        else if (gridOne[y][x] === 8) {
          if (flood === "true") {
            fill(255, 0, 70, 100)
            rect(x * cellSize, y * cellSize, cellSize, cellSize); 
            gridOne[y][x] = 4;
            scoreKeeper();
          }
          else {
            fill("pink")
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
        }
        else if (gridOne[y][x] === 4) {
          fill(255, 0, 70, 100)
          rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
    flood = "false";
  }
  if (gameMode === "end screen") {
    textSize(width/6);
    fill('black');
    textFont("consolas");
    text('YOU DIED!', width/8, width/4);
    textSize(width/8);
    text('Score: ' + score, width/8, width/2);
  }
}

function generateEmptyGrid(cols, rows) {
    let newGrid = [];
    for (let y = 0; y < rows; y++) {
      newGrid.push([]);
      for (let x = 0; x < cols; x++) {
          newGrid[y].push(0);
      }
    }
    return newGrid;
}

function scoreKeeper() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      if (gridOne[y][x] === 4) {
        score = score + 1;
      }
    }
  }
}
