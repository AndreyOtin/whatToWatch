import React from 'react';
import FilmCard from '../film-card/film-card';
import { Film } from '../../types/film';
import clsx from 'clsx';
import FilmDescription from '../film-description/film-description';

type FilmCardProps = {
  film: Film;
  children: JSX.Element;
  full?: boolean;
}

const FilmCardContainer = ({ film, children, full = false }: FilmCardProps) => {
  if (!film) {
    return null;
  }

  return (
    <section className={clsx('film-card', { 'film-card--full': full })}>
      <div className={clsx({ 'film-card__hero': full })}>
        <div className="film-card__bg">
          <img src={film.backgroundImage} alt={film.name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>

        {children}

        <FilmCard film={film} full={full}/>
      </div>

      {full &&
        <div className="film-card__wrap film-card__translate-top">
          <div className="film-card__info">
            <div className="film-card__poster film-card__poster--big">
              <img
                src={film.posterImage}
                alt={film.name}
                width="218"
                height="327"
              />
            </div>
            <FilmDescription film={film}/>
          </div>
        </div>}
    </section>
  );
};

export default React.memo(FilmCardContainer);
