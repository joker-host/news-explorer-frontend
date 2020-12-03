import './SearchResult.css';
import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import placeholderImage from '../../images/news_1.png';

import NewsCard from '../NewsCard/NewsCard';

function SearchResult({
  articles, setArticles, loggedIn, savedArticles, setSavedArticles,
}) {
  const [esleButtonShow, setEsleButtonShow] = useState(true);

  function checkArrayLength() {
    if (articles.itemToShow >= articles.articlesArr.length) {
      setEsleButtonShow(false);
    }
  }

  function showMore() {
    checkArrayLength();
    setArticles({ articlesArr: articles.articlesArr, itemToShow: articles.itemToShow + 3, showSection: true });
    checkArrayLength();
    window.scrollTo({
      top: 576,
      behavior: 'smooth',
    });
  }

  useEffect(() => {
    checkArrayLength();
    if (articles.articlesArr.length > 0) {
      localStorage.setItem('articles', JSON.stringify({ articlesArr: articles.articlesArr, itemToShow: articles.itemToShow, showSection: articles.showSection }));
    }
  }, [articles]);

  useEffect(() => {
    if (JSON.parse(localStorage.getItem('articles'))) {
      setArticles(JSON.parse(localStorage.getItem('articles')));
    }
  }, []);

  function test() {
    console.log(1);
  }

  return (
    <Switch>
      <Route path="/main">
        {articles.showSection
          ? <section className="search-results">
            <h2 className="search-results__header" onClick={test}>Результаты поиска</h2>
            <div className="search-results__cards">
              {
                articles.articlesArr
                  .slice(0, articles.itemToShow)
                  .map((article) => <NewsCard
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
                  />)
              }
            </div>
            {
              esleButtonShow ? <button className="search-results__else-news-button" onClick={showMore}>Показать еще</button> : ''
            }
          </section>
          : ''
        }
      </Route>
      <Route path="/saved-news">
        {
          savedArticles.length > 0
            ? <section className="search-results">
              <div className="search-results__cards">
                {
                  // console.log(savedArticles)
                  // savedArticles.map(({ date, image, keyword, link, source, text, title, _id }) =>
                  savedArticles.length > 0
                    ? (savedArticles.map((article) => <NewsCard
                      myArticle={article}
                      key={article._id}
                      // cardImage={urlToImage ? urlToImage : placeholderImage}
                      cardImage={article.image}
                      cardDate={article.date}
                      cardTitle={article.title}
                      cardDescription={article.text}
                      cardTag={article.source || 'Без указания источника'}
                      onClickArticle={article.link}
                      keyWord={article.keyword}
                      _id={article._id}
                      // id={article._id}
                      articles={articles}
                      savedArticles={savedArticles}
                      setArticles={setArticles}
                      setSavedArticles={setSavedArticles}
                      // loggedIn={loggedIn}
                    />)) : ''
                }
              </div>
            </section>
            : ''
        }
      </Route>
    </Switch>
  );
}

export default SearchResult;
