import {initValidateUploadForm, resetUploadFormErrors} from './validate-upload-form.js';
const uploadForm = document.querySelector('.img-upload__form');
const uploadInput = document.querySelector('.img-upload__input');
const uploadOverlay = document.querySelector('.img-upload__overlay');
const uploadCansel = document.querySelector('.img-upload__cancel');

const openUploadForm = () => {
  uploadOverlay.classList.remove('hidden');
  document.body.classList.add('modal-open');
  uploadCansel.addEventListener('click', onUploadCanselClick);
  document.addEventListener('keydown', onDocumentKeydown);
};

const closeUploadForm = () => {
  uploadOverlay.classList.add('hidden');
  document.body.classList.remove('modal-open');
  uploadForm.reset();
  resetUploadFormErrors();
  document.removeEventListener('keydown', onDocumentKeydown);
};

const onUploadInputChange = () => openUploadForm ();

function onUploadCanselClick () {
  closeUploadForm();
}

function onDocumentKeydown(evt) {
  if (evt.key === 'Escape' && !evt.target.closest('.img-upload__text')) {
    evt.preventDefault ();
    closeUploadForm ();
  }
}

const onUploadFormSubmit = (evt) => {
  evt.preventDefault();
  initValidateUploadForm();
};

const initUploadPhoto = () => {
  uploadInput.addEventListener('change', onUploadInputChange);
  uploadForm.addEventListener('submit', onUploadFormSubmit);
};

export {initUploadPhoto, uploadForm};
