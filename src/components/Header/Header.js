import './Header.css';

import React from 'react';
import { Route, Switch, Link } from 'react-router-dom';
import logout from '../../images/logout.svg';
import logout_white from '../../images/logout-white.svg';
import menu_white from '../../images/menu_white.svg';
import menu_black from '../../images/menu_black.svg';
import { UserContext } from '../../contexts/CurrentUserContext.js';

function Header({
  onRegister, onBurgerMenu, loggedIn, logOut,
}) {
  const currentUser = React.useContext(UserContext);
  const currentUserName = currentUser.name;

  return (
    <Switch>
      <Route path="/main">
        <header className="header">
          <Link className="header__logo" to="/main">
            <h1 className="header__title">NewsExplorer</h1>
          </Link>
          <div className="header__nav-bar">
            <img className="header__menu" src={menu_white} onClick={onBurgerMenu} alt="здесь должна быть кнопка открытия меню"></img>
            <Link className="header__link header__link_current-page" to="/main">
              <div className="header__underline"></div>
              Главная
            </Link>
            {loggedIn ? <Link className="header__link" to="/saved-news">Сохраненные статьи</Link> : ''}
            {loggedIn
              ? <button type='button' className="header__logged-out-button_white" onClick={logOut}>
                {currentUserName.charAt(0).toUpperCase() + currentUserName.slice(1)}
                <img className="header__logged-out-image" src={logout_white} alt="здесь должна быть иконка выхода из аккаунта"></img>
              </button>
              : <button type='button' className="header__logged-in-button" onClick={onRegister}>Авторизоваться</button>
            }
          </div>
        </header>
      </Route>
      <Route path="/saved-news">
        <header className="header-white">
          <Link className="header__logo" to="/main">
            <h1 className="header__title">NewsExplorer</h1>
          </Link>
          <div className="header__nav-bar">
            <img className="header__menu" src={menu_black} onClick={onBurgerMenu} alt="здесь должна быть кнопка открытия меню"></img>
            <Link className="header__link" to="/main">Главная</Link>
            <Link className="header__link header__link_current-page" to="/saved-news">
              <div className="header-white__underline"></div>
              Сохраненные статьи
            </Link>
            <button type='button' className="header__logged-out-button" onClick={logOut}>
              {currentUserName.charAt(0).toUpperCase() + currentUserName.slice(1)}
              <img className="header__logged-out-image" src={logout} alt="здесь должна быть иконка выхода из аккаунта"></img>
            </button>
          </div>
        </header>
      </Route>
    </Switch>
  );
}

export default Header;
