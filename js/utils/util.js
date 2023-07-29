const DELAY = 500;

const getRandomInteger = (min, max) => {
  const result = Math.random() * (max - min + 1) + min;
  return Math.floor(result);
};

const getRandomArrayElement = (elements) => {
  const element = elements[getRandomInteger(0, elements.length - 1)];
  return element;
};

const isEscapeKey = (evt) => evt.key === 'Escape';

const debounce = (callback, timeoutDelay = DELAY) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

export {getRandomInteger, getRandomArrayElement, isEscapeKey, debounce};
