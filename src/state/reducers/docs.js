import {
  SET_DOCS,
  SET_BOOKMARKS,
  START_FETCH,
  BOOKMARKS,
  SAVE_BOOKMARKS,
  REMOVE_BOOKMARKS,
  SEARCH,
  FINISH_FETCH,
  THUMBNAIL,
  LIST_VIEW,
  SET_SEARCH_QUERY,
} from '../actions';

const initialState = {
  docs: [],
  bookmarkedDocs: [],
  isFetching: false,
  page: 'bookmarks',
  cardView: true,
  query: '',
  searchTerm: '',
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
    case SAVE_BOOKMARKS:
      return { ...state, bookmarkedDocs: [...state.bookmarkedDocs, payload] };
    case REMOVE_BOOKMARKS:
      return {
        ...state,
        bookmarkedDocs: state.bookmarkedDocs.filter(id => id !== payload),
      };
    case SEARCH:
      return { ...state, page: 'search', searchTerm: payload };
    case THUMBNAIL:
      return { ...state, cardView: true };
    case LIST_VIEW:
      return { ...state, cardView: false };
    case SET_SEARCH_QUERY:
      return { ...state, searchTerm: payload };
    default:
      return state;
  }
};

export default docsReducer;
