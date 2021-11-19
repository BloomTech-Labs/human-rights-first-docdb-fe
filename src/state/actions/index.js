// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

import { createDSApi, axiosWithAuth } from '../../api';

export const BOOKMARKS = 'BOOKMARKS';

export const SEARCH = 'SEARCH';

export const SET_DOCS = 'SET_DOCS';

export const START_FETCH = 'START_FETCH';

export const getDocs = authState => dispatch => {
  dispatch({ type: START_FETCH });
  // london is a placeholder. In future versions, ideally we would call the users bookmarked docs.
  createDSApi(authState)
    .get('/search/london')
    .then(data => dispatch({ type: SET_DOCS, payload: data.Response }))
    .catch(console.error);
};

export const searchDocs = (search, authState) => dispatch => {
  dispatch({ type: START_FETCH });
  createDSApi(authState)
    .get(`/search/${search}`)
    .then(data => {
      dispatch({ type: SET_DOCS, payload: data.Response });
    })
    .catch(console.error);
};

const apiURI = process.env.REACT_APP_API_URI;
const dsApiURI = process.env.REACT_APP_DS_API_URI;

export const SET_BOOKMARKS = 'SET_BOOKMARKS';

export const getBookmarks = authState => async dispatch => {
  try {
    dispatch({ type: START_FETCH });
    const { data } = await axiosWithAuth(authState).get(`${apiURI}/bookmarks`);
    const ids = data.map(b => b.fileId).join(' ');
    const { Response } = await axiosWithAuth(authState).get(
      `${dsApiURI}/search/${ids}`
    );

    dispatch({ type: SET_BOOKMARKS, payload: Response });
  } catch (err) {
    console.log(err);
  }
};

export const bookmarks = () => ({ type: BOOKMARKS });
