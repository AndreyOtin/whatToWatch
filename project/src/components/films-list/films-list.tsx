import React from 'react';
import { Film } from '../../types/film';
import FilmListCard from './film-list-card/film-list-card';

type FilmsListProps = {
  films: Film [];
}

const FilmsList = ({ films }: FilmsListProps) => (
  <div className="catalog__films-list">
    {films.map((film) => (
      <FilmListCard key={film.id} film={film}/>
    ))}
  </div>
);

export default FilmsList;
