//Массив имен
const NAMES = [
  'Константин',
  'Владимир',
  'Егор',
  'Николай',
  'Олег',
  'Дмитрий',
  'Степан',
  'Владислав',
  'Антон',
  'Алексей',
  'Руслан',
  'Михаил'
];

//Массив фамилий
const SURNAMES = [
  'Кондратьев',
  'Клименко',
  'Невский',
  'Малинин',
  'Соловьев',
  'Прохоров',
  'Симачев',
  'Филиппов',
  'Самойлов',
  'Гаврилов'
];

//Массив описаний к фотографиям
const DESCRIPTION_TEXT = [
  'Фотография сделана в городе Ессентуки',
  'Моя первая фотка на мыльницу',
  'Еслиб только я умел фотографировать...',
  'Хейтеры, оставляйте комментарии!',
];

//Массив комментариев к фотографиям
const MESSAGE_TEXT = [
  'В целом всё неплохо. Но не всё.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
];

//Генерация массива определенной длины для неповторяющихся идентификаторов
const rangedArray = (from, to) => [...Array(to - from + 1).keys()].map((v) => v + from);

//Случайное перемешивание массива
const shuffle = (arr) => {
  for (let i = 1; i < arr.length; i++) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]]; // свап arr[i] и arr[j]
  }
};

//Генератор целых случайных чисел в диапазоне
const getRandomInteger = (a, b) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  const result = Math.random() * (upper - lower + 1) + lower;
  return Math.floor(result);
};

//Функция получения случайного элемента массива.
const getRandomArrayElement = (elements) => elements[getRandomInteger(0, elements.length - 1)];

const ids = rangedArray(1,25); //массив идентификаторов для фотографий
const urls = ids.map((v) => `photos/${v}.jpg`); //массив адресов фотографий

shuffle(ids);
shuffle(urls);

const createComments = function() {
  const commentsIds = rangedArray(1,getRandomInteger(1,30)); //массив комментариев
  const comments = commentsIds.map((commentsId) => ({
    id: commentsId,
    avatar: `img/avatar-${ getRandomInteger(1,6) }.svg`,
    message: `${getRandomArrayElement(MESSAGE_TEXT)}`,
    name: `${getRandomArrayElement(NAMES)} ${ getRandomArrayElement(SURNAMES)}`,
  }));
  return comments;
};

const createPhoto = () => ids.map((id, i) => ({
  id: id,
  url: urls[i],
  description: `${getRandomArrayElement(DESCRIPTION_TEXT)}`,
  likes: getRandomInteger(15, 200),
  comments: createComments()
}));

createPhoto();
