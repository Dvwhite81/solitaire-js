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
  const id = `${rank}_of_${suit}`;
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

const handleCardImgs = (slots, slotType) => {
  for (const slot of slots) {
    const cards = slot.children;
    for (const [i, card] of [...cards].entries()) {
      const { frontDisplay, backDisplay } = getDisplay(slotType, i, length);
      card.querySelector('.card-front').style.display = frontDisplay;
      card.querySelector('.card-back').style.display = backDisplay;
    }
  }
};

const handleDealCardImgs = (slots) => {
  for (const [x, slot] of slots.entries()) {
    const cards = slot.children;
    for (const [y, card] of [...cards].entries()) {
      card.querySelector('.card-front').style.display = x === y ? 'flex' : 'none';
      card.querySelector('.card-back').style.display = x === y ? 'none' : 'flex';
    }
  }
};

const isLast = (index, length) => {
  return index === length - 1;
};

const getImgs = (id) => {
  const imgId = `${id}-img`;
  const imgSrc = `../assets/images/${id}.png`;
  const backSrc = '../assets/images/card-back.png';
  return { imgId, imgSrc, backSrc };
};

const getDisplay = (slotType, index, length) => {
  const frontDisplay =
    slotType === 'discard' ||
    (slotType !== 'deck' && isLast(index, length)) ||
    (slotType === 'card' && isLast(index, length))
      ? 'flex'
      : 'none';
  const backDisplay = slotType === 'discard' || isLast(index, length) ? 'none' : 'flex';
  const isValidToClick = (slotType === 'discard' || slotType === 'card') && isLast(index, length);
  return { frontDisplay, backDisplay, isValidToClick };
};

const updateDeckCount = (length, deckCount) => {
  deckCount.textContent = length;
};

export { createCard, handleCardImgs, handleDealCardImgs, updateDeckCount };
