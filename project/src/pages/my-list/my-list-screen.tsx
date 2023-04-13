import React from 'react';
import Footer from '../../components/footer/footer';
import FilmsList from '../../components/films-list/films-list';
import Header from '../../components/header/header';
import { useGetFavoritesQuery } from '../../api/api';
import Spinner from '../../components/spinner/spinner';
import { useSelector } from 'react-redux';
import { getCheckAuthQuery } from '../../store/selectors';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';

const MyListScreen = () => {
  const favoritesQuery = useGetFavoritesQuery();
  const authQuery = useSelector(getCheckAuthQuery);

  if (authQuery.isError) {
    return <Navigate to={AppRoute.Login}/>;
  }

  return (
    <div className="user-page">
      <Header className="user-page__head">
        <h1 className="page-title user-page__title">
          My list
          <span
            className="user-page__film-count"
          >
            {favoritesQuery?.data?.length}
          </span>
        </h1>
      </Header>

      <section className="catalog">
        <h2 className="catalog__title visually-hidden">Catalog</h2>
        <Spinner isActive={favoritesQuery.isLoading}>
          <FilmsList films={favoritesQuery.data || []}/>
        </Spinner>
      </section>
      <Footer/>
    </div>
  );
};

export default MyListScreen;
