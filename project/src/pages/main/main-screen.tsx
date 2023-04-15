import React, { useMemo, useState } from 'react';
import FilmsList from '../../components/films-list/films-list';
import FilmCardContainer from '../../components/film-card-container/film-card-container';
import { useInitMainScreenQuery } from '../../api/api';
import Spinner from '../../components/spinner/spinner';
import GenreList from '../../components/genre-list/genre-list';
import { DEFAULT_GENRE } from '../../consts/app';
import { MaxElementCount } from '../../consts/enum';
import Footer from '../../components/footer/footer';
import Header from '../../components/header/header';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const MainScreen = () => {
  const query = useInitMainScreenQuery();
  const [activeGenre, setActiveGenre] = useState<string>(DEFAULT_GENRE);
  const [cardCount, setCardCount] = useState(MaxElementCount.FilmCard);

  const filteredFilms = useMemo(() => {
    if (!query.data) {
      return [];
    }

    return activeGenre === DEFAULT_GENRE
      ? query.data.films
      : query.data.films.filter((film) => film.genre === activeGenre);
  }, [activeGenre, query.data]);

  if (query.isError) {
    return <NotFoundScreen/>;
  }

  if (query.isLoading || !query.data) {
    return <Spinner isActive/>;
  }

  const isShowMoreVisible = cardCount < filteredFilms.length;

  return (
    <>
      <FilmCardContainer film={query.data.promoFilm}>
        <Header className="film-card__head"/>
      </FilmCardContainer>
      <div
        style={{ minHeight: '61.5vh' }}
        className="page-content"
      >
        <section
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
          className="catalog"
        >
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={query.data.films} onGenreClick={setActiveGenre} activeGenre={activeGenre}/>
          <FilmsList films={filteredFilms?.slice(0, Math.min(cardCount, filteredFilms.length))}/>

          {isShowMoreVisible &&
            <div className="catalog__more">
              <button
                onClick={() => setCardCount((count) => count + MaxElementCount.FilmCard)}
                className="catalog__button"
                type="button"
              >
                Show more
              </button>
            </div>}

        </section>
        <Footer/>
      </div>
    </>
  );
};

export default MainScreen;
