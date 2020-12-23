import './App.css';

import React, { useState, useEffect } from 'react';
import {
  Route, Switch, Redirect, useHistory,
} from 'react-router-dom';
import validator from 'validator';
import Header from '../Header/Header';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNews from '../SavedNews/SavedNews';
import RegisterPopup from '../RegisterPopup/RegisterPopup';
import LoginPopup from '../LoginPopup/LoginPopup';
import BurgerPopup from '../BurgerPopup/BurgerPopup';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import { newsApi } from '../../utils/NewsApi';
import { mainApi } from '../../utils/MainApi';
import { UserContext } from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(localStorage.isLoggedIn);
  // Стейт, содержащий статус пользователя (зашел в аккаунт или вышел)

  const [isLoading, setIsLoading] = useState(false);
  // отобразить/убрать загрузку

  const handleLogin = () => {
    // Устанавливает статус пользователя "зашел в аккаунт"
    setLoggedIn(localStorage.isLoggedIn = true);
  };

  const history = useHistory();
  const [currentUser, setCurrentUser] = useState({
    // Хук, содержащий информцию о пользователе
    name: '',
    _id: '',
  });
  function tokenCheck() {
    // Проверяет валидность токена
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      mainApi
        .getContent(jwt)
        .then((res) => {
          if (res._id && res.email && res.name) {
            setCurrentUser({ name: res.name, _id: res._id });
            setLoggedIn(localStorage.isLoggedIn = true);
          } else {
            localStorage.removeItem('jwt');
            setLoggedIn(localStorage.isLoggedIn = false);
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoggedIn(localStorage.isLoggedIn = false);
    }
  }

  const [savedArticles, setSavedArticles] = useState([]);
  // Стейт с сохраненными статьями

  function logOut() {
    // Функция выхода из аккаунта
    localStorage.removeItem('jwt');
    localStorage.removeItem('articles');
    setLoggedIn(localStorage.isLoggedIn = false);
    setSavedArticles([]);
  }

  function loadSavedArticles() {
    // Запрос на получение сохраненных статей
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
    // Запрос на получение сохраненных статей срабатывает при изменении статуса LogIn/LogOff
    loadSavedArticles();
  }, [loggedIn, history]);

  const [keyWord, setKeyWord] = useState('');
  // Стейт с ключевыми словами для статей

  const [articles, setArticles] = useState({ articlesArr: [], showSection: false });
  // Статьи, полученные при запросе от NewsApi

  useEffect(() => {
    // проверяю есть ли в локальном хранилище ключ articles,
    // если есть, то забираю его в стейт articles
    if (localStorage.getItem('articles')) {
      setArticles(JSON.parse(localStorage.getItem('articles')));
    }
  }, []);

  const [showNoResults, setShowNoResults] = useState(false);

  function getStartArticles() {
    setIsLoading(true);
    newsApi
      .getTopArticles()
      .then((res) => {
        if (res.totalResults === 0) {
          setShowNoResults(true);
        } else {
          setShowNoResults(false);
        }
        setArticles({ articlesArr: [], showSection: false });
        localStorage.removeItem('articles');
        setIsLoading(false);
        setArticles({ articlesArr: res.articles, itemToShow: 3, showSection: true });
        localStorage.setItem('articles', JSON.stringify({ articlesArr: res.articles, itemToShow: articles.itemToShow, showSection: articles.showSection }));
      });
  }

  useEffect(() => {
    if (!(localStorage.getItem('articles'))) {
      getStartArticles();
    }
  }, []);

  function onSubmitSearchForm(e) {
    setIsLoading(true);
    e.preventDefault();
    newsApi
      .getArticles(keyWord)
      .then((res) => {
        if (res.totalResults === 0) {
          setShowNoResults(true);
        } else {
          setShowNoResults(false);
        }
        setArticles({ articlesArr: [], showSection: false });
        localStorage.removeItem('articles');
        localStorage.setItem('keyWordForSave', keyWord.charAt(0).toUpperCase() + keyWord.slice(1));
        setIsLoading(false);
        setArticles({ articlesArr: res.articles, itemToShow: 3, showSection: true });
        localStorage.setItem('articles', JSON.stringify({ articlesArr: res.articles, itemToShow: articles.itemToShow, showSection: articles.showSection }));
      });
  }

  useEffect(() => {
    // Функция проверки токена срабатывает изменении статуса LogIn/LogOff
    tokenCheck();
  }, [loggedIn, history]);

  /// //////////////////////////////////////Валидация
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

  const [wrongPassword, setWrongPassword] = useState('');

  function resetError() {
    setEmailDirty(false);
    setPasswordDirty(false);
    setNameDirty(false);
    SetRegisterFormValid(false);
    SetLoginFormValid(false);
    setEmail('');
    setPassword('');
    setName('');
    setWrongPassword('');
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

  /// //////////////////////////////////////Валидация

  // function closeOverlay(evt) {
  // Закрытие попапов при нажатии на область вокруг попапа
  //   if (evt.target.classList.contains('popup_opened')) {
  //     closeAllPopups();
  //   }
  // }
  // document.addEventListener('click', closeOverlay);

  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [isLoginPopupOpen, setIsLoginPopupOpen] = useState(false);
  const [isBurgerPopupOpen, setIsBurgerPopupOpen] = useState(false);

  function closeAllPopups() {
    // Закрывает все попапы
    resetError();
    setIsRegisterPopupOpen(false);
    setIsLoginPopupOpen(false);
    setIsBurgerPopupOpen(false);
    // document.removeEventListener('keydown', closeOnEscape);
    // document.removeEventListener('click', closeOverlay);
  }

  function closeOnEscape(evt) {
    // Закрытие попапов при нажатии Escape
    if (evt.key === 'Escape') {
      closeAllPopups();
    }
  }

  document.addEventListener('keydown', closeOnEscape);

  function handleRegisterPopup() {
    // Открывает попап регистрации
    resetError();
    setIsRegisterPopupOpen(true);
  }

  function handleLoginPopup() {
    // Открывает попап логина
    resetError();
    setIsLoginPopupOpen(true);
  }

  function toggleLoginPopup() {
    // Закрывает попап логина и открывает попап регистрации
    resetError();
    closeAllPopups();
    handleRegisterPopup();
  }

  function toggleRegisterPopup() {
    // Закрывает попап регистрации и открывает попап логина
    resetError();
    closeAllPopups();
    handleLoginPopup();
  }

  function handleBurgerPopup() {
    // Открывает меню на мобильных устройствах
    setIsBurgerPopupOpen(true);
  }

  const [registerMessage, setRegisterMessage] = useState({
    // Стейт содержит сообщение от Api при регистрации
    message: '',
    validation: {
      body: {
        message: '',
      },
    },
  });

  const [isToolipPopupOpen, setIsToolipPopupOpen] = useState(false);
  function handleToolipPopup() {
    // Закрывает информационное окно
    setIsToolipPopupOpen(false);
  }

  function toggleToolipPopup() {
    // Закрывает попап регистрации и открывает попап логина
    resetError();
    handleToolipPopup();
    setIsLoginPopupOpen(true);
    setIsRegisterPopupOpen(false);
  }

  return (
    <UserContext.Provider value={currentUser}>
      <div className="body">
        <Switch>
          <Route path="/main">
            <Header
              onRegister={handleLoginPopup}
              onBurgerMenu={handleBurgerPopup}
              loggedIn={loggedIn}
              logOut={logOut}
            />
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
              showNoResults={showNoResults}
            />
            <Footer />
          </Route>
          <Route path="/saved-news">
            <Header
              onRegister={handleLoginPopup}
              onBurgerMenu={handleBurgerPopup}
              loggedIn={loggedIn}
              logOut={logOut}
            />
            <ProtectedRoute
              path="/saved-news"
              loggedIn={loggedIn}
              component={SavedNews}
              articles={articles}
              setArticles={setArticles}
              tokenCheck={tokenCheck}
              savedArticles={savedArticles}
              setSavedArticles={setSavedArticles}
              handleLoginPopup={handleLoginPopup}
            />
            <Footer />
            {
              loggedIn ? '' : <Redirect from="/saved-news" to="/main" />
            }
          </Route>
          <Redirect from="/" to="/main" />
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
          wrongPassword={wrongPassword}
          setWrongPassword={setWrongPassword}
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
