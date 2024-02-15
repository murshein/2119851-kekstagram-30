import { picturesContainer} from './miniature.js';
import { isEscapeKey } from './util.js';
import { photosData } from './connection.js';

const modalbigPicture = document.querySelector('.big-picture');
const picturePreview = modalbigPicture.querySelector('.big-picture__preview');
const closebigPicture = modalbigPicture.querySelector('.big-picture__cancel');
const bigImage = modalbigPicture.querySelector('.big-picture__img').querySelector('img');
const social = modalbigPicture.querySelector('.social');
const likesCounter = social.querySelector('.likes-count');
const commentTotalCounter = social.querySelector('.social__comment-total-count');
const commentShownCount = social.querySelector('.social__comment-shown-count');
const description = social.querySelector('.social__caption');
const socialComments = social.querySelector('.social__comments');
const btnShowMore = social.querySelector('.comments-loader');
let countSum = 5;

//функция закртытия окна полноразмерного изображения на клавишу Esc
const onModalEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    modalbigPicture.classList.add('hidden');
  }
};

//функция открытия окна полноразмерного изображения, добавление обработчика на клавишу Esc
const openPictureModal = () => {
  modalbigPicture.classList.remove('hidden');
  countSum = 5;
  document.addEventListener('keydown', onModalEscKeydown);
};

//функция закрытия окна полноразмерного изображения, удаление обработчика на клавишу Esc
const closePictureModal = () => {
  modalbigPicture.classList.add('hidden');

  document.removeEventListener('keydown', onModalEscKeydown);
};

//обработчик - открытие окна полноразмерного изображения
picturesContainer.addEventListener('click', (evt) => {
  if (evt.target.closest('.picture')) {
    openPictureModal();
  }

  //блокирование скролла всей страницы
  document.querySelector('body').classList.add('.modal-open');

  //удаление разметки комментариев-примеров
  socialComments.innerHTML = '';

  if (evt.target.className === 'picture__img') {
    //наполнение полноразмерного изображения данными
    bigImage.src = evt.target.src;
    likesCounter.textContent = evt.target.nextElementSibling.querySelector('.picture__likes').textContent;
    commentTotalCounter.textContent = evt.target.nextElementSibling.querySelector('.picture__comments').textContent;
    description.textContent = evt.target.alt;

    //создание и наполнение комментариев
    const idMiniature = evt.target.id;
    const miniatureObj = photosData.find((elem) => elem.id === parseInt(idMiniature, 10));

    const commentsBigPicture = miniatureObj.comments;

    commentsBigPicture.forEach((comment) => {
      const liComment = document.createElement('li');
      liComment.className = 'social__comment';
      socialComments.appendChild(liComment);

      const imgComment = document.createElement('img');
      imgComment.className = 'social__picture';
      imgComment.src = comment.avatar;
      imgComment.alt = 'Аватар комментатора фотографии';
      imgComment.width = '35';
      imgComment.height = '35';
      liComment.appendChild(imgComment);

      const pComment = document.createElement('p');
      pComment.className = 'social__text';
      pComment.textContent = comment.message;
      liComment.appendChild(pComment);

      //отображение комментариев кнопки "загрузить еще"
      const comms = document.querySelectorAll('.social__comment');

      if (comms.length > 5) {
        btnShowMore.classList.remove('hidden');
        for (let i = 5; i < comms.length; i++) {
          comms[i].classList.add('hidden');
        }
      } else {
        btnShowMore.classList.add('hidden');
        commentShownCount.innerHTML = comms.length;
      }
    });
  }


});


//управление кнопкой "загрузить еще" и счетчик комментариев
btnShowMore.addEventListener('click', () => {
  const hiddenComms = social.querySelectorAll('.hidden');

  if (hiddenComms.length > 5) {
    countSum += 5;
    commentShownCount.innerHTML = countSum;
    for (let i = 0; i < 5; i++) {
      const hiddenComm = hiddenComms[i];
      hiddenComm.classList.remove('hidden');
    }
  } else {
    countSum += hiddenComms.length;
    commentShownCount.innerHTML = countSum;
    for (let i = 0; i < hiddenComms.length; i++) {
      const hiddenComm = hiddenComms[i];
      hiddenComm.classList.remove('hidden');
      btnShowMore.classList.add('hidden');
    }
  }
});

//обработчик - закрытие окна полноразмерного изображения
closebigPicture.addEventListener('click', () => {
  closePictureModal();
});

// закрытие окна полноразмерного изображения по клику вне его границ
modalbigPicture.addEventListener('click', (e) => {
  const withinBoundaries = e.composedPath().includes(picturePreview);
  if (!withinBoundaries) {
    closePictureModal();
  }
});

