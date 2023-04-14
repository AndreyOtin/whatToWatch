import React, { useRef } from 'react';
import { generatePath, Link } from 'react-router-dom';
import { AppRoute } from '../../../consts/enum';
import { Film } from '../../../types/film';
import { TimeoutId } from '@reduxjs/toolkit/dist/query/core/buildMiddleware/types';
import useVideo from '../../../hooks/use-video';

type FilmListCardProps = {
  film: Film;
}

const VIDEO_PLAY_DELAY = 1000;

const FilmListCard = ({ film }: FilmListCardProps) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const timer = useRef<TimeoutId>();
  const { play, stop } = useVideo(videoRef);

  const handleMouseLeave = () => {
    if (!timer.current) {
      return;
    }

    clearTimeout(timer.current);
    stop();
  };

  const handleMouseEnter = () => {
    timer.current = setTimeout(() => {
      void play();
    }, VIDEO_PLAY_DELAY);
  };

  return (
    <article
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      key={film.id}
      className="small-film-card catalog__films-card"
    >
      <div className="small-film-card__image">
        <video
          title={film.name}
          ref={videoRef}
          height="175"
          width="280"
          preload="metadata"
          muted
          poster={film.previewImage}
          src={film.previewVideoLink}
        />
      </div>
      <h3 className="small-film-card__title">
        <Link
          className="small-film-card__link"
          to={generatePath(AppRoute.Film, { film: film.id.toString() })}
        >
          {film.name}
        </Link>
      </h3>
    </article>
  );
};

export default FilmListCard;
