const initialState = {
  isAuth: !!window.localStorage.token
};

export default (state = initialState, { type }) => {
  switch (type) {
    case 'USER_LOGIN':
      return {
        ...state,
        isAuth: true
      };
    default:
      return state;
  }
};
