import { getShuffledDeck } from './card-helpers';
import { dealCards, placeDeck } from './game-helpers';

const deckPile = document.querySelector('#deck');
const deckCount = document.querySelector('#deck-count');
const discardPile = document.querySelector('#discard-pile');
const clubsAceSlot = document.querySelector('#clubs-ace-slot');
const diamondsAceSlot = document.querySelector('#diamonds-ace-slot');
const spadesAceSlot = document.querySelector('#spades-ace-slot');
const heartsAceSlot = document.querySelector('#hearts-ace-slot');
const aceSlots = [clubsAceSlot, diamondsAceSlot, spadesAceSlot, heartsAceSlot];
const cardSlot0 = document.querySelector('#card-slot-0');
const cardSlot1 = document.querySelector('#card-slot-1');
const cardSlot2 = document.querySelector('#card-slot-2');
const cardSlot3 = document.querySelector('#card-slot-3');
const cardSlot4 = document.querySelector('#card-slot-4');
const cardSlot5 = document.querySelector('#card-slot-5');
const cardSlot6 = document.querySelector('#card-slot-6');
const cardSlots = [cardSlot0, cardSlot1, cardSlot2, cardSlot3, cardSlot4, cardSlot5, cardSlot6];

const setup = () => {
  const deck = getShuffledDeck();
  placeDeck(deck, deckPile, deckCount);
  dealCards(deck, cardSlots, deckCount);
};

export default setup;
