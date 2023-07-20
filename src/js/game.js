import { WORDS, KEYBORD_LETTERS } from "./consts.js"

const gameElement = document.querySelector('#game');

export const startGame = () => {
    const randomIndex = Math.floor(Math.random() * WORDS.length);
    const wordToGuess = WORDS[randomIndex];
    
    sessionStorage.setItem('word', wordToGuess);
    gameElement.innerHTML = createPlaceholdersHTML();
}

const createPlaceholdersHTML = () => {
    const word = sessionStorage.getItem('word');
    const arrayFromWord = Array.from(word);

    const placeHoldersHTML = arrayFromWord.reduce((acc, _, i) => acc + `<h1 class='letter' id='${i}'> _ </h1>`, '')
    return `<div id='placeholders' class='placeholders-wrapper'>${placeHoldersHTML}</div>`;
}