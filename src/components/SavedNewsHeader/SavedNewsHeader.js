import './SavedNewsHeader.css';

import React, { useState, useEffect } from 'react';
import { UserContext } from '../../contexts/CurrentUserContext.js';

function SavedNewsHeader(savedArticles) {
  const currentUser = React.useContext(UserContext);
  const currentUserName = currentUser.name || 'Вы вышли';

  function declOfNum(n, titles) { // Функция определения окончаний в словах в зависимости от числительного
    return titles[n % 10 == 1 && n % 100 != 11 ? 0 : n % 10 >= 2 && n % 10 <= 4 && (n % 100 < 10 || n % 100 >= 20) ? 1 : 2];
  }

  const [keywords, setKeyWords] = useState(''); // Стейт содержит ключевые слова для статей

  useEffect(() => {
    if(savedArticles.savedArticles.length > 0) {
      const words = savedArticles.savedArticles.map((article) => (article.keyword)); // Забираем в массив все ключевые слова из статей
      const uniqueWords = words.filter((item, pos) => words.indexOf(item) == pos); // Удаляем повторяющиеся ключевые слова в массиве
      setKeyWords(uniqueWords);
    }
  }, [savedArticles]);

  return (
    <section className="saved-news-info">
      <h2 className="saved-news-info__title">Сохранённые статьи</h2>
      <h3 className="saved-news-info__quantity">
        {
          `${currentUserName.charAt(0).toUpperCase() + currentUserName.slice(1)}, у вас ${savedArticles.savedArticles.length > 0 ? savedArticles.savedArticles.length : 'пока еще нет '} ${declOfNum(savedArticles.savedArticles.length, ['сохраненная', 'сохраненные', 'сохраненных'])} ${declOfNum(savedArticles.savedArticles.length, ['статья', 'статьи', 'статей'])}`
        }
      </h3>
      {
        savedArticles.savedArticles.length > 0
          ? <p className="saved-news-info__description">По ключевым словам: <span className="saved-news-info__bold">{keywords.length < 4 ? keywords[0] + (keywords[1] ? `, ${keywords[1]}` : '') + (keywords[2] ? `, ${keywords[2]}` : '') : `${keywords[0]}, ${keywords[1]}`}</span>{keywords.length > 3 ? ' и ' : ''}{keywords.length > 3 ? <span className="saved-news-info__bold">{`${keywords.length - 2}-м `}</span> : ''}{keywords.length > 3 ? 'другим' : ''}</p>
          : ''
      }
    </section>
  );
}

export default SavedNewsHeader;
