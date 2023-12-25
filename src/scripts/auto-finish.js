import { RANKS, SUITS, VALUES } from './card-helpers';

const handleAutoFinish = () => {
  for (const suit of SUITS) {
    const highestCard = getHighestCard(suit);
    const remainingCards = getRemainingCardsBySuit(suit, highestCard);
    placeCardsAscending(remainingCards);
  }
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
  let nextValue = getNextValue(highestCard);
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

const placeCardsAscending = (cards) => {
  console.log('placeCardsAscending cards:', cards);
};

export { handleAutoFinish };
