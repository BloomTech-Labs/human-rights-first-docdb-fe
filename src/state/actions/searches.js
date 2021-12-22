import { getDSData } from '../../api';

export const CURRENT_SEARCH = 'CURRENT_SEARCH';
export const SET_SEARCH_QUERY = 'SET_SEARCH_QUERY';
export const SEARCH = 'SEARCH';
export const SEARCH_BAR = 'SEARCH_BAR';

export const START_FETCH = 'START_FETCH';
export const FINISH_FETCH = 'FINISH_FETCH';

export const SET_DOCS = 'SET_DOCS';

export const searchDocs = (search, authState, page, pageSize) => dispatch => {
  dispatch({ type: START_FETCH });
  dispatch({ type: SET_SEARCH_QUERY, payload: search });
  getDSData(
    `/search?query=${search}&page_number=${page -
      1}&results_per_page=${pageSize}`,
    authState
  )
    .then(data => {
      console.log(data);
      if (data.Response.length === 0) {
        alert('No search results');
        dispatch({ type: FINISH_FETCH });
      } else {
        dispatch({ type: SET_DOCS, payload: data });
        dispatch({ type: SEARCH, payload: search });
      }
    })
    .catch(console.error);
};

export const setCurrentSearch = (
  currentSearch,
  currentPage,
  pageSize
) => dispatch => {
  dispatch({
    type: CURRENT_SEARCH,
    payload: { currentSearch, currentPage, pageSize },
  });
};