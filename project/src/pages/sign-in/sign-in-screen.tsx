import React from 'react';
import Footer from '../../components/footer/footer';
import SignInForm from '../../components/forms/sign-in-form/sign-in-form';
import Header from '../../components/header/header';
import { Navigate } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import { useSelector } from 'react-redux';
import { getCheckAuthQuery } from '../../store/selectors';
import Spinner from '../../components/spinner/spinner';

const SignInScreen = () => {
  const query = useSelector(getCheckAuthQuery);

  if (query.isSuccess) {
    return <Navigate to={AppRoute.Root}/>;
  }

  if (query.isLoading) {
    return <Spinner isActive/>;
  }

  return (
    <div className="user-page">
      <Header className="user-page__head">
        <h1 className="page-title user-page__title">Sign in</h1>
      </Header>

      <div className="sign-in user-page__content">
        <SignInForm/>
      </div>

      <Footer/>
    </div>
  );
};

export default SignInScreen;
