import React from 'react';
import { rateNumber } from '../../../utils/app';
import { Film } from '../../../types/film';

type DetailsProps = {
  film: Film;
}

const Details = ({ film }: DetailsProps) => (
  <>
    <div className="film-rating">
      <div className="film-rating__score">{film.rating}</div>
      <p className="film-rating__meta">
        <span className="film-rating__level">{rateNumber(film.rating)}</span>
        <span className="film-rating__count">{film.scoresCount} ratings</span>
      </p>
    </div>

    <div className="film-card__text">
      <p>
        {film.description}
      </p>
      <p className="film-card__director">
        <strong>
          Director: {film.director}
        </strong>
      </p>
      <p className="film-card__starring">
        <strong>
          Starring: {film.starring.join(', ')}
        </strong>
      </p>
    </div>
  </>
);

export default Details;
