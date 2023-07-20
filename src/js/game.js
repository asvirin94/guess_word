import { WORDS, KEYBORD_LETTERS } from "./consts.js";

const gameElement = document.querySelector("#game");
const logoH1 = document.querySelector(".logo");

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
    (acc, _, i) => acc + `<h1 class='letter' id='${i}'> _ </h1>`,
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

export const startGame = () => {
  logoH1.classList.add("logo-sm");
  const randomIndex = Math.floor(Math.random() * WORDS.length);
  const wordToGuess = WORDS[randomIndex];
  const keyboardElement = createKeybord();

  sessionStorage.setItem("word", wordToGuess);
  gameElement.innerHTML = createPlaceholdersHTML();
  gameElement.innerHTML += `<p id='tries' class='mt-10'>TRIES LEFT: <span id='tries-left' class='font-medium text-indigo-600'> 10 </span></p>`;
  keyboardElement.addEventListener("click", (evt) => {
    console.log(evt.target);
  });

  const hangmanImg = createImg();
  gameElement.prepend(hangmanImg);
  gameElement.appendChild(keyboardElement);
};
