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


// let x;
// let y; 
// let section;
let grid;
let gap;
let cellSize;
let state = "blank";
let x;
let y;
let newColor;
const GRID_SIZE = 50;

function setup() {
  createCanvas(600, 600);
  loadPixels();
  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  if (height >= width) {
    cellSize = width/GRID_SIZE
  }
  else if (height < width) {
    cellSize = height/GRID_SIZE
  }
  pixelDensity(5);
}



function draw() {
  background(220);
  displayGrid();
  //drawShape();
  //circle(width/2, height/2, 200);
}

function mousePressed() {
  floodFill();
  // loadPixels();
  // let r = pixels[(mouseY * width + mouseX) * 4];
  // let g = pixels[(mouseY * width + mouseX) * 4 + 1];
  // let b = pixels[(mouseY * width + mouseX) * 4 + 2];
  // bucket(mouseX, mouseY, 0, random(255), random(255), random(255), r, g, b);
  // updatePixels();
}

// class RecursiveFill {
//   constructor(x, y, colour) {
//     this.x = x;
//     this.y = y;
//     this.colour = "red"
//   }

//   fill(x, y, colour) {
//     if (isValidSquare(x, y, colour)) {
//       grid[x][y] = 'red';
//       colour = grid[y][x];
//       this.fill(x + 1, y, colour);
//       this.fill(x - 1, y, colour);
//       this.fill(x, y + 1, colour);
//       this.fill(x, y - 1, colour); 
//     }
//   }
//   return;
// }

// function isValidSquare(x, y, colour) {
//   return x > 0 && x < width && y > 0 && y < height && grid[x][y] === colour;
// }

// function implementFlood() {

// }


function floodFill(x, y, newColor) {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      fill("red")
      if (x < 0 || x > width || y < 0 || y > height || state !== "black" || grid[y][x] === newColor) {
        return;
      }
      else {
        state = "full";
        newColor = fill("red");
        grid[y][x] = newColor;
        floodFill(x + 1, y, newColor);
        floodFill(x - 1, y, newColor);
        floodFill(x, y + 1, newColor);
        floodFill(x, y - 1, newColor);
      }
    }
  }
}


function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      if (y === 5 || y === 25) {
        fill("red")
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
