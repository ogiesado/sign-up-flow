import React from 'react';
import { Link } from 'react-router-dom';
import { ROUTE_HOME } from './constants';

import './styles/header.scss';

export default function Header() {
  return (
    <header className="header">
      <Link to={ROUTE_HOME} className="header__link">
        <img
          className="header__logo"
          alt="logo"
          src="https://uploads.codesandbox.io/uploads/user/749f85be-6327-4dc9-9df3-2c1550bab392/OHWw-mwgLogoWhite.png"
        />
      </Link>
    </header>
  );
}
