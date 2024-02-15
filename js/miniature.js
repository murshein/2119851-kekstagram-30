const picturesContainer = document.querySelector('.pictures');
const miniaturePictureTemplate = document.querySelector('#picture').content.querySelector('.picture');


const miniaturePhotosFragment = document.createDocumentFragment();

const renderPhotos = (photos) => {
  photos.forEach((photo) => {
    const pictureElement = miniaturePictureTemplate.cloneNode(true);
    pictureElement.querySelector('.picture__img').id = photo.id;
    pictureElement.querySelector('.picture__img').src = photo.url;
    pictureElement.querySelector('.picture__img').alt = photo.description;
    pictureElement.querySelector('.picture__likes').textContent = photo.likes;
    pictureElement.querySelector('.picture__comments').textContent = photo.comments.length;
    miniaturePhotosFragment.appendChild(pictureElement);
  });

  picturesContainer.appendChild(miniaturePhotosFragment);
};

export {picturesContainer, renderPhotos};
