// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

import { getDSData, axiosWithAuth } from '../../api';

export const BOOKMARKS = 'BOOKMARKS';

export const SET_BOOKMARKS = 'SET_BOOKMARKS';
export const REMOVE_BOOKMARKS = 'REMOVE_BOOKMARKS';
export const SAVE_BOOKMARKS = 'SAVE_BOOKMARKS';
export const THUMBNAIL = 'THUMBNAIL';

export const LIST_VIEW = 'LIST_VIEW';

export const SET_DOCS = 'SET_DOCS';

export const START_FETCH = 'START_FETCH';

export const FINISH_FETCH = 'FINISH_FETCH';

const apiURI = process.env.REACT_APP_API_URI;

export const getDocs = authState => async dispatch => {
  dispatch({ type: START_FETCH });
  try {
    const { data } = await axiosWithAuth(authState).get(`${apiURI}/bookmarks`);
    if (data.length > 0) {
      const fileIds = data.map(d => d.fileId);
      dispatch({ type: SET_BOOKMARKS, payload: fileIds });
      const ids = data.map(b => b.fileId).join(' ');
      const { Response } = await getDSData(`/search/${ids}`, authState);
      dispatch({ type: SET_DOCS, payload: Response });
    } else {
      dispatch({ type: FINISH_FETCH });
      // dispatch({ type: SEARCH_BAR });
    }
  } catch (err) {
    console.log('GETDOCS ERROR', err);
  }
};

export const saveBookmarks = (authState, bookmarkId) => async dispatch => {
  try {
    await axiosWithAuth(authState).post(
      `${apiURI}/bookmarks/${bookmarkId}`,
      bookmarkId
    );
    dispatch({ type: SAVE_BOOKMARKS, payload: bookmarkId });
  } catch (err) {
    console.error(err);
  }
};

export const removeBookmarks = (authState, bookmarkId) => async dispatch => {
  try {
    await axiosWithAuth(authState).delete(
      `
      ${apiURI}/bookmarks/${bookmarkId}`
    );
    dispatch({ type: REMOVE_BOOKMARKS, payload: bookmarkId });
  } catch (err) {
    console.log(err);
  }
};

export const bookmarks = () => ({ type: BOOKMARKS });

export const displayListView = () => ({ type: LIST_VIEW });

export const displayThumbnail = () => ({ type: THUMBNAIL });