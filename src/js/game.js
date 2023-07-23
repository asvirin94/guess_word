import { WORDS, KEYBORD_LETTERS } from "./consts.js";

const gameElement = document.querySelector("#game");
const logoH1 = document.querySelector(".logo");

let triesLeft;
let winCount;

const createImg = () => {
  const image = document.createElement("img");
  image.src = "images/hg-0.png";
  image.alt = "hangman image";
  image.classList.add("hangman-image");
  image.id = "hangman-image";

  return image;
};

const createPlaceholdersHTML = () => {
  const word = sessionStorage.getItem("word");
  const arrayFromWord = Array.from(word);

  const placeHoldersHTML = arrayFromWord.reduce(
    (acc, _, i) => acc + `<h1 class='letter' id='letter_${i}'> _ </h1>`,
    ""
  );
  return `<div id='placeholders' class='placeholders-wrapper'>${placeHoldersHTML}</div>`;
};

const createKeybord = () => {
  const keyboard = document.createElement("div");
  keyboard.classList.add("keyboard");

  const keyboardHTML = KEYBORD_LETTERS.reduce((acc, curr) => {
    return (
      acc + `<button class='keyboard-button' id='${curr}'>${curr}</button>`
    );
  }, "");

  keyboard.innerHTML = keyboardHTML;
  return keyboard;
};

const checkLetter = (letter) => {
  const word = sessionStorage.getItem("word");
  const inputLetter = letter.toLowerCase();

  if (!word.includes(inputLetter)) {
    const triesCounter = document.querySelector("#tries-left");
    triesLeft--;
    if (triesLeft === 0) {
      stopGame("lose");
    }
    triesCounter.innerText = triesLeft;

    const hangmanImg = document.querySelector("#hangman-image");
    hangmanImg.src = `images/hg-${10 - triesLeft}.png`;
  } else {
    const wordArray = Array.from(word);
    wordArray.forEach((currentLetter, i) => {
      if (currentLetter === inputLetter) {
        winCount++;
        if (winCount === word.length) {
          stopGame("win");
          return;
        }
        document.querySelector(`#letter_${i}`).innerText =
          inputLetter.toUpperCase();
      }
    });
  }
};

const stopGame = (status) => {
  document.querySelector(".placeholders-wrapper").remove();
  document.querySelector("#tries").remove();
  document.querySelector(".keyboard").remove();
  document.querySelector(".quit-button").remove();

  const word = sessionStorage.getItem("word");

  if (status === "win") {
    document.querySelector(".hangman-image").src = "images/hg-win.png";
    document.querySelector("#game").innerHTML +=
      '<h2 class="result-header win"> You won </h2>';
  } else if (status === "lose") {
    document.querySelector("#game").innerHTML +=
      '<h2 class="result-header lose"> You lost </h2>';
  } else {
    document.querySelector("#hangman-image").remove();
  }

  document.querySelector(
    "#game"
  ).innerHTML += `<p class='result-word'> The word was: ${word} </p><button class='play-again-button'>Play Again?</button>`;

  document.querySelector(".play-again-button").onclick = startGame;
};

export const startGame = () => {
  triesLeft = 10;
  winCount = 0;

  logoH1.classList.add("logo-sm");

  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  sessionStorage.setItem("word", wordToGuess);

  const keyboardElement = createKeybord();
  keyboardElement.addEventListener("click", (evt) => {
    if (evt.target.tagName.toLowerCase() === "button") {
      evt.target.disabled = true;
      checkLetter(evt.target.id);
    }
  });

  gameElement.innerHTML = createPlaceholdersHTML();
  gameElement.innerHTML += `<p id='tries' class='mt-2'>TRIES LEFT: <span id='tries-left' class='font-medium text-indigo-600'> 10 </span></p>`;

  const hangmanImg = createImg();

  gameElement.prepend(hangmanImg);
  gameElement.appendChild(keyboardElement);

  gameElement.insertAdjacentHTML(
    "beforeend",
    '<button class="quit-button"> Quit </button>'
  );

  document.querySelector(".quit-button").addEventListener("click", () => {
    const isSure = confirm("Sure?");
    if (isSure) {
      stopGame("Quit");
    }
  });
};
