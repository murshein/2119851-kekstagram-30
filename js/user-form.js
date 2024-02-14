import { isEscapeKey } from './util.js';
import { renderErrorMessage, renderSuccessMessage } from './messages.js';

const FILE_TYPES = ['jpg', 'jpeg', 'png'];

const userForm = document.querySelector('.img-upload__form');
const uploadInput = userForm.querySelector('.img-upload__input');
const imgEditPopup = userForm.querySelector('.img-upload__overlay');
const closeButton = userForm.querySelector('.img-upload__cancel');
const imgUploadPreview = document.querySelector('.img-upload__preview');
const imgPreview = imgUploadPreview.querySelector('img');
const fileChooser = document.querySelector('.img-upload__start input[type=file]');

const buttonScaleSmaller = document.querySelector('.scale__control--smaller');
const buttonScaleBigger = document.querySelector('.scale__control--bigger');
const scale = document.querySelector('.scale__control--value');

const sliderContainer = document.querySelector('.img-upload__effect-level');
const sliderElement = document.querySelector('.effect-level__slider');
const effectList = document.querySelector('.effects__list');
const sliderValue = document.querySelector('.effect-level__value');

const regExp = /^#[a-zа-яё0-9]{1,19}$/i;

const pristine = new Pristine(userForm, {
  classTo:'img-upload__field-wrapper',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextClass: 'img-upload__field-wrapper--error'
}, false);
const hashTagInput = document.querySelector('.text__hashtags');
const descriptionPreview = document.querySelector('.text__description');
const MAX_HASHTAG_COUNT = 5;
const MAX_DESCRIPTION_LENGTH = 140;

sliderContainer.classList.add('hidden');

//Открытие и закрытие окна

const onPopupEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    imgEditPopup.classList.add('hidden');
    uploadInput.value = '';
    scale.value = '100%';
  }
};

const openImgEditModal = () => {
  imgEditPopup.classList.remove('hidden');
};

const closeImgEditModal = () => {
  imgEditPopup.classList.add('hidden');
  uploadInput.value = '';
  scale.value = '100%';
  hashTagInput.value = '';
  descriptionPreview.value = '';
  document.querySelector('#effect-none').checked = true;
  imgPreview.style.removeProperty('filter');
  sliderContainer.classList.add('hidden');
  imgPreview.style.setProperty('transform', 'scale(1)');
};

uploadInput.addEventListener('change', () => {
  openImgEditModal();
  document.addEventListener('keydown', onPopupEscKeydown);
  document.querySelector('body').classList.add('.modal-open');
});

closeButton.addEventListener('click', () => {
  closeImgEditModal();
  document.removeEventListener('keydown', onPopupEscKeydown);
});

//Масштабирование

buttonScaleSmaller.addEventListener('click', (evt) => {
  evt.preventDefault();
  scale.value = `${parseInt(scale.value, 10) - 25 }%`;
  if (parseInt(scale.value, 10) <= 25) {
    scale.value = '25%';
  }
  imgPreview.style.setProperty('transform', `scale(${parseInt(scale.value, 10) / 100})`);
});

buttonScaleBigger.addEventListener('click', (evt) => {
  evt.preventDefault();
  scale.value = `${parseInt(scale.value, 10) + 25 }%`;
  if (parseInt(scale.value, 10) >= 100) {
    scale.value = '100%';
  }
  imgPreview.style.setProperty('transform', `scale(${parseInt(scale.value, 10) / 100})`);
});

//Наложение эффекта

noUiSlider.create(sliderElement, {
  range: { min: 0, max: 100,},
  start: 80,
  step: 1,
  connect: 'lower',
});

effectList.addEventListener('click', (evt) => {

  if (evt.target.id === 'effect-none') {
    sliderContainer.classList.add('hidden');
    imgPreview.style.removeProperty('filter');
    sliderValue.value = '';
  } else {
    sliderContainer.classList.remove('hidden');
  }

  if (evt.target.id === 'effect-chrome') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 0, max: 1,},
      start: 1,
      step: 0.1,
    });

    imgPreview.style.removeProperty('filter');

    sliderElement.noUiSlider.on('update', () => {
      sliderValue.value = sliderElement.noUiSlider.get();
      imgPreview.style.setProperty('filter', `grayscale(${sliderValue.value})`);
    });
  }

  if (evt.target.id === 'effect-sepia') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 0, max: 1,},
      start: 1,
      step: 0.1,
    });

    imgPreview.style.removeProperty('filter');

    sliderElement.noUiSlider.on('update', () => {
      sliderValue.value = sliderElement.noUiSlider.get();
      imgPreview.style.setProperty('filter', `sepia(${sliderValue.value})`);
    });
  }

  if (evt.target.id === 'effect-marvin') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 0, max: 100,},
      start: 100,
      step: 1,
    });

    imgPreview.style.removeProperty('filter');

    sliderElement.noUiSlider.on('update', () => {
      sliderValue.value = sliderElement.noUiSlider.get();
      imgPreview.style.setProperty('filter', `invert(${sliderValue.value}%)`);
    });
  }

  if (evt.target.id === 'effect-phobos') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 0, max: 3,},
      start: 3,
      step: 0.1,
    });

    imgPreview.style.removeProperty('filter');

    sliderElement.noUiSlider.on('update', () => {
      sliderValue.value = sliderElement.noUiSlider.get();
      imgPreview.style.setProperty('filter', `blur(${sliderValue.value}px)`);
    });
  }

  if (evt.target.id === 'effect-heat') {
    sliderElement.noUiSlider.updateOptions({
      range: { min: 1, max: 3,},
      start: 3,
      step: 0.1,
    });

    imgPreview.style.removeProperty('filter');

    sliderElement.noUiSlider.on('update', () => {
      sliderValue.value = sliderElement.noUiSlider.get();
      imgPreview.style.setProperty('filter', `brightness(${sliderValue.value})`);
    });
  }
});

// Валидация


function validateHashtagCount () {
  const hashtagsArr = hashTagInput.value.trim().split(' ');

  if (hashtagsArr.length > MAX_HASHTAG_COUNT) {
    return false;
  } else {
    return true;
  }
}

pristine.addValidator(hashTagInput, validateHashtagCount, `хэш-тегов не должно быть больше чем ${MAX_HASHTAG_COUNT}`,1, false);

function validateHashtagRegexp () {
  const hashtagsArr = hashTagInput.value.trim().split(' ');
  if (hashTagInput.value === '') {
    return true;
  } else {
    return hashtagsArr.every((tag) => regExp.test(tag));
  }
}

pristine.addValidator(hashTagInput, validateHashtagRegexp, 'введён невалидный хэш-тег', 2, false);

function validateHashtagUniqueness () {
  const hashtagsArr = hashTagInput.value.trim().split(' ');
  const uniqueHashTagArr = new Set(hashtagsArr);
  if (hashtagsArr.length !== uniqueHashTagArr.size) {
    return false;
  } else {
    return true;
  }
}

pristine.addValidator(hashTagInput, validateHashtagUniqueness, 'хэш-теги повторяются', 3, false);

function validateDescription () {
  if (descriptionPreview.value.length > MAX_DESCRIPTION_LENGTH) {
    return false;
  } else {
    return true;
  }
}

pristine.addValidator(descriptionPreview, validateDescription, 'длина комментария больше 140 символов', 4, false);

userForm.addEventListener('submit', (evt) => {
  evt.preventDefault();

  const validForm = pristine.validate();
  if (validForm) {
    const formData = new FormData(evt.target);

    fetch('https://30.javascript.htmlacademy.pro/kekstagram',
      {
        method: 'POST',
        body: formData,
      },
    )
      .then((response) => {
        if (response.ok) {
          closeImgEditModal();
          renderSuccessMessage();
        } else {
          renderErrorMessage();
        }
      })
      .catch(() => {
        renderErrorMessage();
      });
  }
});

fileChooser.addEventListener('change', () => {
  const file = fileChooser.files[0];
  const fileName = file.name.toLowerCase();
  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));

  if (matches) {
    imgPreview.src = URL.createObjectURL(file);
  }
});
