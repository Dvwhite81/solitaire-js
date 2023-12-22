import { createCard, handleCardImgs, handleDealCardImgs, updateDeckCount } from './dom-helpers';

const placeDeck = (deck, deckPile, deckCount) => {
  const { length } = deck;
  for (const card of deck) {
    const cardElement = createCard(card);
    deckPile.append(cardElement);
  }

  const slotType = 'deck';
  handleCardImgs([deckPile], slotType);
  updateDeckCount(length, deckCount);
};

const dealCards = async (deck, slots, deckCount) => {
  let count = 0;
  let slotIndex = 0;

  while (slotIndex < slots.length) {
    for (let i = slotIndex; i < slots.length; i++) {
      setTimeout(() => {
        dealOneCard(deck, slots, i);
        handleDealCardImgs(slots);
      }, count * 100);
      count++;
    }
    slotIndex++;
  }

  const slotType = 'card';
  handleCardImgs(slots, slotType);
  const { length } = deck;
  updateDeckCount(length, deckCount);
};

const dealOneCard = (deck, slots, i) => {
  const card = deck.pop();
  const slot = slots[i];
  const cardElement = createCard(card);
  slot.append(cardElement);
};

export { dealCards, placeDeck };
