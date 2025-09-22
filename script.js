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

// Score 
let score = 0;
const scoreDisplay = document.getElementById('score');

const pacgommes = [];

// génere la carte (la dessine)
carte.forEach((row, y) => {
  row.forEach((cell, x) => {
    // Création d'un div pour chaque case (comme pour une ligthbox pour un site internet mais pour des cases)
    const div = document.createElement('div');
    div.classList.add('cell');

    // Si la case est un mur
    if(cell === 1) div.classList.add('wall');
    else div.classList.add('empty');
    
    div.style.left = x * cellSize + 'px';
    div.style.top = y * cellSize + 'px';
    gameContainer.appendChild(div);

    
    if(cell === 2){ // Si la case est une pacgomme dans le tableau (=2)
      const pacgomme = document.createElement('div');
      pacgomme.classList.add('pacgomme');

      pacgomme.dataset.x = x;
      pacgomme.dataset.y = y;

     
      pacgomme.style.left = x * cellSize + cellSize/2 + 'px'; // centre de la case
      pacgomme.style.top = y * cellSize + cellSize/2 + 'px';

      gameContainer.appendChild(pacgomme);
      pacgommes.push(pacgomme); 
    }
  });
});

// pacman
const pacman = document.createElement('div');
pacman.id = 'pacman';


let pacX = 14 * cellSize;  // spawn 
let pacY = 13 * cellSize;

gameContainer.appendChild(pacman);


function updatePacmanPosition() {  // maj  l'affichage de Pac-Man
  pacman.style.left = pacX + 'px';
  pacman.style.top = pacY + 'px';
}
updatePacmanPosition();


let currentDirection = null;   
let desiredDirection = null;  
const moveDelay = 6;          // vitesse de déplacement 
let frameCounter = 0;          


document.addEventListener('keydown', (e) => {   // écouteur d'évenement pour le deplacment avec le clavier 
  if(['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) {
    desiredDirection = e.key;
  }
});


function canMove(dir) { // si pacman ce deplace
  let col = Math.floor(pacX / cellSize);
  let row = Math.floor(pacY / cellSize);

  if(dir === 'ArrowUp') row -= 1;
  if(dir === 'ArrowDown') row += 1;
  if(dir === 'ArrowLeft') col -= 1;
  if(dir === 'ArrowRight') col += 1;


  if(col < 0) col = carte[0].length -1;  // gestion tp (tunnels)
  if(col >= carte[0].length) col = 0;

  
  return carte[row][col] !== 1;
}

function checkPacgomme() {  // gestion pacgommes
  
  const col = Math.floor(pacX / cellSize);
  const row = Math.floor(pacY / cellSize);

  for(let i = pacgommes.length-1; i>=0; i--){
    const p = pacgommes[i];


    if(Number(p.dataset.x) === col && Number(p.dataset.y) === row){    // Si PacMan est sur la même case qu'une pacgomme
      p.remove();                   // on supprime la pacgomme
      pacgommes.splice(i, 1);       // supp de la liste 2d
      score += 1;                   // on ajoute 1 point
      scoreDisplay.textContent = 'Score: ' + score; 
    }
  }
}

//boucle du jeu 
function gameLoop() {
  frameCounter++;

  // On attend "moveDelay" frames avant de bouger Pac-Man
  if(frameCounter < moveDelay) {
    requestAnimationFrame(gameLoop);
    return;
  }
  frameCounter = 0;

  if(desiredDirection && canMove(desiredDirection)) {
    currentDirection = desiredDirection;
  }

  if(currentDirection && canMove(currentDirection)) {
    if(currentDirection === 'ArrowUp') pacY -= cellSize;
    if(currentDirection === 'ArrowDown') pacY += cellSize;
    if(currentDirection === 'ArrowLeft') pacX -= cellSize;
    if(currentDirection === 'ArrowRight') pacX += cellSize;
  }

  if(pacX < 0) pacX = (carte[0].length -1) * cellSize;
  if(pacX >= carte[0].length * cellSize) pacX = 0;

  
  updatePacmanPosition();   // Mise à jour de l'affichage

  // Vérifie si Pac-Man mange une pacgomme
  checkPacgomme();
  requestAnimationFrame(gameLoop);
}
requestAnimationFrame(gameLoop);  //boucle de lancement du jeu 

