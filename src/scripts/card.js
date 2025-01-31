import {addLike, removeLike} from './api.js';

// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content;

// Функция создания карточки

function createCard(cardData, likeCard, openImage, openConfirmDialog, profileId) {
  const cardElement = cardTemplate
    .querySelector('.places__item')
    .cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  const cardDeleteButton = cardElement.querySelector('.card__delete-button');
  const cardLikeButton = cardElement.querySelector('.card__like-button');
  const cardId = cardData._id;

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;
  cardLikeCounter.textContent = cardData.likes.length;

  if (cardData.owner._id === profileId){
    cardDeleteButton
      .addEventListener('click', (evt) => {
        openConfirmDialog(evt, cardData);
      });
  } else {
    cardDeleteButton.remove();
  }

  cardLikeButton
    .addEventListener('click', () => likeCard(cardLikeButton, cardId));

  cardImage
    .addEventListener('click', () => openImage(cardData));

  return cardElement;
}

// Функция удаления карточки

function deleteCard(cardElement) {
  cardElement.remove();
}

// Функция лайка карточки

function likeCard(likeButton, cardId) {
  const cardElement = likeButton.closest('.places__item');
  const cardLikeCounter = cardElement.querySelector('.card__like-counter');
  if (likeButton.classList.contains('card__like-button_is-active')) {
    removeLike(cardId)
      .then((res) => {
        likeButton.classList.toggle('card__like-button_is-active');
        cardLikeCounter.textContent = res.likes.length > 0 ? res.likes.length : '';
      })
      .catch((err) => {
        console.log(err);
      });
  } else {
    addLike(cardId)
      .then((res) => {
        likeButton.classList.toggle('card__like-button_is-active');
        cardLikeCounter.textContent = res.likes.length > 0 ? res.likes.length : '';
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

export {createCard, deleteCard, likeCard};