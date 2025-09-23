const carte = [ // super carte du jeu trop géniale (plus jamais de refait un map en liste 2D c'était l'enfer sur terre) 
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1], // (0: vide, 1: mur, 2: pacgomme, 3: super pacgomme)
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

// variables de base
const gameContainer = document.getElementById('game-container');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const startScreen = document.getElementById('startScreen');

const bgMusic = new Audio('audio/Pac-Man intro music.mp3');
bgMusic.loop = true;

const cellSize = 20;
let score = 0;
let lives = 3;

// creation du pacman et position initiale
const pacman = document.createElement('div');
pacman.id = 'pacman';
let pacX = 13 * cellSize; //spawn 
let pacY = 12 * cellSize;
gameContainer.appendChild(pacman);

function updatePacmanPosition() {
  pacman.style.left = pacX + 'px';
  pacman.style.top = pacY + 'px';
}

// gestiondes pacgommes
const pacgommes = [];

function generatePacgommes() { // création des pacgommes sur la carte
  pacgommes.length = 0;
  carte.forEach((row, y) => {
    row.forEach((cell, x) => {
      if (cell === 2) {
        const pacgomme = document.createElement('div');
        pacgomme.classList.add('pacgomme');
        pacgomme.dataset.x = x;
        pacgomme.dataset.y = y;
        pacgomme.style.left = x * cellSize + cellSize / 2 + 'px';
        pacgomme.style.top = y * cellSize + cellSize / 2 + 'px';
        gameContainer.appendChild(pacgomme);
        pacgommes.push(pacgomme);
      }
    });
  });
}

function checkPacgomme() { // check si Pac-Man mange une pacgomme
  const col = Math.floor(pacX / cellSize);
  const row = Math.floor(pacY / cellSize);
  for (let i = pacgommes.length - 1; i >= 0; i--) {
    const p = pacgommes[i];
    if (+p.dataset.x === col && +p.dataset.y === row) {
      p.remove();
      pacgommes.splice(i, 1);
      score++;
      scoreDisplay.textContent = 'Score : ' + score;
      if (pacgommes.length === 0) {
        alert('🎉 Bravo ! Vous avez tout récupéré !');
        resetGame();
      }
    }
  }
}

// deplacemetns pacman
let currentDirection = null;
let desiredDirection = null;
const moveDelay = 15;  // vitesse de déplacement (plus bas = plus rapide)
let frameCounter = 0;

document.addEventListener('keydown', e => {
  if (['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) desiredDirection = e.key;
});

function canMove(x, y, dir) { // vérifie si Pac-Man peut se déplacer
  let col = Math.floor(x / cellSize);
  let row = Math.floor(y / cellSize); // position actuelle en grille
  if (dir === 'ArrowUp') row--;
  if (dir === 'ArrowDown') row++;
  if (dir === 'ArrowLeft') col--;
  if (dir === 'ArrowRight') col++;
  if (col < 0) col = carte[0].length - 1;
  if (col >= carte[0].length) col = 0;
  return carte[row][col] !== 1;
}

// fantomes et "IA" basique 
const ghosts = [];
const ghostPositions = [
  [1,1], [carte[0].length-2,1],
  [1, carte.length-2], [carte[0].length-2, carte.length-2]
];

function createGhosts() { // création des fantômes au spawn
  ghosts.length = 0; // reset
  ghostPositions.forEach(pos => {
    const g = document.createElement('div');
    g.classList.add('ghost');
    g.style.left = pos[0]*cellSize + 'px';
    g.style.top = pos[1]*cellSize + 'px';
    gameContainer.appendChild(g);
    ghosts.push({x: pos[0], y: pos[1], element: g, dir: 'ArrowLeft', frameCounter:0, moveDelay:40});
  });
}

function canMoveGhost(x, y, dir) { // vérifie si un fantôme peut se bouger
  let col = x, row = y;
  if (dir === 'ArrowUp') row--;
  if (dir === 'ArrowDown') row++;
  if (dir === 'ArrowLeft') col--;
  if (dir === 'ArrowRight') col++;
  if (col < 0) col = carte[0].length - 1;
  if (col >= carte[0].length) col = 0;
  return carte[row][col] !== 1;
}

function moveGhosts() { // déplacement basique des fantômes
  ghosts.forEach(g => {
    g.frameCounter++;
    if(g.frameCounter < g.moveDelay) return;
    g.frameCounter = 0;

    const directions = ['ArrowUp','ArrowDown','ArrowLeft','ArrowRight']; // directions possibles
    const possible = directions.filter(d => canMoveGhost(g.x,g.y,d));
    if(possible.length) g.dir = possible[Math.floor(Math.random()*possible.length)];

    if(canMoveGhost(g.x,g.y,g.dir)){ // déplacement si possible
      if(g.dir==='ArrowUp') g.y--;
      if(g.dir==='ArrowDown') g.y++;
      if(g.dir==='ArrowLeft') g.x--;
      if(g.dir==='ArrowRight') g.x++;
    }

    if(g.x<0) g.x = carte[0].length-1;
    if(g.x>=carte[0].length) g.x = 0;

    g.element.style.left = g.x*cellSize + 'px';
    g.element.style.top = g.y*cellSize + 'px';
  });
  requestAnimationFrame(moveGhosts);
}

// collision fantômes
function checkGhostCollision() { // vérifie si Pac-Man entre en collision avec un fantôme
  const pacCol = Math.floor(pacX/cellSize);
  const pacRow = Math.floor(pacY/cellSize);
  ghosts.forEach(g => {
    if(g.x===pacCol && g.y===pacRow){
      lives--;
      livesDisplay.textContent = 'Vies : ' + lives;
      pacX = 13*cellSize; pacY = 12*cellSize;
      updatePacmanPosition();
      if(lives<=0){
        alert("Game Over ! T'es éclaté au sol frr !");
        resetGame();
      }
    }
  });
}

// boucle principale du jeu (game loop)
function gameLoop() {
  frameCounter++;
  if(frameCounter<moveDelay){ requestAnimationFrame(gameLoop); return; }
  frameCounter=0;

  if(desiredDirection && canMove(pacX,pacY,desiredDirection)) currentDirection=desiredDirection; // changement de direction si possible

  if(currentDirection && canMove(pacX,pacY,currentDirection)){ // déplacement si possible sinon dès que possible
    if(currentDirection==='ArrowUp') pacY-=cellSize;
    if(currentDirection==='ArrowDown') pacY+=cellSize;
    if(currentDirection==='ArrowLeft') pacX-=cellSize;
    if(currentDirection==='ArrowRight') pacX+=cellSize;
  }

  if(pacX<0) pacX=(carte[0].length-1)*cellSize;
  if(pacX>=carte[0].length*cellSize) pacX=0;

  updatePacmanPosition();
  checkPacgomme();
  checkGhostCollision();

  requestAnimationFrame(gameLoop);
}

// reset du jeu (après game over ou victoire)
function resetGame() {
  gameContainer.innerHTML = '';
  score=0; lives=3;
  scoreDisplay.textContent='Score : '+score;
  livesDisplay.textContent='Vies : '+lives;

  generateMap();
  generatePacgommes();
  createGhosts();
  pacX=13*cellSize; pacY=12*cellSize;
  gameContainer.appendChild(pacman);
  updatePacmanPosition();
}

// generation de la map (dessin)
function generateMap() {
  carte.forEach((row,y)=>{ // pour chaque ligne
    row.forEach((cell,x)=>{ // pour chaque cellule
      const div=document.createElement('div');
      div.classList.add('cell');
      div.classList.add(cell===1?'wall':'empty');
      div.style.left=x*cellSize+'px';
      div.style.top=y*cellSize+'px';
      gameContainer.appendChild(div);
    });
  });
}

// debut du jeu au clic apres le screen de démarrage
startScreen.addEventListener('click', ()=>{ // start game on click
  startScreen.style.display='none';
  if(bgMusic.paused) bgMusic.play().catch(()=>{});
  generateMap();
  generatePacgommes();
  createGhosts();
  gameContainer.appendChild(pacman);
  updatePacmanPosition();
  requestAnimationFrame(gameLoop);
  requestAnimationFrame(moveGhosts);
});
