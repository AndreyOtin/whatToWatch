import React from 'react';
import { Film } from '../../types/film';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';

type FilmsListProps = {
  films: Film [];
}

const FilmsList = ({ films }: FilmsListProps) => (
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
          <Link
            className="small-film-card__link"
            to={generatePath(AppRoute.Film, { film: film.id.toString() })}
          >
            Fantastic Beasts: The Crimes of Grindelwald
          </Link>
        </h3>
      </article>))}
  </div>
);

export default FilmsList;
