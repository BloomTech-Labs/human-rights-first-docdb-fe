import {
  SET_DOCS,
  SET_BOOKMARKS,
  START_FETCH,
  SET_PAGE,
  SAVE_BOOKMARKS,
  REMOVE_BOOKMARKS,
  SEARCH,
  FINISH_FETCH,
  THUMBNAIL,
  LIST_VIEW,
  CURRENT_SEARCH,
} from '../actions';

const initialState = {
  docs: [],
  totalDocsCount: 0,
  currentSearch: '',
  currentPage: 1,
  pageSize: 10,
  bookmarkedDocs: [],
  isFetching: false,
  pageType: 'bookmarks',
  cardView: true,
};

const docsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_FETCH:
      return { ...state, isFetching: true };
    case FINISH_FETCH:
      return { ...state, isFetching: false };
    case SET_DOCS:
      return {
        ...state,
        isFetching: false,
        docs: payload.Response,
        totalDocsCount: payload.Count,
      };
    case SET_BOOKMARKS:
      return { ...state, bookmarkedDocs: payload };
    case SET_PAGE:
      return { ...state, pageType: payload };
    case SAVE_BOOKMARKS:
      return { ...state, bookmarkedDocs: [...state.bookmarkedDocs, payload] };
    case REMOVE_BOOKMARKS:
      return {
        ...state,
        bookmarkedDocs: state.bookmarkedDocs.filter(id => id !== payload),
      };
    case CURRENT_SEARCH:
      return {
        ...state,
        currentSearch: payload.currentSearch,
        currentPage: payload.currentPage,
        pageSize: payload.pageSize,
      };
    case SEARCH:
      return { ...state, currentSearch: payload };
    case THUMBNAIL:
      return { ...state, cardView: true };
    case LIST_VIEW:
      return { ...state, cardView: false };
    default:
      return state;
  }
};

export default docsReducer;
