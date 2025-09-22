const canvas = document.getElementById("gameCanvas");
const ctx = canvas.getContext("2d");

const tailleCase = 18; // taille d'une case en pxl

// map du jeu
// 0 = vide, 1 = mur, 2 = pacgomme, 3 = super pacgomme
const carte = [
  [1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],
  [1,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,2,1],
  [1,3,1,1,1,2,1,1,1,1,2,1,1,2,1,1,1,1,2,1,1,1,2,1,1,1,3,1],
  [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
  [1,2,1,1,1,2,1,1,2,1,1,1,1,1,1,1,1,2,1,1,2,1,1,2,1,1,2,1],
  [1,2,2,2,2,2,1,1,2,2,2,1,1,1,1,1,2,2,2,1,1,2,2,2,2,2,2,1],
  [1,1,1,1,1,2,1,1,1,1,0,0,0,0,0,0,0,1,1,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,1,2,1,1,0,0,0,0,0,0,0,0,0,0,1,1,2,1,1,0,0,0,0,0],
  [1,1,1,1,1,2,1,1,0,1,1,1,0,0,0,1,1,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,0,2,0,0,0,1,0,0,0,0,0,0,0,1,0,0,0,2,0,0,0,0,0,0],
  [1,1,1,1,1,2,1,1,0,1,0,1,1,0,1,1,0,1,0,1,1,2,1,1,1,1,1,1],
  [0,0,0,0,1,2,0,0,0,0,0,1,1,0,1,1,0,0,0,0,0,2,0,0,0,0,0,0],
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

// sprites pacman qui fonctionne pas à priori...
const pacmanImages = [
  new Image(),
  new Image(),
  new Image()
];
pacmanImages[0].src = "images/pac1.png";
pacmanImages[1].src = "images/pac2.png";
pacmanImages[2].src = "images/pac3.png";

// position initiale de PacMan
let pacmanLigne = 1;
let pacmanColonne = 1;

// animation de Pac-Man
let frameActuelle = 0;
let compteurFrames = 0;

// dessin carte
function dessinerCarte() {
  for (let ligne = 0; ligne < carte.length; ligne++) {
    for (let col = 0; col < carte[ligne].length; col++) {
      let tuile = carte[ligne][col];

      if (tuile === 1) {
        ctx.fillStyle = "blue"; // Mur
        ctx.fillRect(col * tailleCase, ligne * tailleCase, tailleCase, tailleCase);
      } else if (tuile === 2) {
        ctx.fillStyle = "white"; // Pacgomme
        ctx.beginPath();
        ctx.arc(
          col * tailleCase + tailleCase / 2,
          ligne * tailleCase + tailleCase / 2,
          3, 0, 2 * Math.PI
        );
        ctx.fill();
      } else if (tuile === 3) {
        ctx.fillStyle = "yellow"; // Super pacgomme
        ctx.beginPath();
        ctx.arc(
          col * tailleCase + tailleCase / 2,
          ligne * tailleCase + tailleCase / 2,
          6, 0, 2 * Math.PI
        );
        ctx.fill();
      }
    }
  }
}

// dessin pacman
function dessinerPacman() {
  compteurFrames++;
  if (compteurFrames % 10 === 0) {
    frameActuelle = (frameActuelle + 1) % pacmanImages.length;
  }

  ctx.drawImage(
    pacmanImages[frameActuelle],
    pacmanColonne * tailleCase,
    pacmanLigne * tailleCase,
    tailleCase, tailleCase
  );
}

function boucleDeJeu() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  dessinerCarte();
  dessinerPacman();
  requestAnimationFrame(boucleDeJeu);
}

boucleDeJeu();
