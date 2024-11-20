 function openModal(element) {
  element.classList.add('popup_is-opened');
  document.addEventListener('keydown', closeModalByKeydown);
}

function closeModal(element) {
  document.removeEventListener('keydown', closeModalByKeydown);
  element.classList.remove('popup_is-opened');
}

function closeModalByKeydown(evt) {
  if (evt.key === 'Escape') {
   closeModal(document.querySelector('.popup_is-opened'));
  }
}

function closeModalWithOverlay(){
  
}

export{openModal, closeModal, closeModalByKeydown}