import { SET_DOCS, START_FETCH, BOOKMARKS, SEARCH } from '../actions';

const initialState = {
  docs: [],
  isFetching: false,
  page: 'bookmarks',
};

const docsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_FETCH:
      return { ...state, isFetching: true };
    case SET_DOCS:
      return { ...state, isFetching: false, docs: payload };
    case BOOKMARKS:
      return { ...state, page: 'bookmarks' };
    case SEARCH:
      return { ...state, page: 'search', searchTerm: payload };
    default:
      return state;
  }
};

export default docsReducer;
