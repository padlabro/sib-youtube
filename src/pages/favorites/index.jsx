import { connect } from 'react-redux';
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { FavoritesComp } from '../../components';
import { searchActions, favoritesActions } from '../../actions';
import service from '../../services/service';

const Favorites = ({
  onSearchVideos,
  requests,
  editRequest,
  deleteRequest,
  login,
  addSavedRequests
}) => {
  useEffect(() => {
    if (requests.length !== 0) {
      localStorage.setItem(login, JSON.stringify(requests));
    } else {
      const array = JSON.parse(localStorage.getItem(login));
      if (array) {
        addSavedRequests(array);
      }
    }
  }, [login]);
  useEffect(() => {
    localStorage.setItem(login, JSON.stringify(requests));
  }, [requests]);

  const handleExecRequest = e => {
    const { searchQuery, sortBy, numOfVideos } = requests[e.target.name];
    onSearchVideos(searchQuery);
    service.getData(searchQuery, sortBy, numOfVideos);
  };

  const handleEditRequest = e => {
    editRequest(Number(e.target.name));
  };

  const handleDeleteRequest = e => {
    deleteRequest(Number(e.target.name));
  };
  return (
    <FavoritesComp
      execRequest={handleExecRequest}
      editRequest={handleEditRequest}
      deleteRequest={handleDeleteRequest}
    />
  );
};
export default connect(
  ({ favorites, home }) => ({
    requests: favorites.requests,
    login: home.login
  }),
  { ...searchActions, ...favoritesActions }
)(Favorites);

Favorites.propTypes = {
  onSearchVideos: PropTypes.func.isRequired,
  requests: PropTypes.array.isRequired,
  editRequest: PropTypes.func.isRequired,
  deleteRequest: PropTypes.func.isRequired,
  login: PropTypes.string.isRequired,
  addSavedRequests: PropTypes.func.isRequired
};
