import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Auth, Home } from './pages';
import './styles.scss';

const App = ({ isAuth }) => {
  return (
    <Switch>
      <Route exact path="/login" component={Auth} />
      <Route path="/" render={() => (isAuth ? <Home /> : <Redirect to="/login" />)} />
    </Switch>
  );
};

export default connect(({ auth }) => ({ isAuth: auth.isAuth }))(App);

App.propTypes = {
  isAuth: PropTypes.bool.isRequired
};
