import React from 'react';
import { Film } from '../../types/film';
import { useSelector } from 'react-redux';
import { selectCheckAuthQuery } from '../../store/selectors';
import MyListButton from '../my-list-button/my-list-button';
import { generatePath, Link, useNavigate } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';

type FilmCardProps = {
  film: Film;
  full?: boolean;
}

const FilmCard = ({ film, full = false }: FilmCardProps) => {
  const { posterImage, name, genre, released } = film;
  const authQuery = useSelector(selectCheckAuthQuery);
  const navigate = useNavigate();

  return (
    <div className="film-card__wrap">
      <div className="film-card__info">
        {full ||
          <div className="film-card__poster">
            <img src={posterImage}
              alt={name}
              width="218"
              height="327"
            />
          </div>}

        <div className="film-card__desc">
          <h2 className="film-card__title">{name}</h2>
          <p className="film-card__meta">
            <span className="film-card__genre">{genre}</span>
            <span className="film-card__year">{released}</span>
          </p>

          <div className="film-card__buttons">
            <button
              onClick={() => navigate(generatePath(AppRoute.Player, { id: film.id.toString() }))}
              className="btn btn--play film-card__button"
              type="button"
            >
              <svg viewBox="0 0 19 19" width="19" height="19">
                <use xlinkHref="#play-s"></use>
              </svg>
              <span>Play</span>
            </button>
            {authQuery.isError || <MyListButton id={film.id} isFavorite={film.isFavorite}/>}
            {full &&
              <Link
                to={`../${generatePath(AppRoute.Review, { id: film.id.toString() })}`}
                className="btn film-card__button"
              >
                Add review
              </Link>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilmCard;
