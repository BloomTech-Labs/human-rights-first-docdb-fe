import {
  SET_DOCS,
  START_FETCH,
  BOOKMARKS,
  SEARCH,
  THUMBNAIL,
  LIST_VIEW,
} from '../actions';

const initialState = {
  docs: [],
  isFetching: false,
  page: 'bookmarks',
  cardView: true,
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
    case THUMBNAIL:
      return { ...state, cardView: true };
    case LIST_VIEW:
      return { ...state, cardView: false };
    default:
      return state;
  }
};

export default docsReducer;
