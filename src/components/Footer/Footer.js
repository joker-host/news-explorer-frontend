import './Footer.css';

import React from 'react';
import { Link } from 'react-router-dom';
import git from '../../images/git.svg';
import vk from '../../images/vk-icon.svg';

function Footer() {

  function scrollUp() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <footer className="footer">
      <p className="footer__description">&copy; 2020 Supersite, Powered by News API</p>
      <div className="footer__container">
        <Link className="footer__link footer__link_text" to="/main" onClick={scrollUp}>Главная</Link>
        <a className="footer__link footer__link_text" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
        <a className="footer__link" href="https://github.com/joker-host" target="_blank" rel="noreferrer">
          <img className="footer__link-image" src={git} alt="здесь должна быть кнопка гита :)"></img>
        </a>
        <a className="footer__link footer__link_indent" href="https://vk.com/andrey137900" target="_blank" rel="noreferrer">
          <img className="footer__link-image" src={vk} alt="здесь должна быть кнопка фейсбука :)"></img>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
