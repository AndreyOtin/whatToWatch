import React from 'react';
import { Link, useMatch } from 'react-router-dom';
import { AppRoute } from '../../consts/enum';
import clsx from 'clsx';
import { useSelector } from "react-redux";
import { getCheckAuthQuery } from "../../store/selectors";

type HeaderProps = {
  children?: JSX.Element;
  className: string;
  isUserAuthed?: boolean;
}

const Header = ({ children, className, isUserAuthed = false }: HeaderProps) => {
  const isLoginRoute = !!useMatch(AppRoute.Login);
  const query = useSelector(getCheckAuthQuery);

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
          {isUserAuthed
            ? (
              <div className="user-block">
                <Link to={AppRoute.Login} className="user-block__link">Sign in</Link>
              </div>)
            : (
              <>
                <li className="user-block__item">
                  <div className="user-block__avatar">
                    <img src={query?.data?.avatarUrl} alt={query?.data?.name} width="63" height="63"/>
                  </div>
                </li>
                <li className="user-block__item">
                  <a className="user-block__link">Sign out</a>
                </li>
              </>
            )}
        </ul>}
    </header>
  );
};

export default Header;
