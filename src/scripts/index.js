import '../pages/index.css';
import {openModal, closeModal} from './modal.js';
import {targetCardId, targetDeleteButton, createCard, deleteCard, likeCard} from './card.js';
import {validationConfig, enableValidation, clearValidation} from './validation.js';
import {getUserData, getInitialCards, checkUrl, updateUserData, postCard, updateUserAvatar} from './api.js';

// Переменная для хранения id текущего пользователя

let profileId;

// DOM узлы

const cardsList = document.querySelector('.places__list');

// DOM узлы попапа редактирования профиля

const popupEditProfile = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const editProfileCloseButton = popupEditProfile.querySelector('.popup__close');
const profileTitle = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const formEditProfile = document.querySelector('form[name="edit-profile"]');
const editProfileSubmitButton = formEditProfile.querySelector('.popup__button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

// DOM узлы попапа редактирования аватара

const popupEditAvatar = document.querySelector('.popup_type_edit-avatar');
const editAvatarCloseButton = popupEditAvatar.querySelector('.popup__close');
const formEditAvatar = document.querySelector('form[name="edit-avatar"]');
const editAvatarSubmitButton = formEditAvatar.querySelector('.popup__button');
const profileImage = document.querySelector('.profile__image');
const avatarUrlInput = formEditAvatar.querySelector('.popup__input_type_url');

// DOM узлы попапа добавления новой карточки 

const popupNewCard = document.querySelector('.popup_type_new-card');
const profileAddButton = document.querySelector('.profile__add-button');
const newCardCloseButton = popupNewCard.querySelector('.popup__close');
const formNewPlace = document.querySelector('form[name="new-place"]');
const newCardSubmitButton = formNewPlace.querySelector('.popup__button');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const urlInput = document.querySelector('.popup__input_type_url');

// DOM узлы попапа просмотра картинки

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');
const imageCloseButton = popupTypeImage.querySelector('.popup__close');

// DOM узлы попапа подтверждения удаления карточки

const popupConfirm = document.querySelector('.popup_type_confirm');
const confirmCloseButton = popupConfirm.querySelector('.popup__close');
const formConfirm = document.querySelector('form[name="confirm"]');

// Функция открытия карточки по клику на картинку 

function openImage(cardData) {
  popupImage.src = cardData.link;
  popupImage.alt = cardData.name;
  popupCaption.textContent = cardData.name;
  openModal(popupTypeImage);
}

// Функция открытия попапа подтверждения удаления карточки 

function openConfirmDialog() { 
  openModal(popupConfirm);
}

// Функция заполнения инпутов сохраненными значениями

function fillPopupEditProfilesInputs() {
  nameInput.value = profileTitle.textContent;
  jobInput.value = profileDescription.textContent;
}

// Функция визуализации процесса загрузки данных

function renderLoading(element, isLoading) {
  element.textContent = isLoading ? 'Сохранение...' : 'Сохранить';
}

// Обработчик отправки формы редактирования профиля

function handleEditProfileFormSubmit(evt) {
  evt.preventDefault(); 
  renderLoading(editProfileSubmitButton, true);
  updateUserData(nameInput.value, jobInput.value)
    .then((res) => {
      profileTitle.textContent = res.name;
      profileDescription.textContent = res.about;
      closeModal(popupEditProfile);
    }) 
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(editProfileSubmitButton, false);
    });
}

// Обработчик отправки формы редактирования аватара

function handleEditAvatarFormSubmit(evt) {
  evt.preventDefault(); 
  renderLoading(editAvatarSubmitButton, true);
  Promise.all([checkUrl(avatarUrlInput.value),   updateUserAvatar(avatarUrlInput.value)])
    .then((res) => {
      profileImage.style.backgroundImage = res.avatar;
      closeModal(popupEditAvatar);
    }) 
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(editAvatarSubmitButton, false);
    });
}

// Обработчик отправки формы добавления новой карточки

function handleNewPlaceFormSubmit(evt) {
  evt.preventDefault(); 
  renderLoading(newCardSubmitButton, true);
  const newCardValues = {
    name: cardNameInput.value,
    link: urlInput.value
  }
  postCard(newCardValues)
    .then((card) => {
      const newCard = createCard(card, likeCard, openImage, openConfirmDialog, profileId);
      cardsList.prepend(newCard);
      closeModal(popupNewCard);
    })
    .catch((error) => {
      console.log(error);
    })
    .finally(() => {
      renderLoading(newCardSubmitButton, false);
    });
}

// Обработчик отправки формы подтверждения удаления карточки

function handleConfirmFormSubmit(evt) {
  evt.preventDefault();
  deleteCard(targetDeleteButton, targetCardId);
  closeModal(popupConfirm);
}

// Обработчики событий при открытии и закрытии попапов

profileEditButton
  .addEventListener('click', () => {
    openModal(popupEditProfile);
    fillPopupEditProfilesInputs();
    clearValidation(formEditProfile, validationConfig);
  });

profileImage 
  .addEventListener('click', () => {
    openModal(popupEditAvatar);
    formEditAvatar.reset();
    clearValidation(formEditAvatar, validationConfig);
  })

profileAddButton
  .addEventListener('click', () => {
    openModal(popupNewCard);
    formNewPlace.reset();
    clearValidation(formNewPlace, validationConfig); 
  })

editProfileCloseButton
  .addEventListener('click', () => {
    closeModal(popupEditProfile);
  })

editAvatarCloseButton
  .addEventListener('click', () => {
    closeModal(popupEditAvatar);
  })

newCardCloseButton
  .addEventListener('click', () => {
    closeModal(popupNewCard);
  })

imageCloseButton
  .addEventListener('click', () => {
    closeModal(popupTypeImage);
  });

confirmCloseButton 
.addEventListener('click', () => {
  closeModal(popupConfirm);
});

// Обработчики событий при отправке форм

formEditProfile
  .addEventListener('submit', handleEditProfileFormSubmit); 

formEditAvatar
  .addEventListener('submit', handleEditAvatarFormSubmit);

formNewPlace.
  addEventListener('submit', handleNewPlaceFormSubmit); 

formConfirm 
  .addEventListener('submit', handleConfirmFormSubmit);

// Добавить валидацию полей всем формам на странице

enableValidation(validationConfig);

// Загрузить информацию о пользователе и данные карточек с сервера

Promise.all([getUserData(), getInitialCards()])
  .then(([profile, cards]) => {
    profileTitle.textContent = profile.name;
    profileDescription.textContent = profile.about;
    profileId = profile._id;
    profileImage.style.backgroundImage = `url(${profile.avatar})`;
    cards.forEach((cardData) => {
      cardsList.append(
        createCard(cardData, likeCard, openImage, openConfirmDialog, profileId)
      );
    });
  })
  .catch((err) => {
    console.log(err);
  });