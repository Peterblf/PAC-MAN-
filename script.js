const carte = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1],
  [1,3,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,2,2,1,1,1,1,1,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,2,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,2,1,1,0,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,1,1,1,1],
  [1,1,1,1,1,2,1,1,0,1,1,1,0,0,0,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,1,2,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,2,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,1,2,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,2,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,0,1,1,1,1,0,1,1,1,1,0,1,1,2,1,1,2,1,1,1],
  [1,2,2,2,1,2,2,2,0,0,0,0,0,0,0,0,0,0,0,2,2,2,1,2,2,2,2,1],
  [1,1,1,2,1,2,1,1,1,1,0,1,1,0,1,1,0,1,1,1,1,2,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,0,0,1,1,0,1,1,0,0,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,2,1,1,1,1,0,1,1,1,1,2,1,1,2,1,1,2,1,1,1],
  [1,3,2,2,1,2,2,2,2,2,2,1,1,0,1,1,2,2,2,2,2,2,1,2,2,2,3,1],
  [1,1,1,2,1,2,1,1,1,1,2,1,1,0,1,1,2,1,1,1,1,2,1,2,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,0,0,0,0,0,0,0,0,0,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,1,1,1,0,1,1,1,1,1,1,1,1,1,0,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,0,1,0,0,0,0,0,0,0,1,0,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];

const gameContainer = document.getElementById('game-container');
const cellSize = 20;

// Générer la map
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
let pacX = 14 * cellSize;
let pacY = 23 * cellSize;
gameContainer.appendChild(pacman);

function updatePacmanPosition() {
  pacman.style.left = pacX + 1 + 'px';
  pacman.style.top = pacY + 1 + 'px';
}

updatePacmanPosition();

// Déplacement fluide
let currentDirection = null;
let desiredDirection = null;
const speed = 2; // pixels par frame

document.addEventListener('keydown', (e) => {
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    desiredDirection = e.key;
  }
});

function canMove(x, y) {
  const col = Math.floor(x / cellSize);
  const row = Math.floor(y / cellSize);
  if(row < 0) row = carte.length -1;
  if(row >= carte.length) row = 0;
  if(col < 0) col = carte[0].length -1;
  if(col >= carte[0].length) col = 0;
  return carte[row][col] !== 1;
}

function gameLoop() {
  // Essayer de changer de direction si possible
  if(desiredDirection) {
    let testX = pacX;
    let testY = pacY;
    if(desiredDirection === 'ArrowUp') testY -= speed;
    if(desiredDirection === 'ArrowDown') testY += speed;
    if(desiredDirection === 'ArrowLeft') testX -= speed;
    if(desiredDirection === 'ArrowRight') testX += speed;
    if(canMove(testX, testY)) currentDirection = desiredDirection;
  }

  // Déplacer dans la direction actuelle
  if(currentDirection) {
    let nextX = pacX;
    let nextY = pacY;
    if(currentDirection === 'ArrowUp') nextY -= speed;
    if(currentDirection === 'ArrowDown') nextY += speed;
    if(currentDirection === 'ArrowLeft') nextX -= speed;
    if(currentDirection === 'ArrowRight') nextX += speed;

    if(canMove(nextX, nextY)) {
      pacX = nextX;
      pacY = nextY;
    }
  }

  // Téléportation horizontale
  if(pacX < 0) pacX = carte[0].length * cellSize - speed;
  if(pacX >= carte[0].length * cellSize) pacX = 0;

  updatePacmanPosition();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
