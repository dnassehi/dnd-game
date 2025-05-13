const locations = [
  { name: "Kroneskogen", character: "Kia" },
  { name: "Grått Slott", character: "Mini" },
  { name: "Tåkemyra", character: "Kia" },
  { name: "Solklippen", character: "Mini" },
  { name: "Glemselens Hule", character: "Kia" }
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

// 2) Lim inn prompt-malene her:
const customPrompts = {
  "Kroneskogen":      `Du er karakteren Kia. Spill en kreativ fantasyrolle i Kroneskogen og gi spilleren en gåte som handler om hemmelige stier og skjulte nøkler.`,
  "Grått Slott":      `Du er karakteren Mini. Spill portvakten i Grått Slott og gi spilleren en matematisk gåte som tester vaktens logikk.`,
  "Tåkemyra":         `Du er karakteren Kia. I den tåkete myra ber du spilleren finne det ene ordet som løfter tåken.`,
  "Solklippen":       `Du er karakteren Mini. Ved Solklippen stiller du en klassisk gåte om natur og lys.`,
  "Glemselens Hule":  `Du er karakteren Kia. Inni Glemselens Hule må spilleren løse en gåte om livets tre stadier.`
};

// 3) Deretter resten av funksjonene, f.eks.:
async function showDialogue(location) {
  const dialogueEl = document.getElementById("dialogue");
  const puzzleEl   = document.getElementById("puzzle");

  dialogueEl.innerText = "Laster oppgave…";
  puzzleEl.innerHTML  = "";

  // Velg om vi har en custom prompt, ellers fallback:
  const promptToSend = customPrompts[location.name] ||
    `Du er ${location.character} ved ${location.name}. Lag en fantasigåte uten å avsløre løsningen.`;

  try {
    const resp = await fetch("http://localhost:3000/api/prompt", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        character: location.character,
        location:  location.name,
        prompt:    promptToSend     // send også prompten, om du ønsker
      })
    });
    const { text } = await resp.json();
    dialogueEl.innerText = `Her møter du ${location.character}: „${text}“`;
  } catch (err) {
    console.error(err);
    dialogueEl.innerText = "Beklager, det skjedde en feil ved henting av oppgaven.";
  }

  puzzleEl.innerHTML = `<button onclick="solvePuzzle()">Svar</button>`;
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
  // 1) Endre dialog-tekst
  document.getElementById("dialogue").innerText =
    "Du finner vennen din! Han husker deg og gråter av glede!";

  // 2) Vis kun fullført-melding
  document.getElementById("puzzle").innerHTML =
    "<strong>Eventyret er fullført.</strong>";

  // 3) Spill av musikk fra starten og juster volum
  const music = document.getElementById("ending-music");
  music.currentTime = 0;
  music.volume = 0.7;
  music.play();

  // 4) Legg på CSS-klassen som setter final-scene bakgrunn
  document.body.classList.add("end");
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