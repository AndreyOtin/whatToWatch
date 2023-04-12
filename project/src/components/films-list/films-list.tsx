import React from 'react';
import { Film } from '../../types/film';
import { DEFAULT_GENRE } from '../../consts/app';

type FilmsListProps = {
  films: Film [];
}

const FilmsList = ({ films}: FilmsListProps) => {

  return (
    <div className="catalog__films-list">
      {films.map((film) => (
        <article key={film.id} className="small-film-card catalog__films-card">
          <div className="small-film-card__image">
            <img
              src={film.previewImage}
              alt={film.name} width="280" height="175"
            />
          </div>
          <h3 className="small-film-card__title">
            <a className="small-film-card__link" href="film-page.html">Fantastic Beasts: The Crimes of Grindelwald</a>
          </h3>
        </article>))}
    </div>
  );
};

export default FilmsList;
