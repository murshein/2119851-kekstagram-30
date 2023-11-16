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

export {getRandomArrayElement, rangedArray, getRandomInteger, shuffle};
