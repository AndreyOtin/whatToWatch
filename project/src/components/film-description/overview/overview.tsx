import React from 'react';
import { Film } from '../../../types/film';
import dayjs from 'dayjs';
import duration from 'dayjs/plugin/duration';

dayjs.extend(duration);

type OverviewProps = {
  film: Film;
}

const Overview = ({ film }: OverviewProps) => (
  <div className="film-card__text film-card__row">
    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Director</strong>
        <span className="film-card__details-value">{film.director}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Starring</strong>
        <span
          className="film-card__details-value"
        >
          {film.starring.map((star) => <React.Fragment key={star}>{` ${star}, `} <br/></React.Fragment>)}
        </span>
      </p>
    </div>

    <div className="film-card__text-col">
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Run Time</strong>
        <span className="film-card__details-value">{dayjs.duration(film.runTime, 'minutes').format('H[h] mm[m]')}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Genre</strong>
        <span className="film-card__details-value">{film.genre}</span>
      </p>
      <p className="film-card__details-item">
        <strong className="film-card__details-name">Released</strong>
        <span className="film-card__details-value">{film.released}</span>
      </p>
    </div>
  </div>
);

export default Overview;
