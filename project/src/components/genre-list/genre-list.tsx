import React, { MouseEvent, useState } from 'react';
import classNames from 'clsx';
import { Film } from '../../types/film';
import { DEFAULT_GENRE } from '../../consts/app';

type GenreListProps = {
  films: Film[];
  onGenreClick: (genre: string) => void;
  activeGenre: string;
}

const GenreList = ({ films, onGenreClick, activeGenre }: GenreListProps) => {
  const genres = films.reduce((set, film) => set.add(film.genre), new Set<string>([DEFAULT_GENRE]));

  const handleGenreClick = (evt: MouseEvent<HTMLLIElement>, genre: string) => {
    evt.preventDefault();
    onGenreClick(genre);
  };

  return (
    <ul className="catalog__genres-list">
      {Array.from(genres).map((genre) => (
        <li
          onClick={(evt) => handleGenreClick(evt, genre)}
          key={genre}
          className={classNames(
            'catalog__genres-item',
            { 'catalog__genres-item--active': genre === activeGenre }
          )}
        >
          < a href={genre.toLowerCase()} className="catalog__genres-link">{genre}</a>
        </li>
      ))}
    </ul>
  );
};

export default GenreList;
