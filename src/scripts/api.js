
// Объект c конфигурацией для интеграции c API

const config = {
  baseUrl: 'https://nomoreparties.co/v1/pwff-cohort-1',
  headers: {
    authorization: '0dc76348-4394-4007-9b0d-231d380a3192',
    'Content-Type': 'application/json'
  }
}

// Функция проверки статуса ответа от сервера

function checkResponseState(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

// Функция загрузки информации о пользователе с сервера

function getUserData() {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
  })
    .then(res => checkResponseState(res));
};

// Функция загрузки карточек с сервера

function getInitialCards() {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
  })
    .then(res => checkResponseState(res));
} 

// Функция сохранения отредактированных данных пользователя на сервере

function updateUserData(name, description) {
  return fetch(`${config.baseUrl}/users/me`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: description,
    }),
  })
    .then(res => checkResponseState(res));
};

// Функция добавления новой карточки на сервер

function postCard({name, link}) {
  return fetch(`${config.baseUrl}/cards`, {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })
    .then(res => checkResponseState(res));
};

// Функция удаления карточки с сервера по id

function deleteCardById(cardId) {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => checkResponseState(res));
};

// Функция проверки, что URL именно на изображение, и он действительный

function checkUrl(url) {
  return fetch(url, {
    method: 'HEAD',
  })
    .then((res) => {
      if (res.ok) {
        if (res.headers.get('Content-Type').includes('image')) {
          return Promise.resolve();
        }
        return Promise.reject(`Ошибка: недействительный URL`);
      }
      return Promise.reject(`Ошибка: URL не ссылается на изображение`);
    });
};

// Функция обновления аватара пользователя на сервере

function updateUserAvatar(url) {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      avatar: url,
    }),
  })
    .then(res => checkResponseState(res));
};

// Функция постановки лайка

function addLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })
    .then(res => checkResponseState(res));
};

// Функция снятия лайка

function removeLike(cardId) {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })
    .then(res => checkResponseState(res));
};

export {getUserData, getInitialCards, updateUserData, postCard, 
  deleteCardById, checkUrl, updateUserAvatar, addLike, removeLike};










