# 🧙 Letingen etter barndomsvennen – et D&D-inspirert HTML-spill

Et enkelt, tekstbasert eventyrspill laget med HTML, CSS og JavaScript – inspirert av klassisk Dungeons & Dragons. Spilleren reiser mellom fem steder og møter karakterer som gir AI-genererte oppgaver. Målet: å finne sin tapte barndomsvenn.

---

## 🔧 Funksjoner

- 🎮 Navigasjon med piltaster og Enter
- 🧩 Dynamiske gåter og dialoger generert av OpenAI GPT
- 🎵 Dramatisk slutt med musikk, animasjon og grafikk
- 🔁 Spill igjen-knapp

---

## 📁 Mappestruktur

dnd-game/ \
├── assets/ \
│   ├── final-scene.jpg \
│   └── dramatic\_music.mp3 \
├── index.html \
├── styles.css \
├── game.js \
├── server.js \
├── .env \
├── .gitignore \
├── package.json 

---

## 🚀 Slik kjører du spillet lokalt

### 1. Klon repoet

```bash
git clone https://github.com/dnassehi/dnd-game.git
cd dnd-game
````

### 2. Installer avhengigheter

```bash
npm init -y
npm install express cors dotenv openai
```

### 3. Legg til `.env`

Opprett en fil `.env` i prosjektroten med din egen OpenAI-nøkkel:

```
OPENAI_API_KEY=sk-xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
```

> *NB: Denne filen er ignorert via `.gitignore` og skal aldri pushes til GitHub.*

---

## 🧠 Kjør backend-server (Node.js)

```bash
npm start
```

Eller:

```bash
node server.js
```

Serveren starter på:

```
http://localhost:3000
```

---

## 🌐 Kjør frontend (HTML/JS)

### Alternativ A: Python webserver

```bash
python3 -m http.server 8000
```

Åpne i nettleser:

```
http://localhost:8000
```

### Alternativ B: Live Server (VS Code)

1. Installer **Live Server**-utvidelsen
2. Høyreklikk på `index.html` → "Open with Live Server"

---

## 🎮 Spillet

* Bruk **piltastene ←/→** for å bevege deg mellom steder
* Trykk **Enter** for å samhandle med karakteren
* Når alle 5 steder er besøkt → **final scene**
* Musikk og sluttgrafikk aktiveres automatisk

---

## ✨ Eksempelbilde av finalescene

> Se `assets/final-scene.jpg`. Generert med AI for å understøtte den dramatiske avslutningen.

---

## 📜 Lisens

Dette prosjektet utgis under _MIT License_ 
