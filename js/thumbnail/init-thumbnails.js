import {renderThumbnails} from './render-thumbnails.js';
import {initFilter, renderSortingThumbnails} from './filter.js';
import {getData} from '../utils/api.js';
import {debounce} from '../utils/util.js';
import {showMessage} from '../utils/messages.js';

const DATA_URL = 'https://29.javascript.pages.academy/kekstagram/data';
const Error = {
  STATE: 'error',
  MESSAGE: 'Ошибка загрузки. Попробуйте обновить страницу',
};

const onGetSuccess = (data) => {
  const debouncedRenderThumbnails = debounce(renderSortingThumbnails);
  renderThumbnails(data);
  initFilter(data, debouncedRenderThumbnails);
};

const onGetError = () => showMessage(Error.STATE, Error.MESSAGE);

const initThumbnails = () => getData(DATA_URL, onGetSuccess, onGetError);

export {initThumbnails};
