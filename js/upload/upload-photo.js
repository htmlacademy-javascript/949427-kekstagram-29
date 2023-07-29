import {initValidateUploadForm, addValidators, resetUploadFormErrors} from './validate-upload-form.js';
import {initScalePhoto, scaleReset} from './scale-upload-photo.js';
import {initEffectsPhoto, effectsReset} from './effects-upload-photo.js';
import {sendData} from '../utils/api.js';
import {showMessage} from '../utils/messages.js';
import {isEscapeKey} from '../utils/util.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png', 'webp', 'gif'];

const Success = {
  STATE: 'success',
  MESSAGE: 'Изображение успешно загружено',
  TEXT_BUTTON: 'Круто!',
};

const Error = {
  STATE: 'error',
  MESSAGE: 'Ошибка загрузки файла',
  TEXT_BUTTON: 'Попробовать ещё раз',
};

const ErrorFile = {
  STATE: 'error',
  MESSAGE: 'Ошибка формата файла',
  TEXT_BUTTON: 'Закрыть',
};

const SEND_URL = 'https://29.javascript.pages.academy/kekstagram';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');
const submitButton = document.querySelector('.img-upload__submit');
const uploadPreview = document.querySelector('.img-upload__preview img');
const effectsPreview = document.querySelectorAll('.effects__preview');

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCancel.addEventListener('click', onUploadCancelClick);
  document.addEventListener('keydown', onDocumentKeydown);
  initScalePhoto();
  initEffectsPhoto();
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  resetUploadFormErrors();
  scaleReset();
  effectsReset();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onUploadInputChange = () => {
  const file = uploadInput.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    uploadPreview.src = URL.createObjectURL(file);
    effectsPreview.forEach((preview) => {
      preview.style.backgroundImage = `url('${uploadPreview.src}')`;
    });
    openUploadForm();
    return;
  }
  showMessage(ErrorFile.STATE, ErrorFile.MESSAGE, ErrorFile.TEXT_BUTTON);
};

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

const changeSubmitButtonState = (state) => {
  submitButton.disabled = state;
};

const onSendSuccess = () => {
  showMessage(Success.STATE, Success.MESSAGE, Success.TEXT_BUTTON);
  changeSubmitButtonState(false);
  closeUploadForm();
};

const onSendError = () => {
  showMessage(Error.STATE, Error.MESSAGE, Error.TEXT_BUTTON);
  changeSubmitButtonState(false);
};

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  if (initValidateUploadForm()) {
    resetUploadFormErrors();
    const data = new FormData(evt.target);
    changeSubmitButtonState(true);
    sendData(SEND_URL, data, onSendSuccess, onSendError);
  }
};

const initUploadPhoto = () => {
  addValidators();
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export {initUploadPhoto};
