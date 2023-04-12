import React from 'react';
import Header from '../header/header';
import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';

type FilmCardProps = {
  promoFilm: Film;
  authStatus: boolean;
}

const FilmCardContainer = ({ promoFilm, authStatus }: FilmCardProps) => {
  if (!promoFilm) {
    return null;
  }

  return (
    <section className="film-card">
      <div className="film-card__bg">
        <img src={promoFilm.backgroundImage} alt="The Grand Budapest Hotel"/>
      </div>
      <h1 className="visually-hidden">WTW</h1>
      <Header className="film-card__head" isUserAuthed={authStatus}/>
      <FilmCard film={promoFilm} authStatus={authStatus}/>
    </section>
  );
};

export default React.memo(FilmCardContainer);
