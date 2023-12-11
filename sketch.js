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
let playerX = 0;
let playerY = 0;
const GRID_SIZE = 50;
let gameMode = "start screen";

class Character {
  constructor (x, y, color) {
    this.x = x;
    this.y = y;
    this.newColor = color;
  }
}

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  loadPixels();
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

var cnv;

function startScreen() {

}

function gameScreen() {

}

function endScreen() {
  background(220);
}

function centerCanvas() {
  var x = (windowWidth - width) / 2;
  var y = (windowHeight - height) / 2;
  cnv.position(x, y);
}

function draw() {
  background(220);
  noStroke();
  displayGrid();
  fill("red");
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
        fill("red");
        floodFill(mouseX, mouseY, "red");
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
    if (gridOne[playerY + y][playerX + x] === 0) {
      let tempX = playerX;
      let tempY = playerY;
      playerX += x;
      playerY += y;
      //update grid
      gridOne[playerY][playerX] = 9;
      gridOne[tempY][tempX] = 8;
    }
    else if ((gridOne[playerY + y][playerX + x] === 8)) {
      gridOne = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
      gameMode = "end screen";
      if (gameMode === "end screen") {
        endScreen();
      }
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
}



function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      //homeBase();
      if (gridOne[y][x] === 9) {
        fill("red")
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (y <= 5 && x < 10) {
        fill(255, 0, 70, 100);
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (gridOne[y][x] === 8) {
        fill("pink")
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      // else if (gridOne[y][x] === 4) {
      //   fill(fill(255, 0, 0, 100));
      //   rect(x * cellSize, y * cellSize, cellSize, cellSize);
      // }
      else {
        fill("white");
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
