const initialState = {
  isModalOpen: false,
  login: window.localStorage.getItem('login') || ''
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'OPEN_MODAL':
      return {
        ...state,
        isModalOpen: true
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        isModalOpen: false
      };
    case 'USER_LOGIN':
      return {
        ...state,
        login: payload
      };
    case 'EDIT_REQUEST':
      return {
        ...state,
        isModalOpen: true
      };
    default:
      return state;
  }
};
