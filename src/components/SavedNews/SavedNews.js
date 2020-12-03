import './SavedNews.css';

import React from 'react';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import SearchResult from '../SearchResult/SearchResult';

function SavedNews({
  articles, setArticles, savedArticles, setSavedArticles,
}) {
  return (
    <main className="content">
      <SavedNewsHeader savedArticles={savedArticles}/>
      <SearchResult articles={articles} setArticles={setArticles} savedArticles={savedArticles} setSavedArticles={setSavedArticles}/>
    </main>
  );
}

export default SavedNews;
