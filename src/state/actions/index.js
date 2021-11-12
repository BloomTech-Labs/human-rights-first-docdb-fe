// import all of your actions into this file, and export them back out.
// This allows for the simplification of flow when importing actions into your components throughout your app.
// Actions should be focused to a single purpose.
// You can have multiple action creators per file if it makes sense to the purpose those action creators are serving.
// Declare action TYPES at the top of the file

import { getDSData } from '../../api';

export const BOOKMARKS = 'BOOKMARKS';

export const SEARCH = 'SEARCH';

export const SET_DOCS = 'SET_DOCS';

const testDocs = [
  {
    title: 'test',
    preview:
      'https://static8.depositphotos.com/1263295/875/i/600/depositphotos_8758503-stock-photo-any-questions.jpg',
    tags: ['tag1', 'tag2', 'tag3'],
    favorited: true,
  },
  {
    title: 'test',
    preview:
      'https://static8.depositphotos.com/1263295/875/i/600/depositphotos_8758503-stock-photo-any-questions.jpg',
    tags: ['tag1'],
    favorited: false,
  },
  {
    title: 'test',
    preview:
      'https://static8.depositphotos.com/1263295/875/i/600/depositphotos_8758503-stock-photo-any-questions.jpg',
    tags: ['tag1', 'tag2'],
    favorited: true,
  },
];

export const START_FETCH = 'START_FETCH';

export const getDocs = authState => dispatch => {
  dispatch({ type: START_FETCH });
  dispatch({ type: SET_DOCS, payload: testDocs });
  // getDSData("/search", authState)
  //   .then(data => dispatch({ type: SET_DOCS, payload: data }))
  //   .catch(console.error);
};

export const searchDocs = (search, authState) => dispatch => {
  dispatch({ type: START_FETCH });
  getDSData(`/search/${search}`, authState)
    .then(data => {
      console.log(data);
      if (data) dispatch({ type: SET_DOCS, payload: data.Response });
    })
    .catch(console.error);
};

export const bookmarks = () => ({ type: BOOKMARKS });
