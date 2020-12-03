import './App.css';

import React, { useState, useEffect } from 'react';
import {
  Route, Switch, Redirect, useHistory,
} from 'react-router-dom';
import validator from 'validator';
import Header from '../Header/Header.js';
import Main from '../Main/Main.js';
import Footer from '../Footer/Footer.js';
import SavedNews from '../SavedNews/SavedNews.js';
import RegisterPopup from '../RegisterPopup/RegisterPopup.js';
import LoginPopup from '../LoginPopup/LoginPopup.js';
import BurgerPopup from '../BurgerPopup/BurgerPopup.js';
import InfoTooltip from '../InfoTooltip/InfoTooltip.js';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute.js';
import { newsApi } from '../../utils/NewsApi.js';
import { mainApi } from '../../utils/MainApi.js';
import { UserContext } from '../../contexts/CurrentUserContext.js';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.isLoggedIn);
  const handleLogin = () => {
    setLoggedIn(localStorage.isLoggedIn = true);
  };

  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    // хук, содержащий информцию о пользователе
    name: '',
    _id: '',
  });
  function tokenCheck() {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getContent(jwt)
        .then((res) => {
          if (res) {
            setCurrentUser({ name: res.name, _id: res._id });
            setLoggedIn(localStorage.isLoggedIn = true);
          } else {
            localStorage.removeItem('jwt');
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(localStorage.isLoggedIn = false);
    }
  }

  function logOut() {
    localStorage.removeItem('jwt');
    setLoggedIn(localStorage.isLoggedIn = false);
  }

  const [savedArticles, setSavedArticles] = useState([]);

  function loadSavedArticles() {
    mainApi
      .getInitialArticles()
      .then((res) => {
        setSavedArticles(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    loadSavedArticles();
  }, []);

  const [keyWord, setKeyWord] = useState('');
  const [articles, setArticles] = useState({ articlesArr: [], showSection: false });
  function onSubmitSearchForm(e) {
    setIsLoading(true);
    e.preventDefault();
    newsApi
      .getArticles(keyWord)
      .then((res) => {
        localStorage.setItem('keyWordForSave', keyWord.charAt(0).toUpperCase() + keyWord.slice(1));
        setIsLoading(false);
        setArticles({ articlesArr: res.articles, itemToShow: 3, showSection: true });
        localStorage.setItem('articles', JSON.stringify({ articlesArr: res.articles, itemToShow: articles.itemToShow, showSection: articles.showSection }));
      });
  }

  useEffect(() => {
    tokenCheck();
  }, [loggedIn, history]);

  const [isLoading, setIsLoading] = useState(false);

  function closeOverlay(evt) { // закрытие попапов при нажатии на область вокруг попапа
    if (evt.target.classList.contains('popup_opened')) {
      closeAllPopups();
    }
  }
  document.addEventListener('click', closeOverlay);

  function closeOnEscape(evt) { // закрытие попапов при нажатии Escape
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }
  document.addEventListener('keydown', closeOnEscape);

  function closeAllPopups() { // закрывает все попапы
    resetError();
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsBurgerPopupOpen(false);
    document.removeEventListener('keydown', closeOnEscape);
    document.removeEventListener('click', closeOverlay);
  }

  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  function handleRegisterPopup() { // открывает попап регистрации
    resetError();
    setIsRegisterPopupOpen(true);
  }

  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  function handleLoginPopup() { // открывает попап логина
    resetError();
    setIsLoginPopupOpen(true);
  }

  function toggleLoginPopup() { // закрывает попап логина и открывает попап регистрации
    resetError();
    closeAllPopups();
    handleRegisterPopup();
  }

  function toggleRegisterPopup() { // закрывает попап регистрации и открывает попап логина
    resetError();
    closeAllPopups();
    handleLoginPopup();
  }

  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);
  function handleBurgerPopup() { // открывает меню на мобильных устройствах
    setIsBurgerPopupOpen(true);
  }

  const [registerMessage, setRegisterMessage] = useState({
    message: '',
    validation: {
      body: {
        message: '',
      },
    },
  });

  const [isToolipPopupOpen, setIsToolipPopupOpen] = useState(false);
  function handleToolipPopup() { // закрывает информационное окно
    setIsToolipPopupOpen(false);
  }

  function toggleToolipPopup() { // закрывает попап регистрации и открывает попап логина
    resetError();
    handleToolipPopup();
    setIsLoginPopupOpen(true);
  }

  /// //////////////////////////////////////валидация
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');

  const [emailDirty, setEmailDirty] = useState(false);
  const [emailError, setEmailError] = useState('Поле Email не может быть пустым');
  const [passwordDirty, setPasswordDirty] = useState(false);
  const [passwordError, setPasswordError] = useState('Поле Пароль не может быть пустым');
  const [nameDirty, setNameDirty] = useState(false);
  const [nameError, setNameError] = useState('Поле Имя не может быть пустым');

  const [registerFormValid, SetRegisterFormValid] = useState(false);
  const [loginFormValid, SetLoginFormValid] = useState(false);

  function resetError() {
    setEmailDirty(false);
    setPasswordDirty(false);
    setNameDirty(false);
    SetRegisterFormValid(false);
    SetLoginFormValid(false);
    setEmail('');
    setPassword('');
    setName('');
  }

  useEffect(() => {
    if (emailError || passwordError) {
      SetLoginFormValid(false);
    } else {
      SetLoginFormValid(true);
    }
  }, [emailError, passwordError]);

  useEffect(() => {
    if (emailError || passwordError || nameError) {
      SetRegisterFormValid(false);
    } else {
      SetRegisterFormValid(true);
    }
  }, [emailError, passwordError, nameError]);

  const emailHandler = (e) => {
    setEmail(e.target.value);
    if (!validator.isEmail(e.target.value)) {
      setEmailError('Email должен быть корректным');
      if (!e.target.value) {
        setEmailError('Поле "Email" не может быть пустым');
      }
    } else {
      setEmailError('');
    }
  };

  const passwordHandler = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 5) {
      setPasswordError('Пароль не может быть кароче 5-ти символов');
      if (!e.target.value) {
        setPasswordError('Поле "Пароль" не может быть пустым');
      }
    } else {
      setPasswordError('');
    }
  };

  const nameHandler = (e) => {
    setName(e.target.value);
    if (!validator.isAlpha(e.target.value, 'ru-RU')) {
      setNameError('Имя должно содержать только буквы русского алфавита');
      if (!e.target.value) {
        setNameError('Поле "Имя" не может быть пустым');
      }
    } else {
      setNameError('');
    }
  };

  const blurHandler = (e) => {
    switch (e.target.name) {
    case 'email': setEmailDirty(true);
      break;
    case 'password': setPasswordDirty(true);
      break;
    case 'name': setNameDirty(true);
      break;
    }
  };

  /// //////////////////////////////////////валидация

  return (
    <UserContext.Provider value={currentUser}>
      <div className="body">
        <Switch>
          <Route path="/main">
            <Header onRegister={handleLoginPopup} onBurgerMenu={handleBurgerPopup} loggedIn={loggedIn} logOut={logOut}/>
            <Main
              setKeyWord={setKeyWord}
              keyWord={keyWord}
              onSubmitSearchForm={onSubmitSearchForm}
              isLoading={isLoading}
              articles={articles}
              setArticles={setArticles}
              loggedIn={loggedIn}
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
            />
            <Footer />
          </Route>
          <Route path="/saved-news">
            <Header onRegister={handleLoginPopup} onBurgerMenu={handleBurgerPopup} loggedIn={loggedIn} logOut={logOut}/>
            <ProtectedRoute
              path='/saved-news'
              loggedIn={loggedIn}
              component={SavedNews}
              articles={articles}
              setArticles={setArticles}
              tokenCheck={tokenCheck}
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
            />
            <Footer />
            {
              loggedIn ? '' : <Redirect from='/saved-news' to='/main' />
            }
          </Route>
          <Redirect from='/' to='/main' />
        </Switch>
        <RegisterPopup
          isOpen={isRegisterPopupOpen}
          onClose={closeAllPopups}
          onToggle={toggleRegisterPopup}
          setIsToolipPopupOpen={setIsToolipPopupOpen}
          setRegisterMessage={setRegisterMessage}
          emailDirty={emailDirty}
          emailError={emailError}
          passwordDirty={passwordDirty}
          passwordError={passwordError}
          nameDirty={nameDirty}
          nameError={nameError}
          emailHandler={emailHandler}
          passwordHandler={passwordHandler}
          nameHandler={nameHandler}
          blurHandler={blurHandler}
          email={email}
          password={password}
          name={name}
          registerFormValid={registerFormValid}
        />
        <LoginPopup
          onEscape={closeAllPopups}
          isOpen={isLoginPopupOpen}
          onClose={closeAllPopups}
          onToggle={toggleLoginPopup}
          handleLogin={handleLogin}
          emailDirty={emailDirty}
          emailError={emailError}
          passwordDirty={passwordDirty}
          passwordError={passwordError}
          emailHandler={emailHandler}
          passwordHandler={passwordHandler}
          blurHandler={blurHandler}
          email={email}
          password={password}
          loginFormValid={loginFormValid}
        />
        <BurgerPopup
          loggedIn={loggedIn}
          isOpen={isBurgerPopupOpen}
          onRegister={handleLoginPopup}
          onCloseBurger={closeAllPopups}
          logOut={logOut}
        />
        <InfoTooltip
          isOpen={isToolipPopupOpen}
          onClose={handleToolipPopup}
          onToggle={toggleToolipPopup}
          resultMessage={registerMessage}
        />
      </div>
    </UserContext.Provider>
  );
}

export default App;
