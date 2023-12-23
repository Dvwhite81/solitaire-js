import {
  deckContainer,
  deckPile,
  discardPile,
  getCardInfo,
  handleCardSlotImgs,
  handleDeckCard,
  handleDiscardDisplay,
  isFaceUp,
  isLast,
  showShuffleButton,
  shuffleBtn,
  updateDeckCount
} from './dom-helpers';
import { cardsAfterAreInOrder, getPossibleMoves, moveCard } from './move-helpers';

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
  console.log('deck:', deck);
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
  } else {
    // Make a shake "no" animation
  }
};

const isValidToClick = (card, parent) => {
  const { children } = parent;
  const { length } = children;
  const index = [...children].indexOf(card);
  const { value, color } = getCardInfo(card);
  return (isLast(index, length) || cardsAfterAreInOrder(card, value, color)) && isFaceUp(card);
};

const handleValidCardClick = (card) => {
  const possibleMoves = getPossibleMoves(card);
  if (possibleMoves && possibleMoves.length > 0) {
    const move = possibleMoves[0];
    moveCard(card, move);
  }
};

const checkForShuffle = () => {
  const { length } = deckPile.children;
  console.log('length:', length);
  if (length === 0) {
    showShuffleButton();
  }
};

export { addCardListeners, addDeckListeners, dealCards, flipCard, isValidToClick, placeDeck, removeDeckListeners };
