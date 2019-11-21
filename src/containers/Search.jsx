import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { SearchComp } from '../components';
import { searchActions } from '../actions';
import service from '../services/service';

const Search = ({
  loading,
  data,
  searchQuery,
  openModal,
  onSearchVideos,
  isModalOpen,
  requestWasSaved,
  closePopup,
  popupIsOpen,
  login,
  requests,
  addSavedRequests,
  error
}) => {
  const [videoId, setVideoId] = useState(undefined);
  const [gridLayout, setgridLayout] = useState(true);

  useEffect(() => {
    if (requestWasSaved && popupIsOpen) {
      setTimeout(() => {
        closePopup();
      }, 4000);
    }
  }, [requestWasSaved]);

  useEffect(() => {
    console.log('search', requests.length);
    if (requests.length !== 0) {
      localStorage.setItem(login, JSON.stringify(requests));
    } else {
      const array = JSON.parse(localStorage.getItem(login));
      if (array) {
        addSavedRequests(array);
      }
    }
  }, [login]);

  const onSearch = value => {
    if (value) {
      setVideoId(undefined);
      onSearchVideos(value);
      service.getData(value);
    }
  };

  const changeLayout = () => {
    if (gridLayout) {
      setgridLayout(false);
    } else {
      setgridLayout(true);
    }
  };

  const handleClosePopup = () => {
    closePopup();
  };

  const playVideo = e => {
    setVideoId(e.currentTarget.id);
  };

  const handleOpenModal = e => {
    if (e.target.id !== 'popup-link') {
      openModal();
    }
  };

  return (
    <SearchComp
      isModalOpen={isModalOpen}
      onSearch={onSearch}
      searchQuery={searchQuery}
      loading={loading}
      data={data}
      playVideo={playVideo}
      videoId={videoId}
      gridLayout={gridLayout}
      changeLayout={changeLayout}
      handleOpenModal={handleOpenModal}
      requestWasSaved={requestWasSaved}
      displayPopup={popupIsOpen}
      closePopup={handleClosePopup}
      error={error}
    />
  );
};
export default connect(
  ({ search, home, favorites }) => ({
    data: search.data,
    loading: search.loading,
    searchQuery: search.searchQuery,
    isModalOpen: home.isModalOpen,
    requestWasSaved: search.requestWasSaved,
    popupIsOpen: search.popupIsOpen,
    login: home.login,
    requests: favorites.requests,
    error: search.error
  }),
  searchActions
)(Search);

Search.propTypes = {
  loading: PropTypes.bool.isRequired,
  data: PropTypes.object.isRequired,
  searchQuery: PropTypes.string.isRequired,
  openModal: PropTypes.func.isRequired,
  onSearchVideos: PropTypes.func.isRequired,
  isModalOpen: PropTypes.bool.isRequired,
  requestWasSaved: PropTypes.bool.isRequired,
  closePopup: PropTypes.func.isRequired,
  popupIsOpen: PropTypes.bool.isRequired,
  login: PropTypes.string.isRequired,
  requests: PropTypes.array.isRequired,
  addSavedRequests: PropTypes.func.isRequired,
  error: PropTypes.bool.isRequired
};
