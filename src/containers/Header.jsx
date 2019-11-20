import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HeaderComp } from '../components';
import { headerActions, searchActions } from '../actions';

const Header = ({ history, userLogout, closePopup, popupIsOpen }) => {
  const exitFromAccount = () => {
    localStorage.removeItem('token');
    userLogout();
    history.push('/login');
  };
  const handleClosePopup = () => {
    if (popupIsOpen) {
      closePopup();
    }
  };

  return <HeaderComp exitFromAccount={exitFromAccount} closePopup={handleClosePopup} />;
};
export default withRouter(
  connect(
    ({ search }) => ({
      popupIsOpen: search.popupIsOpen
    }),
    { ...headerActions, ...searchActions }
  )(Header)
);
Header.propTypes = {
  history: PropTypes.object.isRequired,
  userLogout: PropTypes.func.isRequired,
  closePopup: PropTypes.func.isRequired,
  popupIsOpen: PropTypes.bool.isRequired
};
