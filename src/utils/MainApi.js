import { handleResponse, baseUrl } from './constants.js';

class MainApi {
  register(email, password, name) {
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

  authorize(email, password) {
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
        localStorage.setItem('jwt', data.token);
        return data;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  getContent(token) {
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

  deleteArticle(idCard) {
    return fetch(`${baseUrl}/articles/${idCard}`, {
      method: 'DELETE',
      // mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('jwt')}`,
      },
    }).then(handleResponse);
  }

  getInitialArticles() {
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
