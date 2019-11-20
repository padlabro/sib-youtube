import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { ModalComp } from '../components';
import { modalActions } from '../actions';

const Modal = ({
  isModalOpen,
  searchQuery,
  addRequest,
  closeModal,
  edit,
  requests,
  saveRequest
}) => {
  const [requestData, setRequestData] = useState({
    searchQuery,
    name: '',
    sortBy: '',
    numOfVideos: ''
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (searchQuery && isModalOpen) {
      setRequestData(() => ({
        searchQuery
      }));
    }
  }, [isModalOpen, searchQuery]);
  useEffect(() => {
    if (edit !== null && isModalOpen) {
      setRequestData(requests[edit]);
    }
  }, [edit, isModalOpen]);

  const handleChange = event => {
    const { value } = event.target;
    const { name } = event.currentTarget;
    setRequestData(() => ({
      ...requestData,
      [name]: value
    }));
  };

  const changeNumOfVideos = value => {
    setRequestData(() => ({
      ...requestData,
      numOfVideos: value
    }));
  };

  const changeSortType = value => {
    setRequestData(() => ({
      ...requestData,
      sortBy: value
    }));
  };

  const handleSaveRequest = e => {
    e.preventDefault();
    if (requestData.name) {
      setError('');
      if (edit === null) {
        const id = Math.floor(Math.random() * Math.floor(10000));
        const data = { ...requestData, id, searchQuery };
        addRequest(data);
      } else {
        saveRequest(requestData);
      }
      closeModal();
    } else {
      setError('error');
    }
  };

  const handleCloseModal = () => {
    setRequestData(() => ({}));
    closeModal();
  };

  return (
    <ModalComp
      error={error}
      edit={edit}
      isModalOpen={isModalOpen}
      handleChange={handleChange}
      saveRequest={handleSaveRequest}
      requestData={requestData}
      changeNumOfVideos={changeNumOfVideos}
      changeSortType={changeSortType}
      searchQuery={searchQuery}
      handleCloseModal={handleCloseModal}
    />
  );
};
export default connect(
  ({ search, favorites, home }) => ({
    searchQuery: search.searchQuery,
    requests: favorites.requests,
    edit: favorites.edit,
    login: home.login
  }),
  modalActions
)(Modal);

Modal.propTypes = {
  isModalOpen: PropTypes.bool.isRequired,
  addRequest: PropTypes.func.isRequired,
  searchQuery: PropTypes.string.isRequired,
  closeModal: PropTypes.func.isRequired,
  edit: PropTypes.number,
  requests: PropTypes.array.isRequired,
  saveRequest: PropTypes.func.isRequired
};
Modal.defaultProps = {
  edit: undefined
};
