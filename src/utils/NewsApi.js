import { handleResponse } from './constants';

const moment = require('moment');

const dateNow = Date.now(); // Текущая дата
const dateFrom = moment(dateNow - 7 * 24 * 3600 * 1000).format('YYYY-MM-DD'); // 7 дней назад с текущей даты

class NewsApi {
  getArticles(keyWord) { // Поиск по ключевым словам
    return fetch(`https://nomoreparties.co/news/v2/everything?q=${keyWord || localStorage.getItem('Key word')}&from=${dateFrom}&to=${dateNow}&pageSize=100&language=ru&apiKey=a349bbe623754e8cafb460c57b8ce4f1`,
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      .then(handleResponse);
  }

  getTopArticles() { // Актуальные новости при загрузке страницы
    return fetch('https://nomoreparties.co/news/v2/top-headlines?country=ru&language=ru&apiKey=a349bbe623754e8cafb460c57b8ce4f1',
      {
        method: 'GET',
        headers: {
          Accept: 'application/json',
        },
      })
      .then(handleResponse);
  }
}

const newsApi = new NewsApi();

export { newsApi };
