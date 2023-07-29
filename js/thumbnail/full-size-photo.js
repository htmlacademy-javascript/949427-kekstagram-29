import {isEscapeKey} from '../utils/util.js';

const COMMENTS_PORTION = 5;
const fullSizePhoto = document.querySelector('.big-picture');
const closeButton = fullSizePhoto.querySelector('.big-picture__cancel');
const image = fullSizePhoto.querySelector('.big-picture__img img');
const likesCount = fullSizePhoto.querySelector('.likes-count');
const commentsCount = fullSizePhoto.querySelector('.comments-count');
const descriptionPhoto = fullSizePhoto.querySelector('.social__caption');
const commentsList = fullSizePhoto.querySelector('.social__comments');
const socialComment = fullSizePhoto.querySelector('.social__comment');
const loadCommentsButton = fullSizePhoto.querySelector('.comments-loader');
const showComments = fullSizePhoto.querySelector('.social__comment-count');

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

const fillFullSizePhoto = ({url, description, likes, comments}) => {
  image.src = url;
  likesCount.textContent = likes;
  commentsCount.textContent = comments.length;
  descriptionPhoto.textContent = description;
  return fullSizePhoto;
};

const closeFullSizePhoto = () => {
  fullSizePhoto.classList.add('hidden');
  document.body.classList.remove('modal-open');
  closeButton.removeEventListener ('click', onCloseButtonClick);
  document.removeEventListener ('keydown', onDocumentKeydown);
};

function onCloseButtonClick () {
  closeFullSizePhoto();
}

function onDocumentKeydown (evt) {
  if (isEscapeKey(evt) && !evt.target.closest('.social__footer-text')) {
    evt.preventDefault();
    closeFullSizePhoto();
  }
}

const openFullSizePhoto = (data) => {
  fillFullSizePhoto (data);
  renderComments(data.comments);
  fullSizePhoto.classList.remove('hidden');
  document.body.classList.add('modal-open');
  closeButton.addEventListener ('click', onCloseButtonClick);
  document.addEventListener ('keydown', onDocumentKeydown);
};

export {openFullSizePhoto};
