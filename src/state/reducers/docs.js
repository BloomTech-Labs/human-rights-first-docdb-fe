import {
  SET_DOCS,
  SET_BOOKMARKS,
  START_FETCH,
  BOOKMARKS,
  SEARCH,
  FINISH_FETCH,
} from '../actions';

const initialState = {
  docs: [],
  bookmarkedDocs: [],
  isFetching: false,
  page: 'bookmarks',
};

const docsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_FETCH:
      return { ...state, isFetching: true };
    case FINISH_FETCH:
      return { ...state, isFetching: false };
    case SET_DOCS:
      return { ...state, isFetching: false, docs: payload };
    case SET_BOOKMARKS:
      return { ...state, isFetching: false, bookmarkedDocs: payload };
    case BOOKMARKS:
      return { ...state, page: 'bookmarks' };
    case SEARCH:
      return { ...state, page: 'search', searchTerm: payload };
    default:
      return state;
  }
};

export default docsReducer;
