const SUITS = ['clubs', 'diamonds', 'hearts', 'spades'];
const RANKS = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'jack', 'queen', 'king', 'ace'];
const VALUES = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 'A'];
const REDS = ['diamonds', 'hearts'];

const createDeck = () => {
  const deck = [];
  for (const suit of SUITS) {
    for (const [j, rank] of RANKS.entries()) {
      const value = VALUES[j];
      const card = { suit, rank, value };
      deck.push(card);
    }
  }
  return deck;
};

const shuffleDeck = (deck) => {
  const length = deck.length - 1;
  for (let i = length; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
};

const getShuffledDeck = () => {
  const deck = createDeck();
  return shuffleDeck(deck);
};

export { getShuffledDeck, REDS, SUITS };
