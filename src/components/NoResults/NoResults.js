import './NoResults.css';

import React from 'react';
import notFound from '../../images/not-found.svg';

function NoResults() {
  return (
    <section className="search-without-results">
      <img className="search-without-results__image" src={notFound} alt="здесь должна быть картинка `не найдено`" />
      <h2 className="search-without-results__title">Ничего не найдено</h2>
      <p className="search-without-results__label">К сожалению по вашему запросу ничего не найдено.</p>
    </section>
  );
}

export default NoResults;
