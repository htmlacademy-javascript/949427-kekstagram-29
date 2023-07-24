const uploadForm = document.querySelector('.img-upload__form');
const photoDescription = document.querySelector('.text__description');
const photoHashtags = document.querySelector('.text__hashtags');
const MAX_LENGTH_PHOTO_DESCRIPTION = 140;
const HASHTAGS_MAX_QUANTITY = 5;
const VALID_SIMBOLS = /^#[a-zа-яё0-9]{1,19}$/i;

const validateUploadForm = new Pristine (uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
});

const checkedMaxLengthPhotoDescription = (value) => value.length <= MAX_LENGTH_PHOTO_DESCRIPTION;

const normalizeTags = (tags) => tags.trim().split(' ').filter((tag) => tag.length > 0);

const checkedQuantityTags = (value) => normalizeTags(value).length <= HASHTAGS_MAX_QUANTITY;

const checkedValidTags = (value) => normalizeTags(value).every((tag) => VALID_SIMBOLS.test(tag));

const checkedUniqueTags = (value) => {
  const lowerCaseTags = normalizeTags(value).map((tag) => tag.toLowerCase());
  return lowerCaseTags.length === new Set(lowerCaseTags).size;
};

const addValidators = () => {
  validateUploadForm.addValidator(photoDescription, checkedMaxLengthPhotoDescription, `Комментарий не более ${MAX_LENGTH_PHOTO_DESCRIPTION} символов`);
  validateUploadForm.addValidator(photoHashtags, checkedValidTags, 'Введён невалидный хэш-тег', 1, true);
  validateUploadForm.addValidator(photoHashtags, checkedQuantityTags, 'Превышено количество хэш-тегов', 3, true);
  validateUploadForm.addValidator(photoHashtags, checkedUniqueTags, 'Хэш-теги повторяются', 2);
};

addValidators();

const initValidateUploadForm = () => {
  validateUploadForm.validate();
};

const resetUploadFormErrors = () => {
  validateUploadForm.reset();
};

export {initValidateUploadForm, resetUploadFormErrors};
