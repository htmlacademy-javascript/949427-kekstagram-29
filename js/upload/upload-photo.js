import {initValidateUploadForm, resetUploadFormErrors} from './validate-upload-form.js';
import {initScalePhoto, scaleReset} from './scale-upload-photo.js';
import {initEffectsPhoto, effectsReset} from './effects-upload-photo.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCancel = document.querySelector('.img-upload__cancel');

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

const onUploadInputChange = () => openUploadForm ();

function onUploadCancelClick () {
  closeUploadForm();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !evt.target.closest('.img-upload__text')) {
    evt.preventDefault ();
    closeUploadForm ();
  }
}

const onUploadFormSubmit = (evt) => {
  if (!initValidateUploadForm()) {
    evt.preventDefault();
  }
};

const initUploadPhoto = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export {initUploadPhoto};
