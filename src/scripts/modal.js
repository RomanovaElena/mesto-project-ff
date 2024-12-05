// Функция открытия попапа

function openModal(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByKeydown);
  element.addEventListener('mousedown', closeModalWithOverlay);
}

// Функция закрытия попапа

function closeModal(element) {
  document.removeEventListener('keydown', closeModalByKeydown);
  element.removeEventListener('mousedown', closeModalWithOverlay);
  element.classList.remove('popup_is-opened');
}

// Функция закрытия попапа нажатием на Esc

function closeModalByKeydown(evt) {
  if (evt.key === 'Escape') {
   closeModal(document.querySelector('.popup_is-opened'));
  }
}

// Функция закрытия попапа кликом на оверлэй

function closeModalWithOverlay(evt) {
  if (evt.target === evt.currentTarget) {
    closeModal(evt.currentTarget);
  }
}

export {openModal, closeModal};