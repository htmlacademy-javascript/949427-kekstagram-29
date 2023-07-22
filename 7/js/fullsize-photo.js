const COMMENTS_PORTION = 5;
const fullsizePhoto = document.querySelector('.big-picture');
const closeButton = fullsizePhoto.querySelector('.big-picture__cancel');
const image = fullsizePhoto.querySelector('.big-picture__img').querySelector('img');
const likesCount = fullsizePhoto.querySelector('.likes-count');
const commentsCount = fullsizePhoto.querySelector('.comments-count');
const descriptionPhoto = fullsizePhoto.querySelector('.social__caption');
const commentsList = fullsizePhoto.querySelector('.social__comments');
const socialComment = fullsizePhoto.querySelector('.social__comment');
const loadCommentsButton = fullsizePhoto.querySelector('.comments-loader');
const showComments = fullsizePhoto.querySelector('.social__comment-count');

const fillComment = ({avatar, message, name}) => {
  const comment = socialComment.cloneNode(true);
  const author = comment.querySelector('.social__picture');
  author.src = avatar;
  author.alt = name;
  comment.querySelector('.social__text').textContent = message;
  return comment;
};

const renderCommentsPortion = (comments, showCommentsPortion) => {
  commentsList.innerHTML = '';
  const commentsFragment = document.createDocumentFragment();
  if (showCommentsPortion >= comments.length) {
    loadCommentsButton.classList.add('hidden');
  } else {
    loadCommentsButton.classList.remove('hidden');
  }
  showCommentsPortion = Math.min(showCommentsPortion, comments.length);
  showComments.textContent = `${showCommentsPortion} из ${comments.length} комментариев`;
  comments.slice(0, showCommentsPortion).forEach((item) => {
    const comment = fillComment (item);
    commentsFragment.append(comment);
  });
  commentsList.append(commentsFragment);
};

const renderComments = (comments) => {
  let showCommentsPortion = COMMENTS_PORTION;
  renderCommentsPortion (comments, showCommentsPortion);
  loadCommentsButton.addEventListener ('click', () => {
    showCommentsPortion += COMMENTS_PORTION;
    renderCommentsPortion (comments, showCommentsPortion);
  });
};

const fillFullsizePhoto = ({url, description, likes, comments}) => {
  image.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  descriptionPhoto.textContent = description;
  return fullsizePhoto;
};

const closeFullsizePhoto = () => {
  fullsizePhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener ('click', onCloseButtonClick);
  document.removeEventListener ('keydown', onDocumentKeydown);
};

function onCloseButtonClick () {
  closeFullsizePhoto();
}

function onDocumentKeydown (evt) {
  if (evt.key === 'Escape' && !evt.target.closest('.social__footer-text')) {
    evt.preventDefault();
    closeFullsizePhoto();
  }
}

const openFullsizePhoto = ({url, description, likes, comments}) => {
  fillFullsizePhoto ({url, description, likes, comments});
  renderComments(comments);
  fullsizePhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener ('click', onCloseButtonClick);
  document.addEventListener ('keydown', onDocumentKeydown);
};

export {openFullsizePhoto};
