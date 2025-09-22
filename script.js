const carte = [    // sous forme d'une liste 2d 
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

// générer la map (dessiner)
carte.forEach((row, y) => {
  row.forEach((cell, x) => {
    const div = document.createElement('div');
    div.classList.add('cell');
    if(cell === 1) div.classList.add('wall');
    else div.classList.add('empty');
    div.dataset.x = x;
    div.dataset.y = y;
    gameContainer.appendChild(div);
  });
});

// Pac-Man
const pacman = document.createElement('div');
pacman.id = 'pacman';
let pacX = 14; // position initiale en x
let pacY = 23; // position initiale en y
gameContainer.appendChild(pacman);

function updatePacmanPosition() {
  pacman.style.left = pacX * 20 + 'px';
  pacman.style.top = pacY * 20 + 'px';
}

updatePacmanPosition();

// Déplacement continu (comme dans le vrai jeu)
let direction = null;

document.addEventListener('keydown', (e) => {
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    direction = e.key;
  }
});

document.addEventListener('keyup', (e) => {
  if(e.key === direction) {
    direction = null;
  }
});

// Boucle pour les déplacements
setInterval(() => {
  if(!direction) return;

  let nextX = pacX;
  let nextY = pacY;

  if(direction === 'ArrowUp') nextY--;
  if(direction === 'ArrowDown') nextY++;
  if(direction === 'ArrowLeft') nextX--;
  if(direction === 'ArrowRight') nextX++;

  // téléportation si hors limites
  if(nextX < 0) nextX = carte[0].length -1;
  if(nextX >= carte[0].length) nextX = 0;
  if(nextY < 0) nextY = carte.length -1;
  if(nextY >= carte.length) nextY = 0;

  // test collision 
  if(carte[nextY][nextX] !== 1) {
    pacX = nextX;
    pacY = nextY;
    updatePacmanPosition();
  }
}, 120); // déplace Pac-Man toutes les 120ms
