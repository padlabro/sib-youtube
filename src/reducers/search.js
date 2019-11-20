const initialState = {
  searchQuery: '',
  loading: false,
  requestWasSaved: false,
  data: {},
  popupIsOpen: false,
  error: false
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case 'ON_SEARCH':
      return {
        ...state,
        searchQuery: payload
      };
    case 'REQUESTED_DATA':
      return {
        ...state,
        requestWasSaved: false,
        showResults: true,
        loading: true,
        error: false
      };
    case 'REQUESTED_DATA_SUCCESS':
      return {
        ...state,
        data: payload,
        loading: false
      };
    case 'REQUESTED_DATA_ERROR':
      return {
        ...state,
        loading: false,
        error: true
      };
    case 'ADD_REQUEST':
      return {
        ...state,
        popupIsOpen: true,
        requestWasSaved: true
      };
    case 'CLOSE_POPUP':
      return {
        ...state,
        popupIsOpen: false
      };
    default:
      return state;
  }
};
