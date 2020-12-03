import './InfoTooltip.css';

import React from 'react';

const InfoTooltip = ({
  isOpen, onClose, onToggle, resultMessage,
}) => (
  <div className={`popup popup_type_tooltip ${isOpen ? 'popup_opened' : ''}`}>
    <div className='popup__container'>
      <h2 className='popup__title'>{resultMessage.message === 'celebrate request validation failed' ? resultMessage.validation.body.message : resultMessage.message}</h2>
      <button className="popup__tooltip-button" onClick={onToggle}>Войти</button>
      <button
        type='button'
        className="popup__close-icon"
        onClick={onClose}
      />
    </div>
  </div>
);

export default InfoTooltip;
