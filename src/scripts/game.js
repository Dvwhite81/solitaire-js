import { getShuffledDeck } from './card-helpers';
import {
  cardSlots,
  clearBoard,
  deckPile,
  getFaceDownCount,
  hideShuffleButton,
  openModal,
  resetBtn
} from './dom-helpers';
import { addCardListeners, addDeckListeners, dealCards, placeDeck } from './game-helpers';

let deck;
let isShrunk;
let cardCount;
let tries;

const setup = () => {
  deck = getShuffledDeck();
  isShrunk = false;
  // Face down cards to check for moves after round
  cardCount = 21;
  tries = 0;
  placeDeck(deck, deckPile);
  dealCards(deck, cardSlots);
  startGame();
};

const startGame = () => {
  addDeckListeners();
  resetBtn.addEventListener('click', resetGame);
  resetBtn.style.display = 'none';
  setTimeout(() => {
    addCardListeners();
  }, 2500);
};

const endGame = () => {
  openModal();
};

const resetGame = () => {
  clearBoard();
  hideShuffleButton();
  setup();
};

const setIsShrunk = (bool) => {
  isShrunk = bool;
};

const getIsShrunk = () => {
  return isShrunk;
};

const checkCardCountToGiveUp = () => {
  const count = getFaceDownCount();
  if (count === cardCount) {
    tries++;
    if (tries === 2) {
      resetBtn.style.display = 'flex';
    }
  } else {
    cardCount = count;
    tries = 0;
  }
};

export { checkCardCountToGiveUp, endGame, getIsShrunk, resetGame, setIsShrunk, setup };
