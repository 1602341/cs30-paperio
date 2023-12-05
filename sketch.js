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
// let 8 = pink
// let 9 = red
let grid;
let gap;
let cellSize;
let state = "blank";
let x;
let y;
let newColor;
let playerX = 0;
let playerY = 0;
const GRID_SIZE = 50;

function setup() {
  cnv = createCanvas(windowWidth, windowHeight);
  centerCanvas();
  loadPixels();
  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
grid[playerY][playerX] = 9;
  if (height >= width) {
    cellSize = width/GRID_SIZE
  }
  else if (height < width) {
    cellSize = height/GRID_SIZE
  }
  pixelDensity(5);
}

var cnv;

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
      if (x < 0 || x > width || y < 0 || y > height || state !== "full" || grid[y][x] !== newColor) {
        return;
      }
      else {
        state = "full";
        newColor = 1;
        grid[y][x] = newColor;
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
    if (grid[playerY + y][playerX + x] === 0) {
      let tempX = playerX;
      let tempY = playerY;
      playerX += x;
      playerY += y;
      //update grid
      grid[playerY][playerX] = 9;
      grid[tempY][tempX] = 8;
    }
  }
}

function keyPressed() {
  if (key === "s" || (key === DOWN_ARROW)) {
    movePlayer(0, 1);
  }
  else if (key === "w"|| key === 38) {
    movePlayer(0, -1);
  }
  else if (key === "a"|| key === 37) {
    movePlayer(-1, 0);
  }
  else if (key === "d"|| key === 68) {
    movePlayer(1, 0);
  }
}



function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      if (grid[y][x] === 9) {
        fill("red")
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
      else if (grid[y][x] === 8) {
        fill("pink")
        rect(x * cellSize, y * cellSize, cellSize, cellSize);
      }
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
