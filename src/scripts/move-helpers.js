import { BLACKS, REDS } from './card-helpers';
import {
  cardSlots,
  deckPile,
  discardPile,
  getCardInfo,
  getCardsAfter,
  handleDiscardDisplay,
  handleOneCardSlotImgs,
  isFaceUp,
  isLast,
  moveIsToAceSlot,
  moveIsToEmptyCardSlot,
  turnFaceUp
} from './dom-helpers';
import { handleOffScreen } from './game';
import { checkGameOver, getLengthAndIndex } from './game-helpers';

const getPossibleMoves = (card, isCheck) => {
  const moves = [];
  const { parentElement } = card;
  const { value, color } = getCardInfo(card);
  const suit = card.getAttribute('suit');
  const validSuits = color === 'red' ? BLACKS : REDS;
  let validNumber = value - 1;

  // Cards already in ace slot - can only move to card slots
  if (parentElement.classList.contains('ace-slot')) {
    // False for isStack
    const normalMoves = getNormalMoves(validSuits, value + 1, false);
    if (normalMoves && normalMoves.length > 0) {
      moves.push(...normalMoves);
    }
    // Ace and adding to ace slots
  } else if (isValidAceSlotMove(card, parentElement, value, suit, validNumber)) {
    const suitedAceSlot = document.querySelector(`#${suit}-ace-slot`);
    moves.push(suitedAceSlot);
    // King - moving to empty card slots
  } else if (value === 13) {
    moves.push(...getKingMoves());
  } else {
    validNumber = value + 1;
    // False for isStack
    const normalMoves = getNormalMoves(validSuits, validNumber, false);
    if (normalMoves && normalMoves.length > 0) {
      moves.push(...normalMoves);
    }
    const stackMoves = getStacksToMove(card, value, color);
    if (stackMoves && stackMoves.length > 0) {
      handleStackMoves(validSuits, validNumber, parentElement, [card, ...stackMoves], isCheck);
    }
  }
  return moves;
};

const isValidAceSlotMove = (card, parentElement, value, suit, validNumber) => {
  const { length, index } = getLengthAndIndex(card, parentElement);
  return value === 14 || (isLast(index, length) && canAddToAceSlot(suit, validNumber));
};

const handleMove = (card, move) => {
  if (moveIsToAceSlot(move)) {
    addToAceSlot(card, move);
  } else if (moveIsToEmptyCardSlot(move)) {
    // true for isSlot
    moveCard(card, move, true);
  } else {
    moveCard(card, move, false);
  }
};

const canAddToAceSlot = (suit, validNumber) => {
  if (validNumber === 1) {
    validNumber = 14;
  }
  const suitedAceSlot = document.querySelector(`#${suit}-ace-slot`);
  const { children } = suitedAceSlot;
  const { length } = children;
  if (length > 0) {
    const lastCard = [...children][length - 1];
    const lastValue = Number(lastCard.getAttribute('value'));
    return lastValue === validNumber;
  }
};

const getNormalMoves = (validSuits, validNumber, isStack) => {
  const moves = [];
  for (const suit of validSuits) {
    const targets = [...document.querySelectorAll(`[value="${validNumber}"]`)].filter(
      (c) => c.getAttribute('suit') === suit
    );
    for (const target of targets) {
      if (
        !target.parentElement.classList.contains('ace-slot') &&
        isAValidTarget(target) &&
        (!isStack || (isStack && !target.parentElement.classList.contains('ace-slot')))
      )
        moves.push(target);
    }
  }
  return moves;
};

const getStacksToMove = (card, value, color) => {
  const nextCards = getCardsAfter(card);
  if (cardsAfterAreInOrder(nextCards, value, color)) {
    return nextCards;
  }
  return [];
};

const handleStackMoves = (validSuits, validNumber, parentElement, cards, isCheck) => {
  // True for isStack
  const moves = getNormalMoves(validSuits, validNumber, true);
  if (moves && moves.length > 0) {
    const move = filterMoves(moves);
    if (isCheck) {
      return move;
    } else {
      moveStack(cards, move, parentElement);
    }
  } else {
    return;
  }
};

const filterMoves = (moves) => {
  let move;
  let isValid = false;
  let i = 0;
  while (!isValid) {
    if (i >= moves.length) {
      return;
    }
    move = moves[i].parentElement;
    if (move.classList.contains('card-slot')) {
      isValid = true;
    }
  }
  return move;
};

const moveStack = (cards, move, parentElement) => {
  for (const card of cards) {
    setTimeout(() => {
      card.remove();
      const { style } = card;
      style.setProperty('margin-left', 0);
      move.append(card);
      handleOffScreen();
      handleOneCardSlotImgs(parentElement);
    }, 50);
  }
  checkGameOver();
  handleOneCardSlotImgs(move);
};

const isAValidTarget = (target) => {
  const { parentElement } = target;
  const { length, index } = getLengthAndIndex(target, parentElement);
  return parentElement !== discardPile && parentElement !== deckPile && isLast(index, length) && isFaceUp(target);
};

const addToAceSlot = (card, move) => {
  const { parentElement } = card;
  card.remove();
  const { style } = card;
  style.setProperty('margin-left', 0);
  move.append(card);
  turnFaceUp(card);
  if ([...cardSlots].includes(parentElement)) {
    handleOneCardSlotImgs(parentElement);
  }
  if (parentElement === discardPile) {
    handleDiscardDisplay(true);
  }
  handleOffScreen();
  checkGameOver();
};

const getKingMoves = () => {
  const moves = [];
  for (const slot of cardSlots) {
    if (slot.children.length === 0) {
      moves.push(slot);
    }
  }
  return moves;
};

const moveCard = (card, move, isSlot) => {
  const { parentElement } = card;

  // For kings with stack
  if (isKingStackMove(card, move)) {
    const { value, color } = getCardInfo(card);
    // Move stack
    const stackMoves = getStacksToMove(card, value, color);
    const cards = [card, ...stackMoves];
    moveStack(cards, move, parentElement);
  }

  card.remove();
  const { style } = card;
  style.setProperty('margin-left', 0);

  if (parentElement === discardPile) {
    handleDiscardDisplay(true);
  }

  if (isSlot) {
    move.append(card);
    handleOneCardSlotImgs(move);
  } else {
    const newParent = move.parentElement;
    newParent.append(card);
    handleOneCardSlotImgs(newParent);
  }
  handleOneCardSlotImgs(parentElement);
  checkGameOver();
  handleOffScreen();
};

const cardsAfterAreInOrder = (nextCards, currentValue, currentColor) => {
  let inOrder = true;
  if (!nextCards || nextCards.length === 0) {
    return;
  }
  let validNumber = currentValue - 1;
  for (const next of nextCards) {
    const { value, color } = getCardInfo(next);
    if (fitsPatternDown(color, currentColor, value, validNumber)) {
      currentColor = color;
      validNumber--;
    } else {
      inOrder = false;
    }
  }
  return inOrder;
};

const fitsPatternDown = (color, currentColor, value, validNumber) => {
  return color !== currentColor && value === validNumber;
};

const isKingStackMove = (card, move) => {
  let isStack = false;
  const isKing = card.getAttribute('rank') === 'king';
  if (!isKing) {
    return;
  }
  const { value, color } = getCardInfo(card);
  const { parentElement } = move;
  const isToAceSlot = moveIsToAceSlot(parentElement);

  const stackMoves = getStacksToMove(card, value, color);
  if (stackMoves && stackMoves.length > 0) {
    isStack = true;
  }
  return isKing && !isToAceSlot && isStack ? true : false;
};

export { cardsAfterAreInOrder, getPossibleMoves, handleMove, moveCard };
