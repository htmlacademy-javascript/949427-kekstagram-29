const usersListPhotos = document.querySelector('.pictures');
const thumbnailTemplate = document.querySelector('#picture').content;

const createThumbnail = ({url, description, likes, comments}) => {
  const thumbnail = thumbnailTemplate.cloneNode(true);
  const image = thumbnail.querySelector('.picture__img');
  image.src = url;
  image.alt = description;
  thumbnail.querySelector('.picture__likes').textContent = likes;
  thumbnail.querySelector('.picture__comments').textContent = comments.length;
  return thumbnail;
};

const renderThumbnails = (usersPhotos) => {
  const usersListFragment = document.createDocumentFragment();
  usersPhotos.forEach((photo) => {
    const thumbnail = createThumbnail (photo);
    usersListFragment.append(thumbnail);
  });

  usersListPhotos.append(usersListFragment);
};

export {renderThumbnails};
