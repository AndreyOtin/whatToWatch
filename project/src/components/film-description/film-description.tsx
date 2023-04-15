import React, { MouseEvent, useState } from 'react';
import { Film } from '../../types/film';
import Details from './details/details';
import clsx from 'clsx';
import Overview from './overview/overview';
import Reviews from './reviews/reviews';
import { AppRoute, NavItem } from '../../consts/enum';

type FilmDescriptionProps = {
  film: Film;
}

const FilmDescription = ({ film }: FilmDescriptionProps) => {
  const [activeNav, setActiveNav] = useState(NavItem.Details);

  const handleNavClick = (evt: MouseEvent<HTMLLIElement, globalThis.MouseEvent>, item: NavItem) => {
    evt.preventDefault();
    setActiveNav(item);
  };

  return (
    <div className="film-card__desc">
      <nav className="film-nav film-card__nav">
        <ul className="film-nav__list">
          {Object.values(NavItem).map((item) => (
            <li
              key={item}
              onClick={(evt) => handleNavClick(evt, item)}
              className={clsx('film-nav__item', { 'film-nav__item--active': activeNav === item })}
            >
              <a href={AppRoute.Root} className="film-nav__link">{item}</a>
            </li>
          ))}
        </ul>
      </nav>
      {activeNav === NavItem.Details && <Details film={film}/>}
      {activeNav === NavItem.Overview && <Overview film={film}/>}
      {activeNav === NavItem.Reviews && <Reviews id={film.id}/>}
    </div>
  );
};

export default FilmDescription;
