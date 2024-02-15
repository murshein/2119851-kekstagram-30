import { renderPhotos } from './miniature';
import { renderDataErrorMessage } from './messages';

let photosData;

fetch('https://30.javascript.htmlacademy.pro/kekstagram/data')
  .then((response) => response.json())
  .then((photos) => {
    renderPhotos(photos);
    photosData = photos;
  }).catch(() => {
    renderDataErrorMessage();
  });

export {photosData};
