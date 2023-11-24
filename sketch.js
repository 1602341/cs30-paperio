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
const GRID_SIZE = 50;

function setup() {
  createCanvas(600, 600);
  //loadPixels();
  //grid = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  // if (height >= width) {
  //   cellSize = width/GRID_SIZE
  // }
  // else if (height < width) {
  //   cellSize = height/GRID_SIZE
  // }
  pixelDensity(5);
}



function draw() {
  background(220);
  circle(width/2, height/2, 200);
  //displayGrid();
  //drawShape();
  //circle(width/2, height/2, 200);
}

function mousePressed() {
  loadPixels();
  let r = pixels[(mouseY * width + mouseX) * 4];
  let g = pixels[(mouseY * width + mouseX) * 4 + 1];
  let b = pixels[(mouseY * width + mouseX) * 4 + 2];
  bucket()//mouseX, mouseY, 0, random(255), random(255), random(255), r, g, b);
  updatePixels();
}

function bucket() {//x, y, ii, R, G, B, ro, go, bo) {
  // let r = pixels[(y * width + x) * 4];
  // let g = pixels[(y * width + x) * 4 + 1];
  // let b = pixels[(y * width + x) * 4 + 2];
  // if (r === ro && g === go && b === bo) {
  //   pixels[(y * width + x) * 4] = R;
  //   pixels[(y * width + x) * 4+1] = G;
  //   pixels[(y * width + x) * 4+2] = B;
  //   for (let i = -1; i <= 1; i++) {
  //     if (i === 0) continue;
  //     if (x + i >= width) break;
  //     if (x + i < 0) break;
  //     bucket(x + i, y, ii+1, R, G, B, ro, go, bo);
  //   }
  //   for (let i = -1; i <= 1; i++) {
  //     if (i === 0) continue;
  //     if (y + i >= width) break;
  //     if (y + i < 0) break;
  //     bucket(x, y + i, ii+1, R, G, B, ro, go, bo);
  //   }
  // }
  fill("red")
}



// function displayGrid() {
//   for (let y = 0; y < GRID_SIZE; y++) { 
//     for (let x = 0; x < GRID_SIZE; x++) {
//       fill("white");
//       rect(x * cellSize, y * cellSize, cellSize, cellSize);
//     }
//   }
// }

// function generateEmptyGrid(cols, rows) {
//   let newGrid = [];
//   for (let y = 0; y < rows; y++) {
//     newGrid.push([]);
//     for (let x = 0; x < cols; x++) {
//         newGrid[y].push(0);
//     }
//   }
//   return newGrid;
// }
