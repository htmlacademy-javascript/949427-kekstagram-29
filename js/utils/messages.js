import {isEscapeKey} from '../utils/util.js';

let modal;

const createElement = (template) => {
  const div = document.createElement('div');
  div.innerHTML = template;
  return div.firstChild;
};

const createMessageTemplate = (state, message, textButton) =>
  `<section class="${state}">
      <div class="${state}__inner">
          <h2 class="${state}__title">${message}</h2>
          ${textButton ? `<button type="button" class="${state}__button">${textButton}</button>` : ''}
      </div>
  </section>`;

const createDomElement = (state, message, textButton) => {
  modal = createElement(createMessageTemplate(state, message, textButton));
  document.body.append(modal);
};

const showMessage = (state, message, textButton) => {
  createDomElement(state, message, textButton);
  if (textButton) {
    modal.querySelector(`.${state}__button`).addEventListener('click', onButtonClick);
  }
  document.addEventListener ('keydown', onDocumentKeydown);
  modal.addEventListener ('click', (evt) => {
    onModalClick(evt, state);
  });
};

const closeMessage = () => {
  document.removeEventListener ('keydown', onDocumentKeydown);
  modal.remove();
};

function onButtonClick (evt) {
  evt.preventDefault();
  closeMessage();
}

function onDocumentKeydown(evt) {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeMessage();
  }
}

function onModalClick(evt, state) {
  if (!evt.target.closest(`.${state}__inner`)) {
    closeMessage();
  }
}

export {showMessage};
