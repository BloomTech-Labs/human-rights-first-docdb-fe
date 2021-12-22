import {
  SET_DOCS,
  START_FETCH,
  FINISH_FETCH,
  THUMBNAIL,
  LIST_VIEW,
  SET_PAGE,
} from '../actions/docs';

const initialState = {
  docs: [],
  totalDocsCount: 0,
  isFetching: false,
  cardView: true,
  pageType: 'bookmarks',
};

export const docsReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case START_FETCH:
      return { ...state, isFetching: true };
    case FINISH_FETCH:
      return { ...state, isFetching: false };
    case SET_DOCS:
      return {
        ...state,
        isFetching: false,
        docs: payload.Response,
        totalDocsCount: payload.Count,
      };
    case THUMBNAIL:
      return { ...state, cardView: true };
    case LIST_VIEW:
      return { ...state, cardView: false };
    case SET_PAGE:
      return { ...state, pageType: payload };
    default:
      return state;
  }
};
