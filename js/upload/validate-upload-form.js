const uploadForm = document.querySelector('.img-upload__form');
const photoDescription = document.querySelector('.text__description');
const photoHashtags = document.querySelector('.text__hashtags');
const MAX_LENGTH_PHOTO_DESCRIPTION = 140;
const HASHTAGS_MAX_QUANTITY = 5;
const REGULAR_EXPRESSION = /^#[a-zа-яё0-9]{1,19}$/i;

const validateUploadForm = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const normalizeTags = (tags) => tags.trim().toLowerCase().split(' ').filter((tag) => tag);

const checkMaxLengthPhotoDescription = (value) => value.length <= MAX_LENGTH_PHOTO_DESCRIPTION;

const checkQuantityTags = (value) => normalizeTags(value).length <= HASHTAGS_MAX_QUANTITY;

const checkValidTags = (value) => normalizeTags(value).every((tag) => REGULAR_EXPRESSION.test(tag));

const checkUniqueTags = (value) => {
  const tags = normalizeTags(value);
  return tags.length === new Set(tags).size;
};

const addValidators = () => {
  validateUploadForm.addValidator(photoDescription, checkMaxLengthPhotoDescription, `Комментарий не более ${MAX_LENGTH_PHOTO_DESCRIPTION} символов`);
  validateUploadForm.addValidator(photoHashtags, checkValidTags, 'Введён невалидный хэш-тег', 1, true);
  validateUploadForm.addValidator(photoHashtags, checkQuantityTags, 'Превышено количество хэш-тегов', 3, true);
  validateUploadForm.addValidator(photoHashtags, checkUniqueTags, 'Хэш-теги повторяются', 2, true);
};

const initValidateUploadForm = () => validateUploadForm.validate();

const resetUploadFormErrors = () => validateUploadForm.reset();

export {addValidators, initValidateUploadForm, resetUploadFormErrors};
