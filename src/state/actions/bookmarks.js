import { getDSData, axiosWithAuth } from '../../api';
const apiURI = process.env.REACT_APP_API_URI;

export const BOOKMARKS = 'BOOKMARKS';
export const SET_BOOKMARKS = 'SET_BOOKMARKS';
export const REMOVE_BOOKMARKS = 'REMOVE_BOOKMARKS';
export const SAVE_BOOKMARKS = 'SAVE_BOOKMARKS';

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
