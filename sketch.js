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


function setup() {
  createCanvas(600, 600);
  loadPixels();
  let d = pixelDensity();
}

function draw() {
  background(220);
  circle(mouseX, mouseY, 100);
}

function fillFinder() {
  let section = 4 * (d * width) * (d * height / 2);
}

function dfs(section, x, y, oldColor, newColor) {
  
}

