const initialState = {
  requests: [],
  edit: null
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ADD_REQUEST':
      return {
        ...state,
        requests: [...state.requests, payload]
      };
    case 'ADD_SAVED_REQUESTS':
      return {
        ...state,
        requests: payload
      };
    case 'SAVE_REQUEST':
      return {
        ...state,
        requests: state.requests.map((item, i) => (i === state.edit ? payload : item))
      };
    case 'DELETE_REQUEST':
      return {
        ...state,
        requests: state.requests.filter((item, i) => i !== payload)
      };
    case 'EDIT_REQUEST':
      return {
        ...state,
        edit: payload
      };
    case 'CLOSE_MODAL':
      return {
        ...state,
        edit: null
      };
    default:
      return state;
  }
};
