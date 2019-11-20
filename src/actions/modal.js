const Actions = {
  addRequest: data => dispatch => {
    dispatch({
      type: 'ADD_REQUEST',
      payload: data
    });
  },
  saveRequest: data => dispatch => {
    dispatch({
      type: 'SAVE_REQUEST',
      payload: data
    });
  },
  closeModal: () => dispatch => {
    dispatch({
      type: 'CLOSE_MODAL'
    });
  }
};
export default Actions;
