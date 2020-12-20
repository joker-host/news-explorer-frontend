import './SearchForm.css';

import React from 'react';

function SearchForm({ setKeyWord, onSubmitSearchForm }) {
  const keyWord = localStorage.getItem('Key word'); // Ключевое слово в локальном хранилище

  function handleChangeKeyWord(e) { // Меняем запись ключевого слова поиска при изменении значения в инпуте
    setKeyWord(e.target.value);
    localStorage.setItem('Key word', e.target.value);
  }

  return (
    <form className="search__form" onSubmit={onSubmitSearchForm}>
      <input className="search__form-input" placeholder="Введите тему новости" value={keyWord || ''} required onChange={handleChangeKeyWord} />
      <button type="submit" className="search__form-button">Искать</button>
    </form>
  );
}

export default SearchForm;
