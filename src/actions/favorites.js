const Actions = {
  editRequest: id => dispatch => {
    dispatch({
      type: 'EDIT_REQUEST',
      payload: id
    });
  },
  deleteRequest: id => dispatch => {
    dispatch({
      type: 'DELETE_REQUEST',
      payload: id
    });
  }
};
export default Actions;
