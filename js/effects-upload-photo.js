const SliderEffects = {
  default: {
    filter: 'none',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  chrome: {
    filter: 'grayscale',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  sepia:{
    filter: 'sepia',
    min: 0,
    max: 1,
    step: 0.1,
    unit: ''
  },
  marvin: {
    filter: 'invert',
    min: 0,
    max: 100,
    step: 1,
    unit: '%'
  },
  phobos: {
    filter: 'blur',
    min: 0,
    max: 3,
    step: 0.1,
    unit: 'px'
  },
  heat: {
    filter: 'brightness',
    min: 1,
    max: 3,
    step: 0.1,
    unit: ''
  }
};

const effects = document.querySelector('.effects__list');
const sliderContainer = document.querySelector('.img-upload__effect-level');
const slider = document.querySelector('.effect-level__slider');
const effectValue = document.querySelector('.effect-level__value');
const previewPhoto = document.querySelector('.img-upload__preview img');
const startEffect = document.querySelector('.effects__item input:checked').value;

let currentFilter;
let currentUnit;
let currentValue;

const switchSlider = (effect) => {
  if (effect === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const createSlider = () => {
  switchSlider(startEffect);
  const {filter, min, max, step, unit} = SliderEffects.startEffect || SliderEffects.default;
  noUiSlider.create(slider, {
    range: {min, max},
    start: max,
    step,
    connect: 'lower',
  });
  currentFilter = filter;
  currentUnit = unit;
  currentValue = max;
};

const updatePreviewPhoto = () => {
  if (currentFilter === 'none') {
    previewPhoto.style.filter = 'none';
  } else {
    previewPhoto.style.filter = `${currentFilter}(${currentValue}${currentUnit})`;
  }
};

const onEffectsChange = (evt) => {
  const {filter, min, max, step, unit} = SliderEffects[evt.target.value] || SliderEffects.default;
  slider.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step,
    connect: 'lower',
  });
  currentFilter = filter;
  currentUnit = unit;
  currentValue = max;
  updatePreviewPhoto({filter});
  switchSlider(evt.target.value);
};

const initEffectsPhoto = () => {
  createSlider();
  effects.addEventListener('change', onEffectsChange);
  slider.noUiSlider.on('update', () => {
    currentValue = slider.noUiSlider.get();
    effectValue.value = currentValue;
    updatePreviewPhoto();
  });
};

const effectsReset = () => {
  slider.noUiSlider.destroy();
};

export {initEffectsPhoto, effectsReset};
