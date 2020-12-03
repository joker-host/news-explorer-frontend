import './LoginPopup.css';

import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { mainApi } from '../../utils/MainApi.js';

function LoginPopup({
  isOpen,
  onClose,
  onToggle,
  handleLogin,
  emailDirty,
  emailError,
  passwordDirty,
  passwordError,
  emailHandler,
  passwordHandler,
  blurHandler,
  email,
  password,
  loginFormValid,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    mainApi
      .authorize(email, password)
      .then((data) => {
        if (data.token) {
          handleLogin();
          onClose();
        } else if (data.message) {
          console.log(data.message);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PopupWithForm
      name='login'
      title='Вход'
      isOpen={isOpen}
      onClose={onClose}
      loginOrRegister={
        <button type='button' className="popup__link">или&nbsp;
          <span className="popup__another-popup" onClick={onToggle}>
            Зарегистрироваться
          </span>
        </button>
      }
    >
      <form action="#" method="POST" name="form" className={`popup__form popup__form_${name}`} onSubmit={handleSubmit} noValidate>
        <div className="popup__input-container">
          <label className="popup__input-label">
            <p className="popup__label-text">Email</p>
            <input
              type='text'
              name='email'
              className='popup__form-input'
              required
              autoComplete='off'
              placeholder='Введите почту'
              value={email}
              onChange={(e) => emailHandler(e)}
              onBlur={(e) => blurHandler(e)}
            />
            {(emailError && emailDirty) && <span id='email-input-error' className='popup__input-error'>{emailError}</span>}
          </label>

          <label className="popup__input-label">
            <p className="popup__label-text">Пароль</p>
            <input
              type='password'
              name='password'
              className='popup__form-input'
              autoComplete='off'
              id='password-input'
              placeholder='Введите пароль'
              value={password}
              onChange={(e) => passwordHandler(e)}
              onBlur={(e) => blurHandler(e)}
            />
            {(passwordError && passwordDirty) && <span id='email-input-error' className='popup__input-error'>{passwordError}</span>}
          </label>
        </div>
        <button type="submit" className={'popup__save-button popup__save-button_login'} disabled={!loginFormValid}>Войти</button>
      </form>

    </PopupWithForm>
  );
}

export default LoginPopup;
