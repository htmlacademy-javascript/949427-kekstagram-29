import {getRandomArrayElement} from '../utils/util.js';
import {renderThumbnails} from './render-thumbnails.js';

const RANDOM_PHOTO_COUNT = 10;
const FILTER_RANDOM = 'filter-random';
const FILTER_DISCUSSED = 'filter-discussed';

const filters = document.querySelector('.img-filters');
const filtersForm = document.querySelector('.img-filters__form');
const pictures = document.querySelector('.pictures');

const sortByRandom = (data) => {
  const randomPhotos = new Set();
  if (data.length <= RANDOM_PHOTO_COUNT) {
    return data;
  }
  while (randomPhotos.size < RANDOM_PHOTO_COUNT) {
    randomPhotos.add(getRandomArrayElement(data));
  }
  return randomPhotos;
};

const sortByCommentsLength = (data) => data.slice().sort((a, b) => b.comments.length - a.comments.length);

const getSortingData = (data, id) => {
  switch (id) {
    case FILTER_RANDOM:
      return sortByRandom(data);
    case FILTER_DISCUSSED:
      return sortByCommentsLength(data);
    default:
      return data;
  }
};

const renderSortingThumbnails = (data, id) => {
  pictures.querySelectorAll('.picture').forEach((picture) => picture.remove());
  renderThumbnails(getSortingData(data, id));
};

const initFilter = (data, render) => {
  filters.classList.remove('img-filters--inactive');
  filtersForm.addEventListener('click', (evt) => {
    if (evt.target.closest('.img-filters__button') && !evt.target.closest('.img-filters__button--active')) {
      document.querySelector('.img-filters__button--active').classList.remove('img-filters__button--active');
      evt.target.classList.add('img-filters__button--active');
      render(data, evt.target.id);
    }
  });
};

export {initFilter, renderSortingThumbnails};
