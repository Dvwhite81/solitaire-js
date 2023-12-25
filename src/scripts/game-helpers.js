import { handleAutoFinish } from './auto-finish';
import {
  aceSlots,
  cardSlots,
  deckContainer,
  deckPile,
  discardPile,
  getCardInfo,
  getCardsAfter,
  handleCardSlotImgs,
  handleDeckCard,
  handleDiscardDisplay,
  isFaceUp,
  isLast,
  showShuffleButton,
  shuffleBtn,
  updateDeckCount
} from './dom-helpers';
import { endGame } from './game';
import { cardsAfterAreInOrder, getPossibleMoves, handleMove } from './move-helpers';

const placeDeck = (deck) => {
  const { length } = deck;
  for (const card of deck) {
    deckPile.append(card);
  }

  updateDeckCount(length);
};

const dealCards = async (deck, slots) => {
  let count = 0;
  let slotIndex = 0;

  while (slotIndex < slots.length) {
    for (let i = slotIndex; i < slots.length; i++) {
      setTimeout(() => {
        dealOneCard(deck, slots, i);
        handleCardSlotImgs(slots, true);
      }, count * 100);
      count++;
    }
    slotIndex++;
  }
};

const dealOneCard = (deck, slots, i) => {
  const cardToDeal = handleDeckCard(deck);
  const slot = slots[i];
  slot.append(cardToDeal);
};

const flipCard = (e) => {
  const deck = [...deckPile.children];
  if (e.target === shuffleBtn) {
    return;
  }
  const cardToFlip = handleDeckCard(deck);
  discardPile.append(cardToFlip);
  handleDiscardDisplay(false);
  checkForShuffle();
};

const addDeckListeners = () => {
  deckContainer.addEventListener('click', flipCard);
};

const removeDeckListeners = () => {
  deckContainer.removeEventListener('click', flipCard);
};

const addCardListeners = () => {
  const cards = document.querySelectorAll('.card');
  for (const card of cards) {
    card.addEventListener('click', handleCardClick);
  }
};

const handleCardClick = (e) => {
  const card = e.target.nodeName === 'IMG' ? e.target.parentElement : e.target;
  const { parentElement } = card;
  if (parentElement === deckPile) {
    return;
  }
  if (isValidToClick(card, parentElement)) {
    handleValidCardClick(card);
  }
};

const isValidToClick = (card, parent) => {
  const { length, index } = getLengthAndIndex(card, parent);
  const { value, color } = getCardInfo(card);
  const nextCards = getCardsAfter(card);
  return (isLast(index, length) || cardsAfterAreInOrder(nextCards, value, color)) && isFaceUp(card);
};

const handleValidCardClick = (card) => {
  // False for isCheck
  const possibleMoves = getPossibleMoves(card, false);
  if (possibleMoves && possibleMoves.length > 0) {
    const move = possibleMoves[0];
    handleMove(card, move);
  } else {
    // Make a shake "no" animation
    card.classList.add('shake');
    setTimeout(() => {
      card.classList.remove('shake');
    }, 1000);
  }
};

const checkForShuffle = () => {
  const { length } = deckPile.children;
  if (length === 0) {
    showShuffleButton();
  }
};

const getLengthAndIndex = (card, parent) => {
  const { children } = parent;
  const { length } = children;
  const index = [...children].indexOf(card);
  return { length, index };
};

const checkForAutoFinish = () => {
  let readyToFinish = true;
  for (const slot of cardSlots) {
    const { children } = slot;
    if (!allFaceUp(children)) {
      readyToFinish = false;
    }
  }
  return readyToFinish;
};

const allFaceUp = (cards) => {
  let faceUp = true;
  for (const card of cards) {
    if (!isFaceUp(card)) {
      faceUp = false;
    }
  }
  return faceUp;
};

const checkAllAceSlotsFilled = () => {
  let gameOver = true;
  for (const slot of aceSlots) {
    const { children } = slot;
    const { length } = children;
    if (length < 13) {
      gameOver = false;
    }
  }
  return gameOver;
};

const checkGameOver = () => {
  const readyToFinish = checkForAutoFinish();
  if (readyToFinish) {
    handleAutoFinish();
  }
  const gameOver = checkAllAceSlotsFilled();
  if (gameOver) {
    endGame();
  }
};

export {
  addCardListeners,
  addDeckListeners,
  checkForAutoFinish,
  checkGameOver,
  dealCards,
  flipCard,
  getLengthAndIndex,
  isValidToClick,
  placeDeck,
  removeDeckListeners
};
