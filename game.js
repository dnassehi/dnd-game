const locations = [
  { name: "Kroneskogen", character: "Kia", prompt: "Du må finne nøkkelen som åpner porten." },
  { name: "Grått Slott", character: "Mini", prompt: "Hvilket tall kommer neste i rekken: 2, 4, 8, 16, ?" },
  { name: "Tåkemyra", character: "Kia", prompt: "Finn ordet som mangler: Jeg er ... som natten." },
  { name: "Solklippen", character: "Mini", prompt: "Hva kan du fange men aldri kaste?" },
  { name: "Glemselens Hule", character: "Kia", prompt: "Hvilket dyr går på fire bein om morgenen, to om dagen og tre om kvelden?" }
];

let currentIndex = 0;
let visited = [];

function renderMap() {
  const map = document.getElementById("game-map");
  map.innerHTML = "";
  locations.forEach((loc, index) => {
    const div = document.createElement("div");
    div.className = "location" + (index === currentIndex ? " active" : "");
    div.innerText = loc.name;
    div.onclick = () => {
      currentIndex = index;
      showDialogue(loc);
    };
    map.appendChild(div);
  });
}

function showDialogue(location) {
  document.getElementById("dialogue").innerText =
    `Her møter du ${location.character}. Hun sier: "${location.prompt}"`;

  // Her kan du koble til OpenAI API (GPT) for respons senere.
  document.getElementById("puzzle").innerHTML = `
    <button onclick="solvePuzzle()">Svar</button>
  `;
}

function solvePuzzle() {
  if (!visited.includes(currentIndex)) {
    visited.push(currentIndex);
  }

  if (visited.length === locations.length) {
    endGame();
  } else {
    alert("Bra jobbet! Gå videre.");
  }
}

function endGame() {
  document.getElementById("dialogue").innerText = "Du finner vennen din! Han husker deg og gråter av glede!";
  document.getElementById("puzzle").innerHTML = "<strong>Eventyret er fullført.</strong>";
  document.getElementById("ending-music").play();
  document.body.style.backgroundImage = "url('final-scene.jpg')";
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    currentIndex = (currentIndex + 1) % locations.length;
    renderMap();
  } else if (e.key === "ArrowLeft") {
    currentIndex = (currentIndex - 1 + locations.length) % locations.length;
    renderMap();
  } else if (e.key === "Enter") {
    showDialogue(locations[currentIndex]);
  }
});

renderMap();