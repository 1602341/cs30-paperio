// Major Project: Paper.io
// Natalie Woo
// January 22, 2024
//
// Flood Fill:
// https://gist.github.com/syphh/8cbad50acb2e0f4ca60ef041814c271b
// https://codeguppy.com/code.html?ayLSdMZfjz8aJRGU7KfL
// https://www.youtube.com/watch?v=VuiXOc81UDM
// https://editor.p5js.org/micuat/sketches/xzRtK385

// let 0 = white
// let 8 = trail pink
// let 4 = block pink
// let 9 = red
// let 3 = blue
// let 2 = green
// let 5 = grey
// let 7 = black

let gridOne;
let gridTwo;
let gap;
let cellSize;
let blue;
let x;
let y;
let newColor;
let logo;
let startBackground;
let endBoom;
let gameMusic;
let playerX = 1;
let playerY = 1;
let aiX = 40;
let aiY = 1;
const GRID_SIZE = 50;
let gameMode = "start screen";
let pinkFlood = "false";
let blueFlood = "false";
let blueScore = 0;
let pinkScore = 0;
let squareArray = [];
let areaX = 0;
let areaY = 0;
let aiAreaX = 50;
let aiAreaY = 0;
let winner;
let ruleState = 0;

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
          if (gridOne[y][x] === this.aiValue) {
            fill(this.ai);
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
          else if (gridOne[y][x] === this.colorValue) {
            fill(this.color);
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
          else if (gridOne[y][x] === this.trailValue) {
            if (blueFlood === "true") {
              fill(this.color);
              rect(x * cellSize, y * cellSize, cellSize, cellSize); 
              gridOne[y][x] = this.colorValue;
              scoreKeeper();
            }
            else {
              fill(this.trail);
              rect(x * cellSize, y * cellSize, cellSize, cellSize);
            }
          }
        }
      }
      blueFlood = "false";
    }
  }
  aiMove(x, y) {
    if (aiX + x >= 0 && aiX + x < GRID_SIZE && aiY + y >= 0 && aiY + y < GRID_SIZE) {
      if (((gridOne[(aiY + y) - 1][aiX + x] === this.colorValue) || (gridOne[aiY + y][(aiX + x) - 1] === this.colorValue))) {
        blueFlood = "true";
      }
      if ((gridOne[aiY + y][aiX + x] === 0) || (gridOne[aiY + y][aiX + x] === this.colorValue) || (gridOne[playerY + y][playerX + x] === 4)) {
        let tempX = aiX;
        let tempY = aiY;
        aiX += x;
        aiY += y;
        //update grid
        gridOne[aiY][aiX] = this.aiValue;
        gridOne[tempY][tempX] = this.trailValue;
      }
      if ((gridOne[aiY + y][aiX + x] === this.trailValue)) {
        endBoom.play();
        endScreen();
      }
    }
  }
  aiFill(x, y, newColor) {
    if ((x >= aiAreaX) && (y <= aiAreaY)) {
      if ((x < 0 || x > GRID_SIZE || y < 0 || y > GRID_SIZE)) {
        if ((gridOne[y][x] === this.colorValue)) {
          return;
        }
      }
      else if ((gridOne[y][x] === 0) || (gridOne[y][x] === 4)) {
        newColor = this.colorValue;
        gridOne[y][x] = newColor;
        gainLand.play();
        blue.aiFill(x + 1, y, newColor);
        blue.aiFill(x - 1, y, newColor);
        blue.aiFill(x, y + 1, newColor);
        blue.aiFill(x, y - 1, newColor);
      }
    }
  }
  area() {
    if (aiX < aiAreaX) {
      aiAreaX = aiX;
    }
    if (aiY > aiAreaY) {
      aiAreaY = aiY;
    }
  }
}

function preload() {
  //initializes all images and sounds needed in the game
  logo = loadImage("paperio.png");
  startBackground = loadImage("paperio-background.png");
  endBoom = loadSound("endBoom.wav");
  gameMusic = loadSound("background-sound.mp3");
  gainLand = loadSound("land-sound.wav");
}

function setup() {
  //fits square canvas into the screen
  new Canvas("1.5: 1.5");
  //generates the grid that the game occurs on
  gridOne = generateEmptyGrid(GRID_SIZE, GRID_SIZE);
  //moving character for the pink player
  gridOne[playerY][playerX] = 9;
  //moving character for the blue player
  gridOne[aiY][aiX] = 2;
  //creates button to display the rule pop up
  rules = new Sprite(width - width/12 * 2, height - height/12, width/4, height/10);
  //creates pop up window that shows the rules
  ruleScreen = new Sprite(width/2, height/2, width/2, height/2);
  //tests whether screen should be visible
  ruleScreen.visible = false;
  //determines cellsize
   if (height >= width) {
    cellSize = width/GRID_SIZE;
  }
  else if (height < width) {
    cellSize = height/GRID_SIZE;
  }
  //determines how quickly the squares appear in the start screen background visuals
  window.setInterval(spawnSquare, 1000);
  blue = new Character(x, y, "blue", 3, "grey", 5, "green", 2, 40, 5);
}

//rule pop up screen
function viewRules() {
  //button that lead to rule screen
  rules.color = "grey";
  rules.textSize = width/12;
  rules.text = "Rules";
  if (rules.mouse.hovering()) {
    rules.color = 'white';
  }
  //determines if the rules pop up screen should be visible
  if (rules.mouse.pressed()) {
    if (ruleState === 0) {
      ruleScreen.visible = true;
      //if ruleState === 1 then the rule screen is visible
      ruleState = 1;
    }
    else if (ruleState === 1) {
      ruleScreen.visible = false;
      //if ruleState === 0 then the rule screen is invisible
      ruleState = 0;
    }
    //creates the text for the rule pop up window
    ruleScreen.color = "white";
    ruleScreen.textSize = width/50;
    ruleScreen.text = `Welcome to Paper.io!
    For the pink character use WASD
    to move yourself around the screen.
    For the blue character use UHJK
    to move yourself around the screen.
    The goal of the game is to
    increase the amount of land you have.
    This can be done by consuming blank land (purple),
    or stealing the opposing player's land. 
    Connect your character back to 
    its land to change the color of its trail.
    Click within the area between the trail
    and land to gain the land.
    Consume the most land to win.`;
  }
} 

function startScreen() {
  if (gameMode === "start screen") {
    background("black");
    //creates background visuals for the start screen
    for (let theSquare of squareArray) {
      fill(theSquare.color);
      //move
      theSquare.x = noise(theSquare.time) * width;
      theSquare.y = noise(theSquare.time + 300) * height;
      //display
      rect(theSquare.x, theSquare.y, theSquare.size);  
      theSquare.time += 0.001; 
    }
    //display title
    imageMode(CENTER);
    image(logo, width/2, height/2 - height/4, width/1.1 , height/4);
    //create start button
    textSize(width/8);
    fill('grey')
    stroke("white")
    imageMode(CORNER)
    rect(width/2 - width/6, height/2, width/3, height/4);
    noStroke();
    fill('black');
    textAlign(CENTER);
    text('Start', width/2 - width/6, height/2 + height/14, width/3);
  }
}

//spawns squares for the background visuals of start screen
function spawnSquare() {
  let square = {
    x: random(width),
    y: random(height),
    size: random(5, 50),
    color: color(random(255), random(255), random(255), random(255)),
    time: random(1000),
  };
 squareArray.push(square);  
}

function endScreen() {
  gameMode = "end screen";
  gameMusic.stop();
  //clears grid for the end screen
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      gridOne[y][x] = 0;
    }
  }
}

//checks if mouse is in start button
function isInRect(x, y, top, bottom, left, right) {
  return x >= left && x <= right && y >= top && y <= bottom;
}


function mousePressed() {
  //checks if start button is pressed
  let startClicked = isInRect(mouseX, mouseY, (height/2), (height/2 + height/4), (width/2 - width/6), (width/2 - width/6 + width/3));
  if (startClicked) {
    //starts game
    gameMode = "game";
    //plays music while game is in progress
    if (!gameMusic.isPlaying()) {
      if (gameMode === "game") {
        gameMusic.setVolume(0.5);
        gameMusic.loop();
      }
    }
  }
}

function draw() {
  background("purple");
  noStroke();
  //activates blue player
  blue.display();
  blue.area();
  //activates pink player
  displayGrid();
  if (gameMode === "start screen") {
    startScreen();
  }
  //keeps track of where the player has moved
  playerArea();
  //controls rules pop up
  viewRules();
}

//starts flood fill function if appropriate
function implementFlood() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      //controls if the flood can be occur
      if (pinkFlood === "true") {
        let y = Math.floor(mouseY/cellSize);
        let x = Math.floor(mouseX/cellSize);
        //last person who clicked is who can flood fill
        if ((key === "w") || (key === "a") || (key === "s") || (key === "d")) {
          floodFill(x, y, 4);
        }
        return;
      }
    }
  }
}
    
//flood fill for the pink character
function floodFill(x, y, newColor) {
  //if within playable area then flood
  if ((x <= areaX) && (y <= areaY)) {
    if ((x < 0 || x > GRID_SIZE || y < 0 || y > GRID_SIZE)) {
      //break case
      if ((gridOne[y][x] === 4)) {
        return;
      }
    }
    //while to color is not equal to pink
    else if ((gridOne[y][x] === 0) || (gridOne[y][x] === 3)) {
      newColor = 4;
      //changes color of cell clicked
      gridOne[y][x] = newColor;
      gainLand.play();
      //recursivly changes color of cells until break point
      floodFill(x + 1, y, newColor);
      floodFill(x - 1, y, newColor);
      floodFill(x, y + 1, newColor);
      floodFill(x, y - 1, newColor);
    }
  }
}

//keeps track of the games playable area
function playerArea() {
  if (playerX > areaX) {
    areaX = playerX;
  }
  if (playerY > areaY) {
    areaY = playerY;
  }
}

function mouseClicked() {
  if (gameMode === "game") {
    if (pinkFlood = "true") {
      implementFlood();
    }
    //starts flood for the blue character
    if (blueFlood = "true") {
      for (let y = 0; y < GRID_SIZE; y++) { 
        for (let x = 0; x < GRID_SIZE; x++) {
          let y = Math.floor(mouseY/cellSize);
          let x = Math.floor(mouseX/cellSize)
          if ((key === "u") || (key === "h") || (key === "j") || (key === "k")) {
            blue.aiFill(x, y, this.colorValue)
          }
          return;
        }
      }
    }
  }
}

function movePlayer(x, y) {
  //edge case check
  if (playerX + x >= 0 && playerX + x < GRID_SIZE && playerY + y >= 0 && playerY + y < GRID_SIZE) {
    if (((gridOne[(playerY + y) - 1][playerX + x] === 4) || (gridOne[playerY + y][(playerX + x) - 1] === 4))) {
      //can flood if the character meets its own land
      pinkFlood = "true";
    }
    if ((gridOne[playerY + y][playerX + x] === 0) || (gridOne[playerY + y][playerX + x] === 4) || (gridOne[playerY + y][playerX + x] === 3)) {
      let tempX = playerX;
      let tempY = playerY;
      //moves player forward
      playerX += x;
      playerY += y;
      //update grid
      gridOne[playerY][playerX] = 9;
      //leaves trail behind character
      gridOne[tempY][tempX] = 8;
    }
    //if pink character hits itself or blue
    else if ((gridOne[playerY + y][playerX + x] === 8) || (gridOne[playerY + y][playerX + x] === blue.trailValue)) {
      //plays sound when someone dies
      endBoom.play();
      endScreen();
    }
  }
}

function keyPressed() {
  //moves pink when a key is pressed
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
  //moves blue when a key is pressed
  else if (key === "j") {//j
    blue.aiMove(0, 1);
  }
  else if (key === "u") {//u
    blue.aiMove(0, -1);
  }
  else if (key === "h") {//h
    blue.aiMove(-1, 0);
  }
  else if (key === "k") {//k
    blue.aiMove(1, 0);
  }
}

function displayGrid() {
  //displays and chages the values in the grid
  if (gameMode === "game") {  
    for (let y = 0; y < GRID_SIZE; y++) { 
      for (let x = 0; x < GRID_SIZE; x++) {
        //displays pink character
        if (gridOne[y][x] === 9) {
          fill("red");
          rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
        //border around the screen
        else if ((y === 0) || (y === 49) || (x === 0) || (x === 49)) {
          fill("black")
          rect(x * cellSize, y * cellSize, cellSize, cellSize);
          gridOne[y][x] = 7;
        }
        //pink land
        else if (y <= 5 && x < 10) {
          if (gameMode === "game") {
            fill(255, 0, 70, 100);
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
            gridOne[y][x] = 4;
          }
        }
        else if (gridOne[y][x] === 8) {
          //changes trail to the flood fill color when character hits land
          if (pinkFlood === "true") {
            fill(255, 0, 70, 100);
            rect(x * cellSize, y * cellSize, cellSize, cellSize); 
            gridOne[y][x] = 4;
            //implementFlood();
            scoreKeeper();
          }
          //leaves trail behind character
          else {
            fill("pink");
            rect(x * cellSize, y * cellSize, cellSize, cellSize);
          }
        }
        //colors flood fill
        else if (gridOne[y][x] === 4) {
          fill(255, 0, 70, 100)
          rect(x * cellSize, y * cellSize, cellSize, cellSize);
        }
      }
    }
    //stops flood from occuring once 
    pinkFlood = "false";
  }
  //displays text on end screen
  if (gameMode === "end screen") {
    findWinner();
    textSize(width/10);
    textAlign(CENTER);
    fill("black");
    textFont("consolas");
    //shows who the winner is
    text(winner + " wins!", width/2, width/4);
    textSize(width/12);
    fill(255, 0, 70, 100);
    //show each players score
    text(' Pinks Score: ' + pinkScore, width/2, width/2);
    fill(0, 70, 255, 100);
    text(' Blues Score: ' + blueScore, width/2, width/2 + width/4);
  }
}

//creates the base for the grid
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

//increases the score of the players whenever they gain more land
function scoreKeeper() {
  for (let y = 0; y < GRID_SIZE; y++) { 
    for (let x = 0; x < GRID_SIZE; x++) {
      if (gridOne[y][x] === 4) {
        pinkScore = pinkScore + 1;
      }
      if (gridOne[y][x] === 3) {
        blueScore = blueScore + 1;
      }
    }
  }
}

//determines who the winner of the game is based on their score
function findWinner() {
  if (blueScore > pinkScore) {
    winner = "blue";
  }
  else if (pinkScore > blueScore) {
    winner = "pink";
  }
  else if (pinkScore === blueScore) {
    winner = "no one";
  }
}
