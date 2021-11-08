// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

// import { getDSData } from '../../api';
import { testDocs } from '../../__mocks__';

export const BOOKMARKS = 'BOOKMARKS';

export const SEARCH = 'SEARCH';

export const SET_DOCS = 'SET_DOCS';

export const START_FETCH = 'START_FETCH';

export const getDocs = authState => dispatch => {
  dispatch({ type: START_FETCH });
  dispatch({ type: SET_DOCS, payload: testDocs });
  // getDSData(null, authState)
  //   .then(data => dispatch({ type: SET_DOCS, payload: data }))
  //   .catch(console.error);
};

export const bookmarks = () => ({ type: BOOKMARKS });
