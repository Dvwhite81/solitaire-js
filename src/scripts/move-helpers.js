import { BLACKS, REDS } from './card-helpers';
import {
  cardSlots,
  deckPile,
  discardPile,
  getCardInfo,
  handleDiscardDisplay,
  handleOneCardSlotImgs,
  turnFaceUp
} from './dom-helpers';
import { isValidToClick } from './game-helpers';

const getPossibleMoves = (card) => {
  const { value, color } = getCardInfo(card);
  const suit = card.getAttribute('suit');
  const validSuits = color === 'red' ? BLACKS : REDS;
  // Checking ace slots first, so one less
  let validNumber = value - 1;

  if (value === 14) {
    addToAceSlot(card, suit);
    // just to avoid shaking for no valid moves
    return ['ace'];
  } else if (value === 13) {
    return handleKing(card, suit);
  } else if (canAddToAceSlot(suit, validNumber)) {
    addToAceSlot(card, suit);
  } else {
    validNumber = value + 1;
    return getNormalMoves(validSuits, validNumber);
  }
};

const canAddToAceSlot = (suit, validNumber) => {
  if (validNumber === 1) {
    validNumber = 14;
  }
  console.log('validNumber:', validNumber);
  const suitedAceSlot = document.querySelector(`#${suit}-ace-slot`);
  console.log('suitedAceSlot:', suitedAceSlot);
  const { children } = suitedAceSlot;
  console.log('children:', children);
  const { length } = children;
  console.log('children:', children);
  if (length > 0) {
    const lastCard = [...children][length - 1];
    console.log('lastCard:', lastCard);
    const lastValue = Number(lastCard.getAttribute('value'));
    console.log('lastValue:', lastValue);
    console.log('validNumber again:', validNumber);
    console.log('lastValue === validNumber:', lastValue === validNumber);
    return lastValue === validNumber;
  }
};

const getNormalMoves = (validSuits, validNumber) => {
  const moves = [];
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

const addToAceSlot = (card, suit) => {
  console.log('addToAceSlot card:', card);
  console.log('addToAceSlot suit:', suit);
  const { parentElement } = card;
  card.remove();
  document.querySelector(`#${suit}-ace-slot`).append(card);
  turnFaceUp(card);
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

export { cardsAfterAreInOrder, getPossibleMoves, moveCard };
