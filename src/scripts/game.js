import { getShuffledDeck } from './card-helpers';
import { cardSlots, deckPile } from './dom-helpers';
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
  setTimeout(() => {
    addCardListeners();
  }, 2500);
};

export default setup;
