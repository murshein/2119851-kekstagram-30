import { photosData } from './connection';
import { renderPhotos } from './miniature';
import { shuffle, debounce } from './util';

const filtersContainer = document.querySelector('.img-filters');
const defaultFilterBtn = document.querySelector('#filter-default');
const randomFilterBtn = document.querySelector('#filter-random');
const discussedFilterBtn = document.querySelector('#filter-discussed');

const RERENDER_DELAY = 500;

filtersContainer.classList.remove('img-filters--inactive');

const compareComments = (photoA, photoB) => {
  const commentsA = photoA.comments.length;
  const commentsB = photoB.comments.length;

  return commentsB - commentsA;
};

const setDefaultFilter = () => {
  const smallPics = document.querySelectorAll('.picture');
  smallPics.forEach((pic) => pic.remove());
  renderPhotos(photosData);
  randomFilterBtn.classList.remove('img-filters__button--active');
  discussedFilterBtn.classList.remove('img-filters__button--active');
  defaultFilterBtn.classList.add('img-filters__button--active');
};

const setRandomFilter = () => {
  const smallPics = document.querySelectorAll('.picture');
  smallPics.forEach((pic) => pic.remove());
  const copyObj = photosData.slice();
  const randomObj = shuffle(copyObj);
  renderPhotos(randomObj.slice(0,10));
  randomFilterBtn.classList.add('img-filters__button--active');
  discussedFilterBtn.classList.remove('img-filters__button--active');
  defaultFilterBtn.classList.remove('img-filters__button--active');
};

const setDiscussedFilter = () => {
  const smallPics = document.querySelectorAll('.picture');
  smallPics.forEach((pic) => pic.remove());
  const copyObj = photosData.slice();
  const sortedObj = copyObj.sort(compareComments);
  renderPhotos(sortedObj);

  randomFilterBtn.classList.remove('img-filters__button--active');
  discussedFilterBtn.classList.add('img-filters__button--active');
  defaultFilterBtn.classList.remove('img-filters__button--active');
};

const debouncedDefaultFilter = debounce(setDefaultFilter, RERENDER_DELAY);
const debouncedRandomFilter = debounce(setRandomFilter, RERENDER_DELAY);
const debouncedDiscussedFilter = debounce(setDiscussedFilter, RERENDER_DELAY);

defaultFilterBtn.addEventListener('click', debouncedDefaultFilter);
randomFilterBtn.addEventListener('click', debouncedRandomFilter);
discussedFilterBtn.addEventListener('click', debouncedDiscussedFilter);


