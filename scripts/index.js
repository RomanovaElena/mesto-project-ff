// @todo: Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// @todo: DOM узлы

const cardsList = document.querySelector('.places__list');

// @todo: Функция создания карточки

function createCard(initialCard, deleteCard) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);

  cardElement.querySelector('.card__image').src = initialCard.link;
  cardElement.querySelector('.card__image').alt = initialCard.name;
  cardElement.querySelector('.card__title').textContent = initialCard.name;

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
