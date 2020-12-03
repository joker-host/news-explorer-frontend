import './RegisterPopup.css';

import React from 'react';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import { mainApi } from '../../utils/MainApi.js';

function RegisterPopup({
  isOpen,
  onClose,
  onToggle,
  setIsToolipPopupOpen,
  setRegisterMessage,
  emailDirty,
  emailError,
  passwordDirty,
  passwordError,
  nameDirty,
  nameError,
  emailHandler,
  passwordHandler,
  nameHandler,
  blurHandler,
  name,
  email,
  password,
  registerFormValid,
}) {
  const handleSubmit = (evt) => {
    evt.preventDefault();
    mainApi
      .register(email, password, name)
      .then((res) => {
        if (res.success) {
          onClose();
        } else {
          console.log(res);
        }
        setRegisterMessage(res);
        setIsToolipPopupOpen(true);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <PopupWithForm
      name='register'
      title='Регистрация'
      isOpen={isOpen}
      onClose={onClose}
      loginOrRegister={
        <button type='button' className="popup__link">или&nbsp;
          <span className="popup__another-popup" onClick={onToggle}>
            Войти
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
              required
              autoComplete='off'
              placeholder='Введите пароль'
              minLength={5}
              maxLength={50}
              value={password}
              onChange={(e) => passwordHandler(e)}
              onBlur={(e) => blurHandler(e)}
            />
            {(passwordError && passwordDirty) && <span id='email-input-error' className='popup__input-error'>{passwordError}</span>}
          </label>

          <label className="popup__input-label">
            <p className="popup__label-text">Имя</p>
            <input
              type='text'
              name='name'
              className='popup__form-input'
              required
              autoComplete='off'
              placeholder='Введите своё имя'
              minLength={2}
              maxLength={30}
              value={name}
              onChange={(e) => nameHandler(e)}
              onBlur={(e) => blurHandler(e)}
            />
            {(nameError && nameDirty) && <span id='email-input-error' className='popup__input-error'>{nameError}</span>}
          </label>
        </div>
        <button type="submit" className={'popup__save-button popup__save-button_register'} disabled={!registerFormValid}>Зарегистрироваться</button>
      </form>
    </PopupWithForm>
  );
}

export default RegisterPopup;
