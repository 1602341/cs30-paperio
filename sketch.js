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
let gridOne;
let gap;
let cellSize;
let state = "blank";
let x;
let y;
let newColor;
let logo;
let startBackground;
let endBoom;
let gameMusic;
let playerX = 0;
let playerY = 0;
const GRID_SIZE = 50;
let gameMode = "start screen";
let flood = "false";

class Character {
  constructor (x, y, color) {
    this.x = x;
    this.y = y;
    this.newColor = color;
  }
}

function preload() {
  logo = loadImage("paperio.png");
  startBackground = loadImage("paperio-background.png")
  endBoom = loadSound("endBoom.wav");
  gameMusic = loadSound("background-sound.mp3")
}

function setup() {
  //createCanvas(windowWidth, windowHeight);
  new Canvas("1.5: 1.5");
  //centerCanvas();
  loadPixels();
  //if (gameMode === "game") {
  gridOne = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  gridOne[playerY][playerX] = 9;
  if (height >= width) {
    cellSize = width/GRID_SIZE
  }
  else if (height < width) {
    cellSize = height/GRID_SIZE
  }
  pixelDensity(5);
}


function startScreen() {
  if (gameMode === "start screen") {
    //display title
    background(startBackground);
    imageMode(CENTER);
    image(logo, width/2, height/2 - height/4, width/1.1 , height/4);
    //create start button
    textSize(width/12);
    fill('black')
    imageMode(CORNER)
    rect(width/2 - width/6, height/2, width/3, height/4);
    fill('white');
    textAlign(CENTER);
    text('START', width/2 - width/6, height/2 + height/12, width/3);
  }
}


function endScreen() {
  gameMode = "end screen";
  //gameMusic.stop();
  createCanvas(500, 500);
  textSize(50);
  fill('black');
  text('SCORE', GRID_SIZE/2 + 150, GRID_SIZE/2 + 400);
  //noLoop();
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
  background("grey");
  noStroke();
  if (gameMode === "start screen") {
    startScreen();
  }
  else if (gameMode === "game") {
    displayGrid();
    //gameMusic.setVolume(0.01);
    //gameMusic.play();
    //gameMusic.loop();
  }
  //fill("red");
}

// function homeBase() {
  //   for (let y = 0; y < GRID_SIZE; y++) { 
    //     for (let x = 0; x < GRID_SIZE; x++) {
      //       if (y = 5 && x > 25) {
        //         gridOne[y][x] = 4;
        //       }
        //     }
        //   }
        // }
        
        
function implementFlood() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      if (state !== "full") {
        floodFill(mouseX, mouseY, fill(255, 0, 70, 100));
      }
    }
  }
}


function floodFill(x, y, newColor) {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      if (x < 0 || x > width || y < 0 || y > height || state !== "full" || gridOne[y][x] !== newColor) {
        return;
      }
      else {
        state = "full";
        newColor = 1;
        gridOne[y][x] = newColor;
        floodFill(x + 1, y, newColor);
        floodFill(x - 1, y, newColor);
        floodFill(x, y + 1, newColor);
        floodFill(x, y - 1, newColor);
      }
    }
  }
}

function movePlayer(x, y) {
  //edge case check
  if (playerX + x >= 0 && playerX + x < GRID_SIZE && playerY + y >= 0 && playerY + y < GRID_SIZE) {
    if (((gridOne[(playerY + y) - 1][playerX + x] === 4) || (gridOne[playerY + y][(playerX + x) - 1] === 4))) {
      flood = "true";
    }
    if ((gridOne[playerY + y][playerX + x] === 0) || (gridOne[playerY + y][playerX + x] === 4)) {
      let tempX = playerX;
      let tempY = playerY;
      playerX += x;
      playerY += y;
      //update grid
      gridOne[playerY][playerX] = 9;
      gridOne[tempY][tempX] = 8;
    }
    else if ((gridOne[playerY + y][playerX + x] === 8)) {
      endBoom.play();
      gridOne = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
      gameMode = "end screen";
      endScreen();
    }
    // else if ((gridOne[playerY + y][playerX + x] === 4)) {
    //   //implementFlood();
    // }
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
}





// class Land {
//   constructor (color) {
//     this.x;
//     this.y;
//     this.color = color;
//   }
//   create() {
//     for (let this.y = 0; this.y < GRID_SIZE; this.y++) { 
//       for (let this.x = 0; this.x < GRID_SIZE; this.x++) {
//         if (gameMode === "end screen") {
//           if (y <= 5 && x < 10) {
//             fill(255, 0, 70, 100);
//             rect(x * cellSize, y * cellSize, cellSize, cellSize);
//           }
//         }
//       }
//     }
//   }
// }


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      //homeBase();
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
        else if (gameMode === "end screen") {
          fill("grey");
          rect(x * cellSize, y * cellSize, cellSize, cellSize);
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
      else {
        fill("grey");
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
    }
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
