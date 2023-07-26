import {createPhotos} from '../data.js';
import {openFullsizePhoto} from './fullsize-photo.js';

const usersPhotos = createPhotos();
const usersListPhotos = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullsizePhoto ({url, description, likes, comments});
  });
  return thumbnail;
};

const renderThumbnails = () => {
  const usersListFragment = document.createDocumentFragment();
  usersPhotos.forEach((photo) => {
    const thumbnail = createThumbnail (photo);
    usersListFragment.append(thumbnail);
  });

  usersListPhotos.append(usersListFragment);
};

export {renderThumbnails};
