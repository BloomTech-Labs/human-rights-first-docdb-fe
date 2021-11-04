import { SET_DOCS, BOOKMARKS, SEARCH } from '../actions';

const initialState = {
  docs: [],
  page: 'bookmarks',
  searchTerm: '',
};

const docsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SET_DOCS:
      return { ...state, docs: payload };
    case BOOKMARKS:
      return { ...state, page: 'bookmarks' };
    case SEARCH:
      return { ...state, page: 'search', searchTerm: payload };
    default:
      return state;
  }
};

export default docsReducer;
