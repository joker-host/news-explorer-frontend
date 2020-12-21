import { handleResponse, baseUrl } from './constants';

class MainApi {
  register(email, password, name) { // Запрос на регистрацию
    return fetch(`${baseUrl}/signup`, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password, name }),
    })
      .then((res) => res.json())
      .then((res) => res)
      .catch((err) => {
        console.log(err);
      });
  }

  authorize(email, password) { // Запрос на авторизацию
    return fetch(`${baseUrl}/signin`, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, password }),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.token) {
          localStorage.setItem('jwt', data.token);
        }
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getContent(token) { // Запрос на проверку токена
    return fetch(`${baseUrl}/users/me`, {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => data)
      .catch((err) => {
        console.log(err);
      });
  }

  saveArticle(keyword, title, text, date, source, link, image, owner) {
    // Запрос на сохранение статьи
    return fetch(`${baseUrl}/articles`, {
      method: 'POST',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
      body: JSON.stringify({
        keyword, title, text, date, source, link, image, owner,
      }),
    }).then(handleResponse);
  }

  deleteArticle(idCard) { // Запрос на удаление статьи
    return fetch(`${baseUrl}/articles/${idCard}`, {
      method: 'DELETE',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(handleResponse);
  }

  getInitialArticles() { // Запрос на получение сохраненных статей пользователя
    return fetch(`${baseUrl}/articles`, {
      method: 'GET',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(handleResponse);
  }
}

const mainApi = new MainApi();

export { mainApi };
