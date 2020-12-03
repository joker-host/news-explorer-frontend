import './Main.css';

import React from 'react';
import About from '../About/About';
import Preloader from '../Preloader/Preloader';
import NoResults from '../NoResults/NoResults';
import Search from '../Search/Search';
import SearchResult from '../SearchResult/SearchResult';

function Main({
  setKeyWord, keyWord, onSubmitSearchForm, isLoading, articles, setArticles, loggedIn, savedArticles, setSavedArticles,
}) {
  return (
    <main className="content">
      <Search setKeyWord={setKeyWord} onSubmitSearchForm={onSubmitSearchForm}/>
      <SearchResult articles={articles} setArticles={setArticles} loggedIn={loggedIn} keyWord={keyWord} savedArticles={savedArticles} setSavedArticles={setSavedArticles}/>
      {isLoading ? <Preloader/> : ''}
      <NoResults />
      <About />
    </main>
  );
}

export default Main;
