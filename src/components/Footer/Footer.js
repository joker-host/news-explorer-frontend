import './Footer.css';

import React from 'react';
import { Link } from 'react-router-dom';
import git from '../../images/git.svg';
import facebook from '../../images/facebook.svg';

function Footer() {
  return (
    <footer className="footer">
      <p className="footer__description">&copy; 2020 Supersite, Powered by News API</p>
      <div className="footer__container">
        <Link className="footer__link footer__link_text" to="/main">Главная</Link>
        <a className="footer__link footer__link_text" href="https://praktikum.yandex.ru" target="_blank" rel="noreferrer">Яндекс.Практикум</a>
        <a className="footer__link" href="https://github.com/" target="_blank" rel="noreferrer">
          <img className="footer__link-image" src={git} alt="здесь должна быть кнопка гита :)"></img>
        </a>
        <a className="footer__link footer__link_indent" href="https://www.facebook.com/" target="_blank" rel="noreferrer">
          <img className="footer__link-image" src={facebook} alt="здесь должна быть кнопка фейсбука :)"></img>
        </a>
      </div>
    </footer>
  );
}

export default Footer;
