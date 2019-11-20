const Actions = {
  userLogout: () => dispatch => {
    dispatch({
      type: 'USER_LOGOUT'
    });
  }
};
export default Actions;
