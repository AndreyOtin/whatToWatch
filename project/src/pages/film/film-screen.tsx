import React from 'react';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import { useGetFilmQuery, useGetSimilarQuery } from '../../api/api';
import Spinner from '../../components/spinner/spinner';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import FilmCardContainer from '../../components/film-card-container/film-card-container';

const FilmScreen = () => {
  const params = useParams();
  const similarFilmsQuery = useGetSimilarQuery(params.film as string);
  const filmQuery = useGetFilmQuery(params.film as string);

  if (similarFilmsQuery.isLoading || filmQuery.isLoading || !similarFilmsQuery.data || !filmQuery.data) {
    return <Spinner isActive/>;
  }

  return (
    <>
      <FilmCardContainer film={filmQuery.data} full>
        <Header className="film-card__head"/>
      </FilmCardContainer>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          <FilmsList films={similarFilmsQuery.data}/>
        </section>
        <Footer/>
      </div>
    </>
  );
};

export default FilmScreen;
