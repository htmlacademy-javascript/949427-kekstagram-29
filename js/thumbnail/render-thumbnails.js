import {openFullSizePhoto} from './full-size-photo.js';

const usersListPhotos = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content.querySelector('.picture');

const createThumbnail = (data) => {
  const {url, description, likes, comments} = data;
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  thumbnail.addEventListener('click', (evt) => {
    evt.preventDefault();
    openFullSizePhoto (data);
  });
  return thumbnail;
};

const renderThumbnails = (photos) => {
  const usersListFragment = document.createDocumentFragment();
  photos.forEach((photo) => usersListFragment.append(createThumbnail (photo)));
  usersListPhotos.append(usersListFragment);
};

export {renderThumbnails};
