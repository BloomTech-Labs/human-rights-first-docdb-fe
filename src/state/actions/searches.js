import { getDSData } from '../../api';
import { SET_PAGE } from './docs';

export const CURRENT_SEARCH = 'CURRENT_SEARCH';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SEARCH = 'SEARCH';

export const START_FETCH = 'START_FETCH';
export const FINISH_FETCH = 'FINISH_FETCH';

export const SET_DOCS = 'SET_DOCS';

export const searchDocs = (
  search,
  authState,
  page = 1,
  pageSize,
  pageType
) => dispatch => {
  dispatch({ type: START_FETCH });
  getDSData(
    `/search?query=${search}&page_number=${page -
    1}&results_per_page=${pageSize}`,
    authState
  )
    .then(data => {
      if (data.Response.length === 0) {
        dispatch({ type: SET_SEARCH_QUERY, payload: search });
        dispatch({ type: SET_PAGE, payload: 'noResults' });
        dispatch({ type: FINISH_FETCH });
      } else {
        dispatch({ type: SET_SEARCH_QUERY, payload: search });
        dispatch({ type: SET_DOCS, payload: data });
        dispatch({
          type: CURRENT_SEARCH,
          payload: { currentSearch: search, currentPage: page, pageSize: pageSize },
        });
        if (pageType !== 'bookmarks') {
          dispatch({ type: SET_PAGE, payload: 'searchResults' });
        }
      }
    })
    .catch(console.error);
};
