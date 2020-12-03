import './NoResults.css';

import React from 'react';
import not_found from '../../images/not-found.svg';

function NoResults() {
  return (
    <section className="search-without-results">
      <img className="search-without-results__image" src={not_found} alt="здесь должна быть картинка `не найдено`"></img>
      <h2 className="search-without-results__title">Ничего не найдено</h2>
      <p className="search-without-results__label">К сожалению по вашему запросу ничего не найдено.</p>
    </section>
  );
}

export default NoResults;
