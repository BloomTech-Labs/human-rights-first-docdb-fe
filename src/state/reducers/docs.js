import {
  SET_DOCS,
  SET_BOOKMARKS,
  START_FETCH,
  BOOKMARKS,
  SAVE_BOOKMARKS,
  SEARCH,
  FINISH_FETCH,
  THUMBNAIL,
  LIST_VIEW,
} from '../actions';

const initialState = {
  docs: [],
  totalDocsCount: 11,
  pageCount: 1,
  searchTerm: '',
  currentPage: 0,
  pageSize: 10,

  bookmarkedDocs: [],
  isFetching: false,
  page: 'bookmarks',
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
        count: payload.Count,
        pageCount: payload.Pages,
        totalDocsCount: payload.Count,
      };
    case SET_BOOKMARKS:
      return { ...state, isFetching: false, bookmarkedDocs: payload };
    case BOOKMARKS:
      return { ...state, page: 'bookmarks' };
    case SAVE_BOOKMARKS:
      return { ...state, bookmarkedDocs: [...state.bookmarkedDocs, payload] };
    case SEARCH:
      return {
        ...state,
        page: 'search',
        currentPage: payload[0],
        pageSize: payload[1],
      };
    case THUMBNAIL:
      return { ...state, cardView: true };
    case LIST_VIEW:
      return { ...state, cardView: false };
    default:
      return state;
  }
};

export default docsReducer;
