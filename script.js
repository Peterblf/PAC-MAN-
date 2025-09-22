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
const cellSize = 20;
const overlay = document.getElementById("overlay");  //overlay avant le lancemennt du jeu
const music = document.getElementById("bg-music");   

document.addEventListener("keydown", startGame, { once: true });
document.addEventListener("click", startGame, { once: true });

function startGame() {   //dès que l'overlay disparait, la musique ce lance
  music.play();
  overlay.style.display = "none";
}

let score = 0;
const scoreDisplay = document.getElementById('score');
const pacgommes = []; // tableau pour stocker les pacgommes

// Générer la map et les pacgommes 
carte.forEach((row, y) => {
  row.forEach((cell, x) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    if(cell === 1) div.classList.add('wall');
    else div.classList.add('empty');
    div.style.left = x * cellSize + 'px';
    div.style.top = y * cellSize + 'px';
    gameContainer.appendChild(div);

    if(cell === 2){ // ajoute une pacgomme pour toute les "cellules" du tableau ou il y a un 2
      const pacgomme = document.createElement('div');
      pacgomme.classList.add('pacgomme');
      pacgomme.dataset.x = x;
      pacgomme.dataset.y = y;
      pacgomme.style.left = x * cellSize + cellSize/2 + 'px';
      pacgomme.style.top = y * cellSize + cellSize/2 + 'px';
      gameContainer.appendChild(pacgomme);
      pacgommes.push(pacgomme);
    }
  });
});

// Pac-Man
const pacman = document.createElement('div');
pacman.id = 'pacman';
let pacX = 13 * cellSize; // spawn de pacman 
let pacY = 12 * cellSize; 
gameContainer.appendChild(pacman);

function updatePacmanPosition() {
  pacman.style.left = pacX + 'px';
  pacman.style.top = pacY + 'px';
}

updatePacmanPosition();

let currentDirection = null;
let desiredDirection = null;
const moveDelay = 15; // nombre de frames entre chaque déplacement(vitesse de deplacement)
let frameCounter = 0;

document.addEventListener('keydown', (e) => {
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    desiredDirection = e.key;
  }
});

function canMove(dir) {
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

// Vérif si Pac-Man mange une pacgomme
function checkPacgomme() {
  const col = Math.floor(pacX / cellSize);
  const row = Math.floor(pacY / cellSize);

  for(let i = pacgommes.length-1; i>=0; i--){
    const p = pacgommes[i];
    if(Number(p.dataset.x) === col && Number(p.dataset.y) === row){
      p.remove();
      pacgommes.splice(i, 1);
      score += 1;
      scoreDisplay.textContent = 'Score: ' + score;
    }
  }
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
  checkPacgomme();
  requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);
