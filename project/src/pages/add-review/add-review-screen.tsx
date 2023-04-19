import React from 'react';
import Header from '../../components/header/header';
import { useGetFilmQuery } from '../../api/api';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../../components/spinner/spinner';
import { AppRoute } from '../../consts/enum';
import ReviewForm from '../../components/forms/review-form/review-form';


const AddReviewScreen = () => {
  const { id } = useParams();
  const filmQuery = useGetFilmQuery(id as string);

  if (filmQuery.isLoading || !filmQuery.data) {
    return <Spinner isActive/>;
  }

  const { backgroundImage, name, posterImage } = filmQuery.data;

  return (
    <section className="film-card film-card--full">
      <div className="film-card__header">
        <div className="film-card__bg">
          <img src={backgroundImage} alt={name}/>
        </div>
        <h1 className="visually-hidden">WTW</h1>
        <Header>
          <nav className="breadcrumbs">
            <ul className="breadcrumbs__list">
              <li className="breadcrumbs__item">
                <Link relative="path" to=".." className="breadcrumbs__link">{name}</Link>
              </li>
              <li className="breadcrumbs__item">
                <a
                  onClick={(evt) => evt.preventDefault()}
                  href={AppRoute.Root}
                  className="breadcrumbs__link"
                >
                  Add review
                </a>
              </li>
            </ul>
          </nav>
        </Header>
        <div className="film-card__poster film-card__poster--small">
          <img
            src={posterImage}
            alt={name}
            width="218"
            height="327"
          />
        </div>
      </div>
      <ReviewForm id={id as string}/>
    </section>
  );
};

export default AddReviewScreen;
