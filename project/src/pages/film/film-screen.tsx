import React from 'react';
import Footer from '../../components/footer/footer';
import { useGetFilmQuery, useGetSimilarQuery } from '../../api/api';
import Spinner from '../../components/spinner/spinner';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/header';
import FilmCardContainer from '../../components/film-card-container/film-card-container';
import NotFoundScreen from '../not-found-screen/not-found-screen';

const FilmScreen = () => {
  const params = useParams();
  const similarFilmsQuery = useGetSimilarQuery(params.film as string);
  const filmQuery = useGetFilmQuery(params.film as string, {
    selectFromResult({ data, isLoading, isError }) {
      return { data, isError, isLoading };
    }
  });

  if (filmQuery.isError) {
    return <NotFoundScreen/>;
  }

  if (filmQuery.isLoading || !filmQuery.data) {
    return <Spinner isActive/>;
  }
  console.log('7');
  return (
    <>
      <FilmCardContainer film={filmQuery.data} full>
        <Header className="film-card__head"/>
      </FilmCardContainer>

      <div className="page-content">
        <section className="catalog catalog--like-this">
          <h2 className="catalog__title">More like this</h2>
          {/*<FilmsList films={similarFilmsQuery.data}/>*/}
        </section>
        <Footer/>
      </div>
    </>
  );
};

export default FilmScreen;
