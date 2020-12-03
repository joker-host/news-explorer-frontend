import './About.css';
import React from 'react';
import avatar from '../../images/me.jpg';

// import { Route, Link, useHistory } from 'react-router-dom';

function About() {
  return (
    <section className="about-author">
      <div className="about-author__avatar-wrapper">
        <img className="about-author__avatar" src={avatar} alt="здесь должна быть аватарка создателя сайта :)"></img>
      </div>
      <div className="about-author__description-wrapper">
        <h2 className="about-author__description-header">Об авторе</h2>
        <p className="about-author__description">
                    Это блок с описанием автора проекта.
                    Здесь следует указать, как вас зовут,
                    чем вы занимаетесь,
                    какими технологиями разработки владеете.
        </p>
        <p className="about-author__description">
                    Также можно рассказать о процессе обучения в Практикуме,
                    чему вы тут научились,
                    и чем можете помочь потенциальным заказчикам.
        </p>
        <p className="about-author__description">
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
                    Так же тут будет еще текст.
        </p>
      </div>
    </section>
  );
}

export default About;
