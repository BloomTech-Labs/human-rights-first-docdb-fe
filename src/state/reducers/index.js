import { combineReducers } from 'redux';
import { bookmarksReducer as bookmarks } from './bookmarks';
import { docsReducer as docs } from './docs';

export default combineReducers({
  bookmarks,
  docs,
});
