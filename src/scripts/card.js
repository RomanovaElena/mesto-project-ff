
import { openModal } from "./modal";

// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// DOM узлы

const cardsList = document.querySelector('.places__list');

// Функция создания карточки

function createCard(initialCard, deleteCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');
  
  cardImage.src = initialCard.link;
  cardImage.alt = initialCard.name;
  cardTitle.textContent = initialCard.name;

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', function() {
      deleteCard(cardElement)
    });


  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', function(evt) {
      likeCard(evt);
    });

  cardElement
    .querySelector('.card__image')
    .addEventListener('click', function(evt) {
      openImage(evt);
    });


  return cardElement;
}

// Функция удаления карточки

function deleteCard(item) {
  item.remove();
}

// Вывести карточки на страницу

function addCard(parent, card) {
  parent.append(card);
}

// Функция лайка карточки

function likeCard(evt) {
  if (evt.target.classList.contains('card__like-button')){
    evt.target.classList.toggle('card__like-button_is-active');
  } 
}

// Открыть карточку по клику на картинку 

const popupTypeImage = document.querySelector('.popup_type_image');
const popupImage = document.querySelector('.popup__image');
const popupCaption = document.querySelector('.popup__caption');

function openImage(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupCaption.textContent = evt.target.alt;

  openModal(popupTypeImage);
}


export {cardsList, createCard, deleteCard, addCard, likeCard, openImage, popupTypeImage}