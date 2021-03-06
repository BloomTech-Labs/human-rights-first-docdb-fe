import {
  SET_BOOKMARKS,
  BOOKMARKS,
  SAVE_BOOKMARKS,
  REMOVE_BOOKMARKS,
} from '../actions/bookmarks';

const initialState = {
  bookmarkedDocs: [],
};

export const bookmarksReducer = (state = initialState, action) => {
  const { payload, type } = action;
  switch (type) {
    case BOOKMARKS:
      return { ...state, pageType: 'bookmarks' };
    case SAVE_BOOKMARKS:
      return { ...state, bookmarkedDocs: [...state.bookmarkedDocs, payload] };
    case REMOVE_BOOKMARKS:
      return {
        ...state,
        bookmarkedDocs: state.bookmarkedDocs.filter(id => id !== payload),
      };
    case SET_BOOKMARKS:
      return { ...state, bookmarkedDocs: payload };
    default:
      return state;
  }
};

export default bookmarksReducer;
