import { RANKS, SUITS, VALUES } from './card-helpers';
import { cardSlots, deckPile, discardPile, turnFaceUp } from './dom-helpers';
import { endGame } from './game';

const handleAutoFinish = () => {
  let allRemainingCards = [];
  for (const suit of SUITS) {
    const highestCard = getHighestCard(suit);
    const remainingCards = getRemainingCardsBySuit(suit, highestCard);
    allRemainingCards.push({ suit, remainingCards });
  }
  placeCardsAscending(allRemainingCards);
  clearAnyMisses();
  endGame();
};

const getHighestCard = (suit) => {
  const slot = document.querySelector(`#${suit}-ace-slot`);
  const { children } = slot;
  if (children && children.length > 0) {
    return children[children.length - 1];
  }
};

const getRemainingCardsBySuit = (suit, highestCard) => {
  const remainingCards = [];
  let nextValue;
  nextValue = highestCard ? getNextValue(highestCard) : 2;
  while (nextValue < 14) {
    remainingCards.push(getCardFromValue(nextValue, suit));
    nextValue++;
  }
  return remainingCards;
};

const getNextValue = (card) => {
  const value = Number(card.getAttribute('value'));
  return value === 14 ? 2 : value + 1;
};

const getCardFromValue = (value, suit) => {
  const rank = getRankFromValue(value);
  const id = `${rank}_of_${suit}`;
  // eslint-disable-next-line unicorn/prefer-query-selector
  return document.getElementById(id);
};

const getRankFromValue = (value) => {
  const index = VALUES.indexOf(value);
  return RANKS[index];
};

const placeCardsAscending = (objArray) => {
  let count = 0;
  for (let i = 2; i < 14; i++) {
    for (const obj of objArray) {
      const { suit, remainingCards } = obj;
      const suitedAceSlot = document.querySelector(`#${suit}-ace-slot`);

      handleAces();
      const cardValues = remainingCards.map((card) => Number(card.getAttribute('value')));
      if (cardValues.includes(i)) {
        const index = cardValues.indexOf(i);
        const card = remainingCards[index];
        setTimeout(() => {
          autoPlaceCard(card, suitedAceSlot);
        }, count * 50);
        count++;
      }
    }
  }
};

const handleAces = () => {
  const allAces = document.querySelectorAll('[rank="ace"]');
  for (const ace of allAces) {
    const { parentElement } = ace;
    if (!parentElement.classList.contains('ace-slot')) {
      const suit = ace.getAttribute('suit');
      const suitedAceSlot = document.querySelector(`#${suit}-ace-slot`);
      ace.remove();
      suitedAceSlot.append(ace);
      turnFaceUp(ace);
    }
  }
};

const autoPlaceCard = (card, slot) => {
  card.remove();
  slot.append(card);
  card.style.marginLeft = 0;
  turnFaceUp(card);
};

const clearAnyMisses = () => {
  deckPile.innerHTML = '';
  discardPile.innerHTML = '';
  for (const slot of cardSlots) {
    slot.innerHTML = '';
  }
};

export { handleAutoFinish };
