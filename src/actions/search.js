const Actions = {
  requestData: () => ({ type: 'REQUESTED_DATA' }),
  requestDataSuccess: data => ({ type: 'REQUESTED_DATA_SUCCESS', payload: data }),
  requestDataError: () => ({ type: 'REQUESTED_DATA_ERROR' }),
  onSearchVideos: value => dispatch => {
    dispatch({
      type: 'ON_SEARCH',
      payload: value
    });
  },
  openModal: () => dispatch => {
    dispatch({
      type: 'OPEN_MODAL'
    });
  },
  closePopup: () => dispatch => {
    dispatch({
      type: 'CLOSE_POPUP'
    });
  },
  addSavedRequests: data => dispatch => {
    dispatch({
      type: 'ADD_SAVED_REQUESTS',
      payload: data
    });
  }
};
export default Actions;
