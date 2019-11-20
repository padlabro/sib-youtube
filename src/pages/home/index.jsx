import React from 'react';
import { Route } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Favorites from '../favorites';
import { Header, Modal, Search } from '../../containers';
import { authActions } from '../../actions';

const Home = ({ isModalOpen }) => {
  return (
    <>
      <Header />
      <Route path="/" exact component={Search} />
      <Route path="/favorites" component={Favorites} />
      <Modal isModalOpen={isModalOpen} />
    </>
  );
};
export default connect(
  ({ search, home, favorites }) => ({
    requests: favorites.requests,
    searchQuery: search.showResults,
    isModalOpen: home.isModalOpen,
    login: home.login
  }),
  authActions
)(Home);

Home.propTypes = {
  isModalOpen: PropTypes.bool.isRequired
};
