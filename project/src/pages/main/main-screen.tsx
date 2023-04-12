import { useState } from 'react';
import FilmsList from '../../components/films-list/films-list';
import FilmCardContainer from '../../components/film-card-container/film-card-container';
import { useCheckAuthQuery, useInitMainScreenQuery } from '../../api/api';
import Spinner from '../../components/spinner/spinner';
import { getCheckAuthQuery } from '../../store/selectors';
import { useSelector } from 'react-redux';
import GenreList from '../../components/genre-list/genre-list';
import { DEFAULT_GENRE } from '../../consts/app';
import { MaxElementCount } from '../../consts/enum';
import Footer from '../../components/footer/footer';

const MainScreen = () => {
  const query = useInitMainScreenQuery();
  const auth = useSelector(getCheckAuthQuery);
  const [activeGenre, setActiveGenre] = useState<string>(DEFAULT_GENRE);
  const [cardCount, setCardCount] = useState(Math.min(MaxElementCount.FilmCard));

  if (query.isError) {
    return <h1>Error</h1>;
  }

  if (query.isLoading || auth.isLoading || !query.data) {
    return <Spinner isActive/>;
  }

  const filteredFilm = activeGenre === DEFAULT_GENRE
    ? query.data.films
    : query.data.films.filter((film) => film.genre === activeGenre);

  const isShowMoreVisible = cardCount < filteredFilm.length;

  return (
    <>
      <FilmCardContainer authStatus={auth.isError} promoFilm={query.data.promoFilm}/>
      <div style={{ minHeight: '61.5vh' }} className="page-content">
        <section
          style={{
            display: 'flex',
            flexDirection: 'column'
          }}
          className="catalog"
        >
          <h2 className="catalog__title visually-hidden">Catalog</h2>

          <GenreList films={query.data.films} onGenreClick={setActiveGenre} activeGenre={activeGenre}/>

          <FilmsList films={filteredFilm.slice(0, Math.min(cardCount, filteredFilm.length))}/>

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
