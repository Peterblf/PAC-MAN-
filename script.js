const carte = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1],
  [1,3,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,2,1,1,1,1,2,2,2,1,2,2,2,1,1,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,2,1,1,2,2,2,2,2,1,2,2,2,2,2,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,2,1,1,2,1,1,1,2,2,2,1,1,1,2,1,1,2,1,1,1,1,1,1],
  [2,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,2],
  [1,1,1,1,1,2,1,1,2,1,2,1,1,0,1,1,2,1,2,1,1,2,1,1,1,1,1,1],
  [2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,1,2,2,2,2,2,2,2,2,2,2,2,2],
  [1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,2,2,2,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,2,2,2,2,1],
  [1,1,1,2,1,2,1,1,1,1,2,1,1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,1,1,2,1,1,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,3,2,2,1,2,2,2,2,2,2,1,1,2,1,1,2,2,2,2,2,2,1,2,2,2,3,1],
  [1,1,1,2,1,2,1,1,1,1,2,1,1,2,1,1,2,1,1,1,1,2,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,2,1,1,1,1,0,1,1,1,1,2,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,1,0,0,0,0,0,0,0,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const gameContainer = document.getElementById('game-container');
const cellSize = 20;  // taille des cases 

// Générer la map (dessine) 
carte.forEach((row, y) => {
  row.forEach((cell, x) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    if(cell === 1) div.classList.add('wall');
    else div.classList.add('empty');
    div.style.left = x * cellSize + 'px';
    div.style.top = y * cellSize + 'px';
    gameContainer.appendChild(div);
  });
});

// Pac-Man
const pacman = document.createElement('div');
pacman.id = 'pacman';
let pacX = 14 * cellSize; // spawn de pacman
let pacY = 13 * cellSize; 
gameContainer.appendChild(pacman);

function updatePacmanPosition() {   // verif de la position de pacman 
  pacman.style.left = pacX + 'px';
  pacman.style.top = pacY + 'px';
}

updatePacmanPosition();

let currentDirection = null;
let desiredDirection = null;
const moveDelay = 6; // vitesse de déplacement 
let frameCounter = 0;

document.addEventListener('keydown', (e) => {        // ecouteur d'event pour les déplacment avec le clavier
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    desiredDirection = e.key;
  }
});

function canMove(dir) {    // fct de deplacement classique pour pacman dans map 
  let col = Math.floor(pacX / cellSize);
  let row = Math.floor(pacY / cellSize);

  if(dir === 'ArrowUp') row -= 1;
  if(dir === 'ArrowDown') row += 1;
  if(dir === 'ArrowLeft') col -= 1;
  if(dir === 'ArrowRight') col += 1;

  if(col < 0) col = carte[0].length -1;
  if(col >= carte[0].length) col = 0;

  return carte[row][col] !== 1;
}

function gameLoop() {   
  frameCounter++;
  if(frameCounter < moveDelay) {
    requestAnimationFrame(gameLoop);
    return;
  }
  frameCounter = 0;

  if(desiredDirection && canMove(desiredDirection)) currentDirection = desiredDirection;

  if(currentDirection && canMove(currentDirection)) {
    if(currentDirection === 'ArrowUp') pacY -= cellSize;
    if(currentDirection === 'ArrowDown') pacY += cellSize;
    if(currentDirection === 'ArrowLeft') pacX -= cellSize;
    if(currentDirection === 'ArrowRight') pacX += cellSize;
  }

  if(pacX < 0) pacX = (carte[0].length -1) * cellSize;
  if(pacX >= carte[0].length * cellSize) pacX = 0;

  updatePacmanPosition();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
