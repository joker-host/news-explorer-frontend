import './SearchResult.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import placeholderImage from '../../images/news_1.png';

import NewsCard from '../NewsCard/NewsCard';

function SearchResult({
  articles, setArticles, loggedIn, savedArticles, setSavedArticles,
}) {
  const [esleButtonShow, setEsleButtonShow] = useState(true); // Стейт показывающий или скрывающий кнопку "Показать еще"

  function checkArrayLength() { // Проверка массива статей, если отрисованы все, убираем кнопку "Показать еще"
    if (articles.itemToShow >= articles.articlesArr.length) {
      setEsleButtonShow(false);
    }
  }

  // function getTopCoords() {
  //   window
  // }

  const scrollHeight = Math.max(
    document.body.scrollHeight, document.documentElement.scrollHeight,
    document.body.offsetHeight, document.documentElement.offsetHeight,
    document.body.clientHeight, document.documentElement.clientHeight
  );

  const getScrollOffsets = function (w) { // Функция определяет текущее положение полосы прокрутки страницы
    w = w || window;
    if (w.pageXOffset != null)
      return { x: w.pageXOffset, y: w.pageYOffset };
    const d = w.document;
    if (document.compatMode == 'CSS1Compat')
      return {
        x: d.documentElement.scrollLeft,
        y: d.documentElement.scrollTop
      };
    return { x: d.body.scrollLeft, y: d.body.scrollTop };
  }



  function showMore() { // Функция отрисовки трех дополнительных карточек
    checkArrayLength();
    setArticles({ articlesArr: articles.articlesArr, itemToShow: articles.itemToShow + 3, showSection: true });
    checkArrayLength(); // Пролистать страницу наверх
    window.scrollTo({
      top: getScrollOffsets().y - 300, // текущее положение страницы прокрутки минус 300 пикселей
      behavior: 'smooth',
    });
  }

  useEffect(() => { // Обновляет запись статей в локальном хранилище
    checkArrayLength();
    if (articles.articlesArr.length > 0) {
      localStorage.setItem('articles', JSON.stringify({ articlesArr: articles.articlesArr, itemToShow: articles.itemToShow, showSection: articles.showSection }));
    }
  }, [articles]);

  return (
    <Switch>
      <Route path="/main">
        {articles.showSection
          ? (
            <section className="search-results">
              <h2 className="search-results__header">Результаты поиска</h2>
              <div className="search-results__cards">
                {
                  articles.articlesArr
                    .slice(0, articles.itemToShow)
                    .map((article) => (
                      <NewsCard
                        article={article}
                        key={article.url}
                        cardImage={article.urlToImage ? article.urlToImage : placeholderImage}
                        cardDate={article.publishedAt}
                        cardTitle={article.title}
                        cardDescription={article.description}
                        cardTag={article.author || 'Без указания источника'}
                        onClickArticle={article.url}
                        loggedIn={loggedIn}
                        articles={articles}
                        savedArticles={savedArticles}
                        setArticles={setArticles}
                        setSavedArticles={setSavedArticles}
                      />
                    ))
                }
              </div>
              {
                esleButtonShow ? <button className="search-results__else-news-button" onClick={showMore}>Показать еще</button> : ''
              }
            </section>
          )
          : ''}
      </Route>
      <Route path="/saved-news">
        {
          savedArticles.length > 0
            ? (
              <section className="search-results">
                <div className="search-results__cards">
                  {
                    savedArticles.length > 0
                      ? (savedArticles.map((article) => (
                        <NewsCard
                          myArticle={article}
                          key={article._id}
                          cardImage={article.image}
                          cardDate={article.date}
                          cardTitle={article.title}
                          cardDescription={article.text}
                          cardTag={article.source || 'Без указания источника'}
                          onClickArticle={article.link}
                          keyWord={article.keyword}
                          _id={article._id}
                          articles={articles}
                          savedArticles={savedArticles}
                          setArticles={setArticles}
                          setSavedArticles={setSavedArticles}
                        />
                      ))) : ''
                  }
                </div>
              </section>
            )
            : ''
        }
      </Route>
    </Switch>
  );
}

export default SearchResult;
