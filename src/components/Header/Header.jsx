import React from 'react';
import { Link } from 'react-router-dom';

import AccountAccessControlLinks from '../AccountAccessControlLinks';
import LinkCreateArticle from '../LinkCreateArticle';
import Person from '../Person';

import './Header.scss';

const Header = () => {
  return (
    <section className="header">
      <div className="wrapper">
        <div className="header__container">
          <Link to="/" className="header__logo">
            Realworld Blog
          </Link>
          <div className="header__function-and-information-panel">
            <LinkCreateArticle />
            <Link to="/profile">
              <Person />
            </Link>
            <AccountAccessControlLinks />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Header;
