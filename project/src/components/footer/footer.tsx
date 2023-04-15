import React from 'react';
import { AppRoute } from '../../consts/enum';

const Footer = () => (
  <footer style={{ marginTop: 'auto' }} className="page-footer">
    <div className="logo">
      <a onClick={(evt) => evt.preventDefault()} href={AppRoute.Root} className="logo__link logo__link--light">
        <span className="logo__letter logo__letter--1">W</span>
        <span className="logo__letter logo__letter--2">T</span>
        <span className="logo__letter logo__letter--3">W</span>
      </a>
    </div>
    <div className="copyright">
      <p>© 2019 What to watch Ltd.</p>
    </div>
  </footer>
);

export default React.memo(Footer);
