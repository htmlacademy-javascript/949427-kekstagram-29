const SCALE_STEP = 25;
const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_BASE_VALUE = 100;
const DIVIDER = 100;

const scaleSmaller = document.querySelector('.scale__control--smaller');
const scaleBigger = document.querySelector('.scale__control--bigger');
const scaleValue = document.querySelector('.scale__control--value');
const previewPhoto = document.querySelector('.img-upload__preview img');

let currentScale = SCALE_BASE_VALUE;

const changeScalePhoto = (value) => {
  previewPhoto.style.transform = `scale(${value / DIVIDER})`;
  scaleValue.value = `${value}%`;
};

const onScaleSmallerClick = () => {
  if (currentScale > SCALE_MIN) {
    currentScale -= SCALE_STEP;
    changeScalePhoto(currentScale);
  }
};

const onScaleBiggerClick = () => {
  if (currentScale < SCALE_MAX) {
    currentScale += SCALE_STEP;
    changeScalePhoto(currentScale);
  }
};

const initScalePhoto = () => {
  scaleSmaller.addEventListener('click', onScaleSmallerClick);
  scaleBigger.addEventListener('click', onScaleBiggerClick);
};

const scaleReset = () => {
  scaleValue.value = `${SCALE_BASE_VALUE}%`;
  currentScale = SCALE_BASE_VALUE;
};

export {initScalePhoto, scaleReset};
