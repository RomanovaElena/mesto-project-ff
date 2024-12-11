import '../pages/index.css';
import {initialCards} from './cards.js';
import {openModal, closeModal} from './modal.js';
import {createCard, deleteCard, addCard, likeCard} from './card.js';

// DOM узлы

const cardsList = document.querySelector('.places__list');

// DOM узлы попапа редактирования профиля

const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// DOM узлы попапа добавления новой карточки 

const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const newCardCloseButton = popupNewCard.querySelector('.popup__close');
const formNewPlace = document.querySelector('form[name="new-place"]');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

// DOM узлы попапа просмотра картинки

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const imageCloseButton = popupTypeImage.querySelector('.popup__close');

// Функция открытия карточки по клику на картинку 

function openImage(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

// Функция заполнения инпутов сохраненными значениями

function fillPopupEditProfilesInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Обработчик отправки формы редактирования профиля

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  profileTitle.textContent = nameInput.value;
  profileDescription.textContent = jobInput.value;
  closeModal(popupEditProfile);
}

// Обработчик отправки формы добавления новой карточки

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

// Обработчики событий при открытии и закрытии попапов

profileEditButton
  .addEventListener('click', () => {
    openModal(popupEditProfile);
    fillPopupEditProfilesInputs();
  });

profileAddButton
  .addEventListener('click', () => {
    openModal(popupNewCard);
    formNewPlace.reset();
  })

editProfileCloseButton
  .addEventListener('click', () => {
    closeModal(popupEditProfile);
  })

newCardCloseButton
  .addEventListener('click', () => {
    closeModal(popupNewCard);
  })

imageCloseButton
  .addEventListener('click', () => {
    closeModal(popupTypeImage);
  });

// Обработчики событий при отправке форм

formEditProfile
  .addEventListener('submit', handleEditProfileFormSubmit); 

formNewPlace.
  addEventListener('submit', handleNewPlaceFormSubmit); 

// Вывести карточки на страницу

initialCards.forEach(function(cardData) {
  addCard(cardsList, createCard(cardData, deleteCard, likeCard, openImage));
});