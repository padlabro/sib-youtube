import React from 'react';
import './Header.scss';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import logo from '../../../public/images/logo.svg';

const HeaderComp = ({ exitFromAccount, closePopup }) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__logo">
            <img src={logo} width={48} height={48} />
          </div>
          <nav className="header__nav">
            <NavLink className="nav__link" exact activeClassName="active" to="/">
              Поиск
            </NavLink>
            <NavLink
              className="nav__link"
              onClick={closePopup}
              exact
              activeClassName="active"
              to="/favorites"
            >
              Избранное
            </NavLink>
          </nav>
          <button type="button" onClick={exitFromAccount} className="header__exit">
            Выйти
          </button>
        </div>
      </div>
    </header>
  );
};
export default HeaderComp;

HeaderComp.propTypes = {
  exitFromAccount: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired
};
