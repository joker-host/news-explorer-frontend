import './NewsCard.css';

import React, { useState, useEffect } from 'react';
import { Route, Switch } from 'react-router-dom';
import { mainApi } from '../../utils/MainApi.js';
import 'moment/locale/ru';

const moment = require('moment');
const validator = require('validator');

function NewsCard({
  article,
  myArticle,
  cardImage,
  cardDate,
  cardTitle,
  cardDescription,
  cardTag,
  onClickArticle,
  loggedIn,
  keyWord,
  savedArticles,
  setSavedArticles,
}) {
  const [activeFlag, setActiveFlag] = useState(false);
  useEffect(() => {
    if (loggedIn) {
      if (savedArticles) {
        setActiveFlag(
          savedArticles.find((i) => i.title === cardTitle) !== undefined,
        );
      }
    }
  }, [savedArticles, cardTitle, activeFlag, loggedIn]);

  const keyWordForSave = localStorage.getItem('keyWordForSave') || 'Без ключевого слова';
  function saveArticle() {
    mainApi
      .saveArticle(
        keyWordForSave,
        cardTitle,
        cardDescription,
        cardDate,
        cardTag,
        validator.isURL(onClickArticle) ? onClickArticle : 'https://www.bbc.com/russian',
        validator.isURL(cardImage)
          ? cardImage
          : 'https://get.pxhere.com/photo/nature-branch-plant-leaf-flower-frost-foliage-green-herb-botany-garden-flora-gardening-shrub-jasmine-flowering-plant-common-sage-land-plant-20931.jpg',
      )
      .then(() => {
        mainApi
          .getInitialArticles()
          .then((res) => {
            setSavedArticles(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function deleteArticle(id) {
    mainApi
      .deleteArticle(id)
      .then(() => {
        mainApi
          .getInitialArticles()
          .then((res) => {
            setSavedArticles(res);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function modifyArticle() {
    // console.log(savedArticles)

    const savedArticle = savedArticles.find((i) => {
      if (myArticle) {
        return i.title === myArticle.title && i.text === myArticle.text;
      }

      if (article) {
        return i.title === article.title && i.text === article.description;
      }
    });
    // console.log(savedArticle)
    if (savedArticle) {
      // console.log(savedArticle._id)
      // console.log(myArticle)
      deleteArticle(savedArticle._id);
    } else {
      saveArticle();
    }
  }

  return (
    <div className="search-results__card">
      <Switch>
        <Route path="/main">
          <div className="search-results__save-button-wrapper">
            <button type='button' className={activeFlag ? 'search-results__save-button-active' : 'search-results__save-button'} disabled={!loggedIn} onClick={modifyArticle}></button>
            <div className="search-results__save-button-description">
              <p className="search-results__save-button-description-text">Войдите, чтобы сохранять статьи</p>
            </div>
          </div>
        </Route>
        <Route path="/saved-news">
          <div className="search-results__card-tag">
            <p className="search-results__card-text">{keyWord}</p>
          </div>
          <div className="search-results__save-button-wrapper">
            <button type='button' className="search-results__save-button search-results__delete" onClick={modifyArticle}></button>
            <div className="search-results__save-button-description">
              <p className="search-results__save-button-description-text">Убрать из сохранённых</p>
            </div>
          </div>
        </Route>
      </Switch>

      <img className="search-results__image"
        src={cardImage}
        alt="здесь должна быть картинка для новости :)"
        onError={(e) => { e.target.src = 'https://avatars.mds.yandex.net/get-zen_doc/1132604/pub_5fbf9b271080732360f5473b_5fbf9bc9b1f92632ba86f7bb/scale_2400'; }}>
      </img>
      <div className="search-results__card-wrapper">
        <a className="search-results__card-link" href={onClickArticle} target="_blank" rel="noreferrer"></a>
        <p className="search-results__date">{moment(cardDate).format('LL').slice(0, -3)}</p>
        <h3 className="search-results__card-title">{cardTitle}</h3>
        {/* <p className="search-results__card-description">{cardDescription.replace(/[<>olli]/)}</p> */}
        <p className="search-results__card-description">{cardDescription}</p>
        <p className="search-results__card-source">{cardTag}</p>
      </div>
    </div>
  );
}

export default NewsCard;
