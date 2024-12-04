import '../pages/index.css';
import {initialCards} from './cards.js';
import {openModal, closeModal, closeModalByButton} from './modal.js';
import {cardsList, createCard, deleteCard, addCard, likeCard, openImage, popupTypeImage} from './card.js'

// Вывести карточки на страницу

initialCards.forEach(function(item) {
  addCard(cardsList, createCard(item, deleteCard, likeCard, openImage))
});

// DOM узлы

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');

// Обработчики событий при открытии и закрытии попапов

profileEditButton.addEventListener('click', function(){
  openModal(popupEdit);
  fillPopupEditInputs();
});

profileAddButton.addEventListener('click', function() {
  openModal(popupNewCard);
})

popupEdit.addEventListener('click', function(evt){
  closeModalByButton(evt);

  if(evt.target.classList.contains('popup__close')){
    nameInput.value = '';
    jobInput.value = '';
  }
});

popupNewCard.addEventListener('click', function(evt) {
  closeModalByButton(evt);
  if(evt.target.classList.contains('popup__close')){
    cardNameInput.value = '';
    urlInput.value = '';
  }
});

popupTypeImage.addEventListener('click', function(evt) {
  closeModalByButton(evt);
});

// Редактирование профиля

// DOM узлы

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');

const formEdit = document.querySelector('form[name="edit-profile"]');

const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Обработчик отправки формы

function handleFormSubmit(evt) {
  evt.preventDefault(); // Эта строчка отменяет стандартную отправку формы.

  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;

  closeModal(popupEdit);
}

formEdit.addEventListener('submit', handleFormSubmit); 

// Функция заполнения инпутов сохраненными значениями

function fillPopupEditInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Добавление новой карточки 

// DOM узлы

const formNewPlace = document.querySelector('form[name="new-place"]');

const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

// Обработчик отправки формы

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault(); 

  const newCardValues = {
      name: cardNameInput.value,
      link: urlInput.value
  }
  const newCard = createCard(newCardValues, deleteCard);
  cardsList.prepend(newCard);

  closeModal(popupNewCard);
}

formNewPlace.addEventListener('submit', handleNewPlaceFormSubmit); 