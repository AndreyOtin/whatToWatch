import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { getCheckAuthQuery } from '../../store/selectors';
import { useLogUserOutMutation } from '../../api/api';
import { displayToast } from '../../utils/app';
import { removeToken } from '../../api/token';

type HeaderProps = {
  children?: JSX.Element;
  className: string;
}

const Header = ({ children, className }: HeaderProps) => {
  const isLoginRoute = !!useMatch(AppRoute.Login);
  const authQuery = useSelector(getCheckAuthQuery);
  const [logUserOut] = useLogUserOutMutation();

  const handleLogoutClick = () => {
    logUserOut()
      .unwrap()
      .then(() => removeToken())
      .catch((err) => {
        displayToast(err);
      });
  };

  return (
    <header className={clsx('page-header', className)}>
      <div className="logo">
        <Link to={AppRoute.Root} className="logo__link">
          <span className="logo__letter logo__letter--1">W</span>
          <span className="logo__letter logo__letter--2">T</span>
          <span className="logo__letter logo__letter--3">W</span>
        </Link>
      </div>
      {children}
      {isLoginRoute ||
        <ul className="user-block">
          {authQuery.isError
            ? (
              <div className="user-block">
                <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
              </div>)
            : (
              <>
                <li className="user-block__item">
                  <div className="user-block__avatar">
                    <Link to={AppRoute.Favorites}>
                      <img src={authQuery?.data?.avatarUrl} alt={authQuery?.data?.name} width="63" height="63"/>
                    </Link>
                  </div>
                </li>
                <li className="user-block__item">
                  <a
                    onClick={handleLogoutClick}
                    className="user-block__link"
                  >
                    Sign out
                  </a>
                </li>
              </>
            )}
        </ul>}
    </header>
  );
};

export default Header;
