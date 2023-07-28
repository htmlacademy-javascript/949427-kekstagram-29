import {renderThumbnails} from './render-thumbnails.js';
import {initFilter, renderSortingThumbnails} from './filter.js';
import {getData} from '../utils/api.js';
import {debounce} from '../utils/util.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const ERROR_GET_DATA = 'Ошибка загрузки. Попробуйте обновить страницу';
const DELAY = 5000;

const onGetSuccess = (data) => {
  const debouncedRenderThumbnails = debounce(renderSortingThumbnails);
  renderThumbnails(data);
  initFilter(data, debouncedRenderThumbnails);
};

const onGetError = () => {
  const errorMessage = document.createElement('div');
  errorMessage.textContent = ERROR_GET_DATA;
  errorMessage.classList.add('get-data__error');
  document.body.append(errorMessage);
  setTimeout(() => {
    errorMessage.remove();
  }, DELAY);
};

const initThumbnails = () => {
  getData(DATA_URL, onGetSuccess, onGetError);
};


export {initThumbnails};
