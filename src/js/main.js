import '../css/style.css';
import './utils.js'
import { startGame } from './game.js';

const startGameButton = document.querySelector('.start-button');

startGameButton.addEventListener('click', startGame)