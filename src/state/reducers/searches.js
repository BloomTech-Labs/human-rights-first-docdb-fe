import { SEARCH, CURRENT_SEARCH, SET_SEARCH_QUERY } from '../actions/searches';

const initialState = {
  currentSearch: '',
  currentPage: 1,
  pageSize: 10,
  query: '',
  searchTerm: '',
};

export const searchesReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case SEARCH:
      return { ...state, pageType: 'searchResults', currentSearch: payload };
    case SET_SEARCH_QUERY:
      return { ...state, currentSearch: payload };
    case CURRENT_SEARCH:
      return {
        ...state,
        currentSearch: payload.currentSearch,
        currentPage: payload.currentPage,
        pageSize: payload.pageSize,
      };
    default:
      return state;
  }
};
