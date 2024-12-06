// Темплейт карточки

const cardTemplate = document.querySelector('#card-template').content; 

// Функция создания карточки

function createCard(cardData, deleteCard, likeCard, openImage) {
  const cardElement = cardTemplate.querySelector('.places__item').cloneNode(true);
  const cardImage = cardElement.querySelector('.card__image');
  const cardTitle = cardElement.querySelector('.card__title');

  cardImage.src = cardData.link;
  cardImage.alt = cardData.name;
  cardTitle.textContent = cardData.name;

  cardElement
    .querySelector('.card__delete-button')
    .addEventListener('click', function() {
      deleteCard(cardElement);
    });

  cardElement
    .querySelector('.card__like-button')
    .addEventListener('click', likeCard);

  cardImage.addEventListener('click', function() {
    openImage(cardData);
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

export {createCard, deleteCard, addCard, likeCard};