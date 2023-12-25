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

const setup = () => {
  deck = getShuffledDeck();
  isShrunk = false;
  // Face down cards to check for moves after round
  cardCount = 21;
  placeDeck(deck, deckPile);
  dealCards(deck, cardSlots);
  startGame();
};

const startGame = () => {
  addDeckListeners();
  resetBtn.addEventListener('click', resetGame);
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
    resetBtn.style.display = 'flex';
  } else {
    cardCount = count;
  }
};

export { checkCardCountToGiveUp, endGame, getIsShrunk, resetGame, setIsShrunk, setup };
