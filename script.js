const carte = [ 
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1],
  [1,3,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,2,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,1,2,1],
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
  [1,2,1,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,2,1,1,1,1,1,1,1,2,1],
  [1,2,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1],
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]
];
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startScreen = document.getElementById('startScreen');
const bgMusic = new Audio('audio/Pac-Man intro music.mp3');
bgMusic.loop = true; 

const cellSize = 20;
let score = 0;
let lives = 3;


const pacman = document.createElement('div');
pacman.id = 'pacman';
let pacX = 13 * cellSize; 
let pacY = 12 * cellSize;
gameContainer.appendChild(pacman);

function updatePacmanPosition() {
  pacman.style.left = pacX + 'px';
  pacman.style.top = pacY + 'px';
}


const pacgommes = []; 

function generatePacgommes() {
  pacgommes.length = 0; 
  carte.forEach((row, y) => {
    row.forEach((cell, x) => {
      if(cell === 2){
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
}

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

      if(pacgommes.length === 0){
        alert('🎉 Bravo ! Vous avez tout récupéré !');
        resetGame();
      }
    }
  }
}


let currentDirection = null;
let desiredDirection = null;
const moveDelay = 15; 
let frameCounter = 0;

document.addEventListener('keydown', (e) => {
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    desiredDirection = e.key;
  }
});

function canMove(x, y, dir) {
  let col = Math.floor(x / cellSize);
  let row = Math.floor(y / cellSize);

  if(dir === 'ArrowUp') row -= 1;
  if(dir === 'ArrowDown') row += 1;
  if(dir === 'ArrowLeft') col -= 1;
  if(dir === 'ArrowRight') col += 1;

  if(col < 0) col = carte[0].length -1;
  if(col >= carte[0].length) col = 0;

  return carte[row][col] !== 1;
}

function canMoveGhost(x, y, dir) {
  let col = x;
  let row = y;

  if(dir === 'ArrowUp') row -= 1;
  if(dir === 'ArrowDown') row += 1;
  if(dir === 'ArrowLeft') col -= 1;
  if(dir === 'ArrowRight') col += 1;

  if(col < 0) col = carte[0].length -1;
  if(col >= carte[0].length) col = 0;

  return carte[row][col] !== 1;
}


const ghosts = [];
const ghostPositions = [
  [1,1], 
  [carte[0].length-2,1], 
  [1, carte.length-2], 
  [carte[0].length-2, carte.length-2] 
];

function createGhosts() {
  ghosts.length = 0;
  ghostPositions.forEach(pos => {
    const g = document.createElement('div');
    g.classList.add('ghost');
    g.style.left = pos[0]*cellSize + 'px';
    g.style.top = pos[1]*cellSize + 'px';
    gameContainer.appendChild(g);
    ghosts.push({x: pos[0], y: pos[1], element: g, dir: 'ArrowLeft', frameCounter:0, moveDelay:40});
  });
}

function moveGhosts() {
  ghosts.forEach(g => {
    g.frameCounter++;
    if(g.frameCounter < g.moveDelay) return;
    g.frameCounter = 0;

    const directions = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'];
    const possible = directions.filter(d => canMoveGhost(g.x, g.y, d));
    if(possible.length > 0){
      g.dir = possible[Math.floor(Math.random()*possible.length)];
    }

    if(canMoveGhost(g.x, g.y, g.dir)){
      if(g.dir === 'ArrowUp') g.y -= 1;
      if(g.dir === 'ArrowDown') g.y += 1;
      if(g.dir === 'ArrowLeft') g.x -= 1;
      if(g.dir === 'ArrowRight') g.x += 1;
    }


    if(g.x < 0) g.x = carte[0].length-1;
    if(g.x >= carte[0].length) g.x = 0;

    g.element.style.left = g.x*cellSize + 'px';
    g.element.style.top = g.y*cellSize + 'px';
  });

  requestAnimationFrame(moveGhosts);
}


function checkGhostCollision() {
  const pacCol = Math.floor(pacX/cellSize);
  const pacRow = Math.floor(pacY/cellSize);

  ghosts.forEach((g) => {
    if(g.x === pacCol && g.y === pacRow){
      lives--;
      livesDisplay.textContent = 'Vies : ' + lives;

      pacX = 13 * cellSize;
      pacY = 12 * cellSize;
      updatePacmanPosition();

      if(lives <= 0){
        alert('💀 Game Over !');
        resetGame();
      }
    }
  });
}


function gameLoop() {
  frameCounter++;
  if(frameCounter < moveDelay){
    requestAnimationFrame(gameLoop);
    return;
  }
  frameCounter = 0;

  if(desiredDirection && canMove(pacX, pacY, desiredDirection)) currentDirection = desiredDirection;

  if(currentDirection && canMove(pacX, pacY, currentDirection)){
    if(currentDirection === 'ArrowUp') pacY -= cellSize;
    if(currentDirection === 'ArrowDown') pacY += cellSize;
    if(currentDirection === 'ArrowLeft') pacX -= cellSize;
    if(currentDirection === 'ArrowRight') pacX += cellSize;
  }

 
  if(pacX < 0) pacX = (carte[0].length-1) * cellSize;
  if(pacX >= carte[0].length*cellSize) pacX = 0;

  updatePacmanPosition();
  checkPacgomme();
  checkGhostCollision();

  requestAnimationFrame(gameLoop);
}


function resetGame() {
  gameContainer.innerHTML = '';

  score = 0;
  lives = 3;
  scoreDisplay.textContent = 'Score : ' + score;
  livesDisplay.textContent = 'Vies : ' + lives;

  generateMap();
  generatePacgommes();
  createGhosts();

  pacX = 13 * cellSize;
  pacY = 12 * cellSize;
  gameContainer.appendChild(pacman);
  updatePacmanPosition();
}


function generateMap() {
  carte.forEach((row,y) => {
    row.forEach((cell,x) => {
      const div = document.createElement('div');
      div.classList.add('cell');
      if(cell === 1) div.classList.add('wall'); 
      else div.classList.add('empty');
      div.style.left = x*cellSize + 'px';
      div.style.top = y*cellSize + 'px';
      gameContainer.appendChild(div);
    });
  });
}

startScreen.addEventListener('click', () => {
  startScreen.style.display = 'none';

  if(bgMusic.paused){
    bgMusic.play().catch(e => console.log("Le navigateur a bloqué l'audio :", e));
  }

  generateMap();
  generatePacgommes();
  createGhosts();
  gameContainer.appendChild(pacman);
  updatePacmanPosition();

  requestAnimationFrame(gameLoop);  
  requestAnimationFrame(moveGhosts); 
});
