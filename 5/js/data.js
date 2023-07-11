import {getRandomInteger, getRandomArrayElement} from './util.js';

const TestSet = {
  QUANTITY: 25,
  MIN_LIKES: 15,
  MAX_LIKES: 200,
  DESCRIPTIONS: ['', 'Хорошо, когда есть друзья', 'Летний чил на югах', 'Цените каждое мгновенье.', 'Как же круто тут кормят', 'C друзьями на море', 'Какая милота!', 'Отдыхаем...'],
  MIN_COMMENTS: 0,
  MAX_COMMENTS: 30,
  MESSAGES: ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.', 'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.', 'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'],
  AVATAR_QUANTITY: 6,
  NAMES: ['Артем', 'Анна', 'Иван', 'Мария', 'Петр', 'Рустам']
};

const createId = () => {
  let lastId = 0;
  return function () {
    lastId++;
    return lastId;
  };
};

const generatePhotoId = createId();

const generateCommentId = createId();

const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(1, TestSet.AVATAR_QUANTITY)}.svg`,
  message: getRandomArrayElement(TestSet.MESSAGES),
  name: getRandomArrayElement(TestSet.NAMES),
});

const createPhoto = () => {
  const photoId = generatePhotoId();
  return {
    id: photoId,
    url: `photos/${photoId}.jpg`,
    description: getRandomArrayElement(TestSet.DESCRIPTIONS),
    likes: getRandomInteger(TestSet.MIN_LIKES, TestSet.MAX_LIKES),
    comments: Array.from({length: getRandomInteger(TestSet.MIN_COMMENTS, TestSet.MAX_COMMENTS)}, createComment),
  };
};

const createPhotos = () => Array.from({length: TestSet.QUANTITY}, createPhoto);
export {createPhotos};
