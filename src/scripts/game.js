import { getShuffledDeck } from './card-helpers';
import {
  cardSlots,
  clearBoard,
  deckPile,
  getFaceDownCount,
  hideShuffleButton,
  openModal,
  resetBtn,
  updateDeckCount
} from './dom-helpers';
import { addCardListeners, addDeckListeners, dealCards, placeDeck } from './game-helpers';

let deck;
let cardCount;
let tries;
let currentSize;
const normalSize = 20;

const setup = () => {
  deck = getShuffledDeck();
  // Face down cards to check for moves after round
  cardCount = 21;
  tries = 0;
  currentSize = normalSize;
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
  updateDeckCount(0);
  openModal();
};

const resetGame = () => {
  clearBoard();
  hideShuffleButton();
  setup();
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

const isOffScreen = (element) => {
  const bounding = element.getBoundingClientRect();
  // eslint-disable-next-line sonarjs/prefer-object-literal
  const out = {};
  out.top = bounding.top < 0;
  out.left = bounding.left < 0;
  out.bottom = bounding.bottom > (window.innerHeight || document.documentElement.clientHeight);
  out.right = bounding.right > (window.innerWidth || document.documentElement.clientWidth);
  out.any = out.top || out.left || out.bottom || out.right;
  return out.any;
};

const handleOffScreen = () => {
  const offScreen = checkAllForOffScreen();
  if (offScreen) {
    shrinkCards();
  } else {
    growCards();
  }
};

const checkAllForOffScreen = () => {
  let offScreen = false;
  const cards = document.querySelectorAll('.card');
  for (const card of cards) {
    if (isOffScreen(card)) {
      offScreen = true;
    }
  }
  return offScreen;
};

const shrinkCards = () => {
  let isGood = false;
  while (!isGood) {
    currentSize -= 1;
    setCardSize(currentSize);
    const isOffScreen = checkAllForOffScreen();
    if (!isOffScreen) {
      isGood = true;
    }
  }
};

const growCards = () => {
  const isShrunk = currentSize < normalSize;
  let tempSize;
  if (isShrunk) {
    tempSize = currentSize + 1;
    setCardSize(tempSize);
    const isOffScreen = checkAllForOffScreen();
    if (isOffScreen) {
      setCardSize(currentSize);
    } else {
      currentSize = tempSize;
      growCards();
    }
  }
};

const setCardSize = (size) => {
  const rootCss = document.querySelector(':root');
  rootCss.style.setProperty('--card-height', `${size}vh`);
};

export { checkCardCountToGiveUp, endGame, handleOffScreen, resetGame, setup };
