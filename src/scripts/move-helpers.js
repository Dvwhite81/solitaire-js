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
import { getLengthAndIndex } from './game-helpers';

const getPossibleMoves = (card) => {
  console.log('getPossibleMoves');
  const moves = [];
  const { parentElement } = card;
  const { length, index } = getLengthAndIndex(card, parentElement);
  const { value, color } = getCardInfo(card);
  const suit = card.getAttribute('suit');
  const validSuits = color === 'red' ? BLACKS : REDS;
  let validNumber = value - 1;

  // Cards already in ace slot - can only move to card slots
  if (parentElement.classList.contains('ace-slot')) {
    console.log('PARENT IS ACE SLOT');
    // False for isStack
    const normalMoves = getNormalMoves(validSuits, validNumber, false);
    if (normalMoves && normalMoves.length > 0) {
      moves.push(...normalMoves);
    }
    // Ace and adding to ace slots
  } else if (value === 14 || (isLast(index, length) && canAddToAceSlot(suit, validNumber))) {
    console.log('first IF');
    const suitedAceSlot = document.querySelector(`#${suit}-ace-slot`);
    moves.push(suitedAceSlot);
    // King - moving to empty card slots
  } else if (value === 13) {
    console.log('second IF');
    moves.push(...getKingMoves(card, suit));
  } else {
    console.log('third ELSE');
    validNumber = value + 1;
    // False for isStack
    const normalMoves = getNormalMoves(validSuits, validNumber, false);
    if (normalMoves && normalMoves.length > 0) {
      moves.push(...normalMoves);
    }
    const stackMoves = getStacksToMove(card, value, color);
    if (stackMoves && stackMoves.length > 0) {
      handleStackMoves(validSuits, validNumber, parentElement, [card, ...stackMoves]);
    }
  }
  return moves;
};

const handleMove = (card, move) => {
  console.log('handleMove');
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
  console.log('getNormalMoves');
  const moves = [];
  for (const suit of validSuits) {
    const targets = [...document.querySelectorAll(`[value="${validNumber}"]`)].filter(
      (c) => c.getAttribute('suit') === suit
    );
    console.log('targets:', targets);
    for (const target of targets) {
      console.log('target:', target);
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
  console.log('getStacksToMove');
  const nextCards = getCardsAfter(card);
  if (cardsAfterAreInOrder(nextCards, value, color)) {
    return nextCards;
  }
  return [];
};

const handleStackMoves = (validSuits, validNumber, parentElement, cards) => {
  console.log('handleStackMoves cards:', cards);
  // True for isStack
  const moves = getNormalMoves(validSuits, validNumber, true);
  if (moves && moves.length > 0) {
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
    console.log('handleStackMoves move:', move);
    console.log('handleStackMoves cards:', cards);
    for (const card of cards) {
      setTimeout(() => {
        console.log('handleStackMoves card:', card);
        card.remove();
        move.append(card);
        handleOneCardSlotImgs(parentElement);
      }, 50);
    }
    handleOneCardSlotImgs(move);
  } else {
    return;
  }
};

const isAValidTarget = (target) => {
  console.log('isAValidTarget');
  const { parentElement } = target;
  const { length, index } = getLengthAndIndex(target, parentElement);
  return parentElement !== discardPile && parentElement !== deckPile && isLast(index, length) && isFaceUp(target);
};

const addToAceSlot = (card, move) => {
  console.log('addToAceSlot card:', card);
  console.log('addToAceSlot move:', move);
  const { parentElement } = card;
  card.remove();
  move.append(card);
  turnFaceUp(card);
  if ([...cardSlots].includes(parentElement)) {
    handleOneCardSlotImgs(parentElement);
  }
  if (parentElement === discardPile) {
    handleDiscardDisplay(true);
  }
};

const getKingMoves = (king, suit) => {
  console.log('getKingMoves');
  const moves = [];
  for (const slot of cardSlots) {
    if (slot.children.length === 0) {
      moves.push(slot);
    }
  }
  // Implement ace slot functionality
  console.log('suit:', suit);
  return moves;
};

const moveCard = (card, move, isSlot) => {
  const { parentElement } = card;
  card.remove();

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
};

const cardsAfterAreInOrder = (nextCards, currentValue, currentColor) => {
  let inOrder = true;
  console.log('cardsAfterAreInOrder nextCards:', nextCards);
  if (!nextCards || nextCards.length === 0) {
    return;
  }
  let validNumber = currentValue - 1;
  for (const next of nextCards) {
    console.log('next:', next);
    const { value, color } = getCardInfo(next);
    console.log('cardsAfterAreInOrder value:', value);
    console.log('cardsAfterAreInOrder color:', color);
    if (fitsPatternDown(color, currentColor, value, validNumber)) {
      console.log('fitsPattern');
      currentColor = color;
      validNumber--;
    } else {
      console.log('!fitsPattern');
      inOrder = false;
    }
  }
  return inOrder;
};

const fitsPatternDown = (color, currentColor, value, validNumber) => {
  console.log('fitsPatternDown color:', color);
  console.log('fitsPatternDown currentColor:', currentColor);
  console.log('fitsPatternDown colors !==:', color !== currentColor);
  console.log('fitsPatternDown value:', value);
  console.log('fitsPatternDown validNumber:', validNumber);
  console.log('fitsPatternDown values ===:', value === validNumber);

  return color !== currentColor && value === validNumber;
};

export { cardsAfterAreInOrder, getPossibleMoves, handleMove, moveCard };
