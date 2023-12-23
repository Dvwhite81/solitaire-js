import { BLACKS, REDS } from './card-helpers';
import {
  cardSlots,
  deckContainer,
  deckPile,
  discardPile,
  getCardInfo,
  handleCardSlotImgs,
  handleDeckCard,
  handleDiscardDisplay,
  handleOneCardSlotImgs,
  isFaceUp,
  isLast,
  showShuffleButton,
  shuffleBtn,
  turnFaceUp,
  updateDeckCount
} from './dom-helpers';

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
      }, count * 50);
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
  if (possibleMoves.length > 0) {
    const move = possibleMoves[0];
    moveCard(card, move);
  }
};

const getPossibleMoves = (card) => {
  const moves = [];
  const { value, color } = getCardInfo(card);
  const suit = card.getAttribute('suit');
  if (value === 14) {
    moveAce(card, suit);
  }
  if (value === 13) {
    return handleKing(card, suit);
  }
  const validSuits = color === 'red' ? BLACKS : REDS;
  const validNumber = (value + 1).toString();
  for (const suit of validSuits) {
    const targets = [...document.querySelectorAll(`[value="${validNumber}"]`)].filter(
      (c) => c.getAttribute('suit') === suit
    );
    for (const target of targets) {
      if (isAValidTarget(target)) {
        moves.push(target);
      }
    }
  }
  return moves;
};

const isAValidTarget = (target) => {
  const { parentElement } = target;
  return parentElement !== discardPile && parentElement !== deckPile && isValidToClick(target, parentElement);
};

const moveAce = (ace, suit) => {
  const { parentElement } = ace;
  ace.remove();
  document.querySelector(`#${suit}-ace-slot`).append(ace);
  turnFaceUp(ace);
  if ([...cardSlots].includes(parentElement)) {
    handleOneCardSlotImgs(parentElement);
  }
  if (parentElement === discardPile) {
    handleDiscardDisplay(true);
  }
};

const handleKing = (king, suit) => {
  console.log('handleKing');
  const { parentElement } = king;
  for (const slot of cardSlots) {
    if (slot.children.length === 0) {
      king.remove();
      slot.append(king);
      handleOneCardSlotImgs(slot);
      handleOneCardSlotImgs(parentElement);
      if (parentElement === discardPile) {
        handleDiscardDisplay(true);
      }
    }
  }
  // Implement ace slot functionality
  console.log('suit:', suit);
  return [];
};

const moveCard = (card, move) => {
  const oldParent = card.parentElement;
  if (oldParent === discardPile) {
    handleDiscardDisplay(true);
  }
  card.remove();
  const { parentElement } = move;
  parentElement.append(card);
  handleOneCardSlotImgs(oldParent);
  handleOneCardSlotImgs(parentElement);
};

const cardsAfterAreInOrder = (card, currentValue, currentColor) => {
  const validNumber = (currentValue - 1).toString();
  const nextCard = card.nextSibling;
  const { value, color } = getCardInfo(nextCard);
  let isInOrder = fitsPatternDown(color, currentColor, value, validNumber);
  if (isInOrder) {
    const { parentElement } = card;
    const { children } = parentElement;
    const { length } = children;
    const index = [...children].indexOf(nextCard);
    for (let i = index; i < length; i++) {
      const nextNextCard = children[i];
      const { value: v, color: c } = getCardInfo(nextNextCard);
      if (!fitsPatternDown(c, color, v, validNumber)) {
        isInOrder = false;
      }
    }
  }
  return isInOrder;
};

const fitsPatternDown = (color, currentColor, value, validNumber) => {
  return color !== currentColor && value === validNumber;
};

const checkForShuffle = () => {
  const { length } = deckPile.children;
  console.log('length:', length);
  if (length === 0) {
    showShuffleButton();
  }
};

export { addCardListeners, addDeckListeners, dealCards, flipCard, placeDeck, removeDeckListeners };
