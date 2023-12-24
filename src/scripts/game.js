import { getShuffledDeck } from './card-helpers';
import { cardSlots, clearBoard, deckPile, hideShuffleButton, openModal, resetBtn, shuffleBtn } from './dom-helpers';
import { addCardListeners, addDeckListeners, dealCards, placeDeck } from './game-helpers';

let deck;

const setup = () => {
  deck = getShuffledDeck();
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
  console.log('GAME OVER');
  openModal();
};

const resetGame = () => {
  clearBoard();
  hideShuffleButton();
  setup();
};

export { endGame, resetGame, setup };
