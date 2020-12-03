import './BurgerPopup.css';

import React from 'react';
import { Link } from 'react-router-dom';
import close from '../../images/close.svg';

function BurgerPopup({
  isOpen, onRegister, onCloseBurger, loggedIn, logOut,
}) {
  function handleClickLoggedButton() {
    onCloseBurger();
    onRegister();
  }

  function logOutBurger() {
    onCloseBurger();
    logOut();
  }

  return (
    <div className={`burger-popup ${isOpen ? 'burger-popup_opened' : ''}`}>
      <div className={`burger-popup__container ${isOpen ? 'burger-popup__container_opened' : ''}`}>
        <header className="burger-popup__header">
          <h2 className="burger-popup__logo">NewsExplorer</h2>
          <img className="burger-popup__close-button" src={close} onClick={onCloseBurger} alt="здесь должна быть кнопка закрытия модального окна :)" />
        </header>
        <div className="burger-popup__navbar">
          <Link className="burger-popup__link" to="/main" onClick={onCloseBurger}>Главная</Link>
          {
            loggedIn ? <Link className="burger-popup__link" to="/saved-news" onClick={onCloseBurger}>Сохраненные статьи</Link>
              : ''
          }
          {
            loggedIn ? <button className="burger-popup__link__logged-in-button" onClick={logOutBurger}>Выйти</button>
              : <button className="burger-popup__link__logged-in-button" onClick={handleClickLoggedButton}>Авторизоваться</button>
          }
        </div>
      </div>
    </div>
  );
}

export default BurgerPopup;
