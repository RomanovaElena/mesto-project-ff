import '../pages/index.css'; // добавьте импорт главного файла стилей 
import {initialCards} from './cards.js'
import {openModal, closeModal} from './modal.js'
// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(initialCard, deleteCard) {
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

  return cardElement;
}

// @todo: Функция удаления карточки

function deleteCard(item) {
  item.remove();
}

// @todo: Вывести карточки на страницу

function addCard(parent, card) {
  parent.append(card);
}

initialCards.forEach(function(item) {
  addCard(cardsList, createCard(item, deleteCard))
});



////////////////////////////////////////////////////

const popupEdit = document.querySelector('.popup_type_edit');
const popupNewCard = document.querySelector('.popup_type_new-card')


const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const poopupCloseButton = document.querySelector('.popup__close');


profileEditButton.addEventListener('click', function(){
  openModal(popupEdit);
});

profileAddButton.addEventListener('click', function() {
  openModal(popupNewCard);
})

poopupCloseButton.addEventListener('click', function(){
  closeModal(popupEdit);
});

// poopupCloseButton.addEventListener('click', function(){
//   closeModal(popupNewCard);
// });