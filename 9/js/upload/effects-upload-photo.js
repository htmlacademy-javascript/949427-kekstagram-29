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

const switchSlider = (effect) => {
  if (effect === 'none') {
    sliderContainer.classList.add('hidden');
  } else {
    sliderContainer.classList.remove('hidden');
  }
};

const createSlider = () => {
  switchSlider(startEffect);
  const {min, max, step} = SliderEffects.startEffect || SliderEffects.default;
  noUiSlider.create(slider, {
    range: {min, max},
    start: max,
    step,
    connect: 'lower',
  });
};

const updatePreviewPhoto = (currentFilter, currentValue, currentUnit) => {
  if (currentFilter === 'none') {
    previewPhoto.style.filter = 'none';
  } else {
    previewPhoto.style.filter = `${currentFilter}(${currentValue}${currentUnit})`;
  }
};

const updateSlider = (filter, unit) => {
  slider.noUiSlider.on('update', () => {
    effectValue.value = slider.noUiSlider.get();
    updatePreviewPhoto(filter, effectValue.value, unit);
  });
};

const onEffectsChange = (evt) => {
  const {filter, min, max, step, unit} = SliderEffects[evt.target.value] || SliderEffects.default;
  slider.noUiSlider.updateOptions({
    range: {min, max},
    start: max,
    step,
    connect: 'lower',
  });
  updatePreviewPhoto(filter, max, unit);
  switchSlider(evt.target.value);
  updateSlider(filter, unit);
};

const initEffectsPhoto = () => {
  createSlider();
  effects.addEventListener('change', onEffectsChange);
};

const effectsReset = () => {
  slider.noUiSlider.destroy();
  previewPhoto.style.filter = 'none';
};

export {initEffectsPhoto, effectsReset};
