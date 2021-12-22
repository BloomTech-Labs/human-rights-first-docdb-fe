import { combineReducers } from 'redux';
import { bookmarksReducer as bookmarks } from './bookmarks';
import { docsReducer as docs } from './docs';
import { searchesReducer as searches } from './searches';

export default combineReducers({
  bookmarks,
  docs,
  searches,
});
