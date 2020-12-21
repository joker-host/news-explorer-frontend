import './Search.css';

import React from 'react';
import SearchForm from '../SearchForm/SearchForm';

function Search({ setKeyWord, onSubmitSearchForm }) {
  return (
    <section className="search">
      <div className="search__wrapper">
        <h2 className="search__title">Что творится в мире?</h2>
        <p className="search__description">
          Находите самые свежие статьи на любую тему и сохраняйте в своём личном кабинете.
          А самые интересные мы отобразим сразу.
        </p>
        <SearchForm setKeyWord={setKeyWord} onSubmitSearchForm={onSubmitSearchForm} />
      </div>
    </section>
  );
}

export default Search;
