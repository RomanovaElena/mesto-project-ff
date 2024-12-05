import '../pages/index.css';
import {initialCards} from './cards.js';
import {openModal, closeModal} from './modal.js';
import {cardsList, createCard, deleteCard, addCard, likeCard, openImage, popupTypeImage} from './card.js';

// Вывести карточки на страницу

initialCards.forEach(function(item) {
  addCard(cardsList, createCard(item, deleteCard, likeCard, openImage));
});

// DOM узлы

const popupEditProfile = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card');
const editProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const newCardCloseButton = popupNewCard.querySelector('.popup__close');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const imageCloseButton = popupTypeImage.querySelector('.popup__close');

// Обработчики событий при открытии и закрытии попапов

profileEditButton.addEventListener('click', () => {
  openModal(popupEditProfile);
  fillPopupEditProfilesInputs();
});

profileAddButton.addEventListener('click', () => {
  openModal(popupNewCard);
})

editProfileCloseButton.addEventListener('click', () => {
  closeModal(popupEditProfile);
  formEditProfile.reset();
})

newCardCloseButton.addEventListener('click', () => {
  closeModal(popupNewCard);
  formNewPlace.reset();
})

imageCloseButton.addEventListener('click', () => {
  closeModal(popupTypeImage);
});

// Редактирование профиля
// DOM узлы

const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// Обработчик отправки формы

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfile);
}

formEditProfile.addEventListener('submit', handleFormSubmit); 

// Функция заполнения инпутов сохраненными значениями

function fillPopupEditProfilesInputs() {
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