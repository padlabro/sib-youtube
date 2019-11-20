const Actions = {
  userLogin: name => dispatch => {
    dispatch({
      type: 'USER_LOGIN',
      payload: name
    });
  }
};
export default Actions;
