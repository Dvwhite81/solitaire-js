import { REDS, reshuffleDeck } from './card-helpers';
import { resetGame } from './game';
import { getLengthAndIndex } from './game-helpers';

const deckContainer = document.querySelector('#deck-container');
const deckPile = document.querySelector('#deck');
const deckCount = document.querySelector('#deck-count');
const discardPile = document.querySelector('#discard-pile');
const aceSlots = document.querySelectorAll('.ace-slot');
const cardSlots = document.querySelectorAll('.card-slot');
const shuffleBtn = document.querySelector('#shuffle-btn');
const modal = document.querySelector('#modal');
const modalSubmit = document.querySelector('#modal-submit');
const resetBtn = document.querySelector('#reset-btn');

const buildElement = (type, properties, attributes) => {
  const element = document.createElement(type);

  for (const prop in properties) {
    element[prop] = properties[prop];
  }
  for (const att in attributes) {
    element.setAttribute(att, attributes[att]);
  }
  return element;
};

const createCard = (card) => {
  const { suit, rank, value } = card;
  const rankStr = typeof rank === 'number' ? rank.toString() : rank;
  const id = `${rankStr}_of_${suit}`;
  const { imgId, imgSrc, backSrc } = getImgs(id);

  const cardElement = buildElement('div', { id: id, className: 'card' }, { suit: suit, rank: rank, value: value });

  const cardFront = buildElement('img', {
    id: imgId,
    className: 'card-front',
    src: imgSrc,
    alt: `The ${rank} of ${suit}`
  });

  const cardBack = buildElement('img', { className: 'card-back', src: backSrc, alt: 'Card back' });

  cardElement.append(cardFront, cardBack);
  return cardElement;
};

const convertToNewCard = (card) => {
  const suit = card.getAttribute('suit');
  const rank = card.getAttribute('rank');
  const value = Number(card.getAttribute('value'));
  const newCard = { suit, rank, value };
  return createCard(newCard);
};

const handleOneCardSlotImgs = (slot) => {
  const { children } = slot;
  const { length } = children;
  if (length > 0) {
    const lastCard = children[length - 1];
    turnFaceUp(lastCard);
  }
};

const turnFaceUp = (card) => {
  card.querySelector('.card-front').style.display = 'flex';
  card.querySelector('.card-back').style.display = 'none';
};

const handleCardSlotImgs = (slots, isDeal) => {
  for (const [x, slot] of slots.entries()) {
    const cards = slot.children;
    const { length } = cards;
    for (const [y, card] of [...cards].entries()) {
      card.querySelector('.card-front').style.display =
        (isDeal && x === y) || (!isDeal && isLast(y, length)) ? 'flex' : 'none';
      card.querySelector('.card-back').style.display = isLast(y, length) ? 'none' : 'flex';
    }
  }
};

const isLast = (index, length) => {
  return index === length - 1;
};

const isFaceUp = (card) => {
  const cardFront = card.querySelector('.card-front');
  return cardFront.style.display !== 'none';
};

const getImgs = (id) => {
  const imgId = `${id}-img`;
  const imgSrc = `../assets/images/${id}.png`;
  const backSrc = '../assets/images/card-back.png';
  return { imgId, imgSrc, backSrc };
};

const updateDeckCount = (length) => {
  deckCount.textContent = length;
};

const handleDiscardDisplay = (isMove) => {
  const cards = discardPile.children;
  const { length } = cards;
  if (length > 3) {
    if (isMove) {
      showPreviousCard(cards);
    } else {
      hideOverflowCards(cards, length);
    }
  }
};

const showPreviousCard = (cards) => {
  const hidden = document.querySelectorAll('.hidden-discard');
  const lastHidden = hidden[hidden.length - 1];
  lastHidden.classList.remove('hidden-discard');
  const index = [...cards].indexOf(lastHidden);
  const nextCard = cards[index + 1];
  nextCard.style.setProperty('margin-left', 'var(--overlap-right-margin)');
};

const hideOverflowCards = (cards, length) => {
  for (let i = 0; i < length; i++) {
    const card = cards[i];
    if (i < length - 3) {
      card.classList.add('hidden-discard');
    }
    if (i === length - 3) {
      card.style.marginLeft = 0;
    }
  }
};

const getElementFromCard = (card) => {
  const { rank, suit } = card;
  const id = `${rank}_of_${suit}`;
  // eslint-disable-next-line unicorn/prefer-query-selector
  return document.getElementById(id);
};

const handleDeckCard = (pile) => {
  const card = pile.pop();
  const { length } = pile;
  updateDeckCount(length);
  return card;
};

const getCardInfo = (card) => {
  const suit = card.getAttribute('suit');
  const value = Number(card.getAttribute('value'));
  const color = REDS.includes(suit) ? 'red' : 'black';
  return { value, color };
};

const showShuffleButton = () => {
  shuffleBtn.addEventListener('click', reshuffleDeck);
  shuffleBtn.style.display = 'flex';
  deckCount.style.display = 'none';
};

const hideShuffleButton = () => {
  shuffleBtn.removeEventListener('click', reshuffleDeck);
  shuffleBtn.style.display = 'none';
  deckCount.style.display = 'flex';
};

const moveIsToAceSlot = (move) => {
  return move.classList.contains('ace-slot');
};

const moveIsToEmptyCardSlot = (move) => {
  return move.classList.contains('card-slot');
};

const getCardsAfter = (card) => {
  const cards = [];
  const { parentElement } = card;
  const { children } = parentElement;
  const { length, index } = getLengthAndIndex(card, parentElement);

  for (let i = index + 1; i < length; i++) {
    const nextCard = children[i];
    cards.push(nextCard);
  }
  return cards;
};

const openModal = () => {
  modal.style.display = 'flex';
  modalSubmit.addEventListener('click', closeModal);
};

const closeModal = () => {
  modal.style.display = 'none';
  resetGame();
};

const clearBoard = () => {
  const slotsToClear = [...aceSlots, ...cardSlots, deckPile, discardPile];
  for (const slot of slotsToClear) {
    slot.innerHTML = '';
  }
};

const getFaceDownCount = () => {
  const faceDown = [];
  const bottomBoard = document.querySelector('#bottom-board');
  const bottomCards = bottomBoard.querySelectorAll('.card');
  for (const card of bottomCards) {
    if (!isFaceUp(card)) {
      faceDown.push(card);
    }
  }
  return faceDown.length;
};

export {
  aceSlots,
  cardSlots,
  clearBoard,
  convertToNewCard,
  createCard,
  deckContainer,
  deckCount,
  deckPile,
  discardPile,
  getCardInfo,
  getCardsAfter,
  getElementFromCard,
  getFaceDownCount,
  handleCardSlotImgs,
  handleDeckCard,
  handleDiscardDisplay,
  handleOneCardSlotImgs,
  hideShuffleButton,
  isFaceUp,
  isLast,
  moveIsToAceSlot,
  moveIsToEmptyCardSlot,
  openModal,
  resetBtn,
  showShuffleButton,
  shuffleBtn,
  turnFaceUp,
  updateDeckCount
};
