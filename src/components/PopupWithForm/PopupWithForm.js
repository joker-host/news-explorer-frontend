import './PopupWithForm.css';

import React from 'react';

function PopupWithForm({
  name, title, isOpen, onClose, children, loginOrRegister,
}) {
  return (
    <div className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <h2 className="popup__title">{title}</h2>
        {children}
        <button type="button" className={`popup__close-icon popup__close-icon_${name}`} onClick={onClose}/>
        {loginOrRegister}
      </div>
    </div>
  );
}

export default PopupWithForm;
