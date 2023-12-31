import { convertToNewCard, createCard, discardPile, hideShuffleButton } from './dom-helpers';
import { checkCardCountToGiveUp } from './game';
import { addCardListeners, placeDeck } from './game-helpers';

const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
const NAMES = ['two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine', 'ten', 'jack', 'queen', 'king', 'ace'];
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
const REDS = ['diamonds', 'hearts'];
const BLACKS = ['clubs', 'spades'];

const createDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const [j, rank] of RANKS.entries()) {
      const value = VALUES[j];
      const card = { suit, rank, value };
      const cardElement = createCard(card);
      deck.push(cardElement);
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  const length = deck.length - 1;
  for (let i = length; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const getShuffledDeck = () => {
  const deck = createDeck();
  return shuffleDeck(deck);
};

const reshuffleDeck = () => {
  checkCardCountToGiveUp();
  const deck = [];
  const { children } = discardPile;
  const { length } = children;
  for (let i = 0; i < length; i++) {
    const child = children[i];
    if (child) {
      const card = convertToNewCard(child);
      deck.push(card);
    }
  }
  discardPile.innerHTML = '';
  deck.reverse();
  placeDeck(deck);
  hideShuffleButton();
  addCardListeners();
};

export { BLACKS, getShuffledDeck, NAMES, RANKS, REDS, reshuffleDeck, SUITS, VALUES };
