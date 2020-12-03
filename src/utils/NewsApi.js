import { handleResponse } from './constants.js';

const moment = require('moment');

const dateNow = Date.now();
const dateFrom = moment(dateNow - 7 * 24 * 3600 * 1000).format('YYYY-MM-DD');

class NewsApi {
  getArticles(keyWord) {
    return fetch(`https://newsapi.org/v2/everything?q=${keyWord || localStorage.getItem('Key word')}&from=${dateFrom}&to=${dateNow}&pageSize=100&language=ru&apiKey=2dc416e57caa4931a4f1163e0f3bee2a`,
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
