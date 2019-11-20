import React from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { HeaderComp } from '../components';
import { headerActions } from '../actions';

const Header = ({ history, userLogout }) => {
  const exitFromAccount = () => {
    userLogout();
    localStorage.removeItem('token');
    history.push('/login');
  };

  return <HeaderComp exitFromAccount={exitFromAccount} />;
};
export default withRouter(
  connect(
    null,
    headerActions
  )(Header)
);
Header.propTypes = {
  history: PropTypes.object.isRequired,
  userLogout: PropTypes.func.isRequired
};
