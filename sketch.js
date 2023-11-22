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
//
// Pixels:
// https://p5js.org/reference/#/p5/pixels


// let x;
// let y; 
// let section;
let grid;
let cellSize;
const GRID_SIZE = 50;

function setup() {
  createCanvas(600, 600);
  //loadPixels();
  grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  if (height >= width) {
    cellSize = width/GRID_SIZE
  }
  else if (height < width) {
    cellSize = height/GRID_SIZE
  }
  //let d = pixelDensity();
}


function draw() {
  background(220);
  displayGrid();
  //drawShape();
  //circle(width/2, height/2, 200);
}

// function setGrid() {
//   for (let i = 0; i < GRID_SIZE; i++) {
//     grid[i] = [];
//     for (let j = 0; j < GRID_SIZE; j++) {
//       grid[i][j] = '#FFFFFF';
//     }
//   }

//   drawShape();
// }

function drawShape() {
  let gap = 5;

  for (let y = gap; y < GRID_SIZE - gap; y++) {
    grid[y][gap];
    grid[gap][y];
    grid[GRID_SIZE - (gap + 1)][y];
    grid[i][GRID_SIZE - (gap + 1)];
  }
}

function displayGrid() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      fill("white");
      rect(x * cellSize, y * cellSize, cellSize, cellSize);
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
  drawShape();
  return newGrid;
}
// function validPixel(x, y, color) {
//   return x > 0 && x < width && y > 0 && y < height && 
// }

// function fillFinder() {
//   let section = 4 * (d * width) * (d * height / 2);
// }

// function dfs(section, x, y, oldColor, newColor) {

// }

