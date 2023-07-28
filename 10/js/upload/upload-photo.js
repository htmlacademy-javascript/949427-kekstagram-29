import {initValidateUploadForm, resetUploadFormErrors} from './validate-upload-form.js';
import {initScalePhoto, scaleReset} from './scale-upload-photo.js';
import {initEffectsPhoto, effectsReset} from './effects-upload-photo.js';
import {sendData} from '../utils/api.js';
import {showMessage} from '../utils/messages.js';
import {isEscapeKey} from '../utils/util.js';

const success = {
  STATE: 'success',
  MESSAGE: 'Изображение успешно загружено',
  TEXT_BUTTON: 'Круто!',
};

const error = {
  STATE: 'error',
  MESSAGE: 'Ошибка загрузки файла',
  TEXT_BUTTON: 'Попробовать ещё раз',
};

const SEND_URL = 'https://29.javascript.pages.academy/kekstagram';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  initScalePhoto();
  initEffectsPhoto();
};

const closeUploadForm = () => {
  const successMessage = document.querySelector('.success');
  uploadOverlay.classList.add('hidden');
  if (!document.body.contains(successMessage)) {
    document.body.classList.remove('modal-open');
  }
  uploadForm.reset();
  resetUploadFormErrors();
  scaleReset();
  effectsReset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onUploadInputChange = () => openUploadForm ();

function onUploadCancelClick () {
  closeUploadForm();
}

function onDocumentKeydown(evt) {
  const errorMessage = document.querySelector('.error');
  if (isEscapeKey(evt) && !evt.target.closest('.img-upload__text') && !document.body.contains(errorMessage)) {
    evt.preventDefault ();
    closeUploadForm ();
  }
}

const blockSubmitButton = (state) => {
  submitButton.disabled = state;
};

const onSendSuccess = () => {
  showMessage(success.STATE, success.MESSAGE, success.TEXT_BUTTON);
  blockSubmitButton(false);
  closeUploadForm();
};

const onSendError = () => {
  showMessage(error.STATE, error.MESSAGE, error.TEXT_BUTTON);
  blockSubmitButton(false);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (initValidateUploadForm()) {
    const data = new FormData(evt.target);
    blockSubmitButton(true);
    sendData(SEND_URL, data, onSendSuccess, onSendError);
  }
};

const initUploadPhoto = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export {initUploadPhoto};
