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
    if(cell === 1) div.classList.add('wall');  // si on ce trouve sur un cellule 1 alors on met un murs
    else div.classList.add('empty');  // sinon on met rien (pour l'instant (on mettra des pacgommes plus tard)
    div.dataset.x = x;
    div.dataset.y = y;
    gameContainer.appendChild(div);
  });
});

// Pac-Man
const pacman = document.createElement('div');
pacman.id = 'pacman';
let pacX = 13; // spawn du pacman avec les coordonnées(l'equivalent) dans la liste 2d
let pacY = 12; 
gameContainer.appendChild(pacman);

function updatePacmanPosition() {
  pacman.style.left = pacX * 20 + 'px';
  pacman.style.top = pacY * 20 + 'px';
}

updatePacmanPosition();

// déplacement avec un écouteur d'évenement pour detecter le clavier 
document.addEventListener('keydown', (e) => {
  let nextX = pacX;
  let nextY = pacY;
  if(e.key === 'ArrowUp') nextY--;
  if(e.key === 'ArrowDown') nextY++;
  if(e.key === 'ArrowLeft') nextX--;
  if(e.key === 'ArrowRight') nextX++;

  // téléportation si hors limites
  if(nextX < 0) nextX = carte[0].length -1;
  if(nextX >= carte[0].length) nextX = 0;
  if(nextY < 0) nextY = carte.length -1;
  if(nextY >= carte.length) nextY = 0;

  // Vérifie que la prochaine case n'est pas un mur (verif continue)
  if(carte[nextY][nextX] !== 1) {
    pacX = nextX;
    pacY = nextY;
    updatePacmanPosition();   
  }
});
