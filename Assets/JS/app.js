// Array med ord til spillet
const words = [
  "javascript", "node-js", "express", "browser", "server",
  "database", "frontend", "backend", "fullstack", "async"
];
const maxWrong = 6;

// DOM elements fra HTML
const maskedEl = document.getElementById("maskedWord");
const wrongCountEl = document.getElementById("wrongCount");
const wrongLettersEl = document.getElementById("wrongLetters");
const statusText = document.getElementById("statusText");
const letterInput = document.getElementById("letterInput");
const guessBtn = document.getElementById("guessBtn");
const restartBtn = document.getElementById("restartBtn");
document.getElementById("maxWrong").textContent = maxWrong;

// Game state object
let game = {
  secret: "",
  revealed: [],
  wrongLetters: [],
  wrongCount: 0,
  finished: false
};
// RegExp for at tjekke om et tegn er et bogstav 
function isLetter(ch) {
  return /^[a-zæøå]$/i.test(ch);
}
// Start et nyt spil
function startNewGame() {
  game.secret = words[Math.floor(Math.random() * words.length)];
  game.revealed = [...game.secret].map(ch => (isLetter(ch) ? "_" : ch));
  game.wrongLetters = [];
  game.wrongCount = 0;
  game.finished = false;
  updateUI();
}
// Opdater UI baseret på spillets tilstand
function updateUI() {
  maskedEl.textContent = game.revealed.join(" ");
  wrongCountEl.textContent = game.wrongCount;
  if (game.wrongLetters.length > 0) {
  wrongLettersEl.textContent = game.wrongLetters.join(", ");
} else {
  wrongLettersEl.textContent = "—";
}

  if (game.finished && game.wrongCount >= maxWrong) {
    statusText.textContent = `Du tabte. Ordet var: ${game.secret}`;
  } else if (game.finished) {
    statusText.textContent = `Du vandt! Ordet var: ${game.secret}`;
  } else {
    statusText.textContent = "Spil i gang";
  }
}

function handleGuess(letter) {
letter = letter.toLowerCase();
// Hvis spillet er færdigt eller input ikke er et bogstav: ignorer (return)
  if (game.finished || !isLetter(letter)) {
    // Man kunne sende en besked til brugeren her
  return;
    }
  // Hvis allerede gættet: ignorer (return)
  if (game.revealed.includes(letter) || game.wrongLetters.includes(letter)) {
    // Man kunne sende en besked til brugeren her
    return;
  }
    // Hvis bogstavet er i det hemmelige ord:  Lægges til i revealed arrayet
  if (game.secret.includes(letter)) {
    for (let i = 0; i < game.secret.length; i++) {
      if (game.secret[i].toLowerCase() === letter) {
        game.revealed[i] = game.secret[i];
      }
    }
    // Hvis bogstavet ikke er i det hemmelige ord: Lægges til i wrongLetters og wrongCount øges med 1
  } else {
    game.wrongLetters.push(letter);
    game.wrongCount++;
  }
  // Her tkjekkes om spillet er færdigt ved at se om der stadig er "_" i revealed arrayet
  if (!game.revealed.includes("_")) game.finished = true;
  // Her tjekkes om antallet af forkerte gæt er nået maxWrong
  if (game.wrongCount >= maxWrong) game.finished = true;

  updateUI();
}
// Events
guessBtn.addEventListener("click", () => {
  const val = letterInput.value.trim();
  if (val) {
    handleGuess(val[0]);
    letterInput.value = "";
    letterInput.focus();
  }
});

restartBtn.addEventListener("click", startNewGame);

startNewGame();
