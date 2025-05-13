const locations = [
  /* … dine fem steder med name, character, prompt … */
];

let currentIndex = 0;
let visited = [];

// Tegn kartet
function renderMap() {
  /* … */
}

// Vis dialog og oppgave
function showDialogue(location) {
  /* … */
}

// Håndter svar
function solvePuzzle() {
  /* … */
}

// Avslutt spillet med musikk og grafikk
function endGame() {
  document.getElementById("dialogue").innerText =
    "Du finner vennen din! Han husker deg og gråter av glede!";
  document.getElementById("puzzle").innerHTML = "<strong>Eventyret er fullført.</strong>";
  document.getElementById("ending-music").play();
  document.body.style.backgroundImage = "url('assets/final-scene.jpg')";
}

// Piltaster og Enter
document.addEventListener("keydown", (e) => {
  /* … */
});

// Initialiser kartet
renderMap();
