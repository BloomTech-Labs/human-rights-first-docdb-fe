import {
  SET_DOCS,
  START_FETCH,
  FINISH_FETCH,
  THUMBNAIL,
  LIST_VIEW,
  HANDLE_MODAL,
  SET_DOC_TAGS,
  UPDATE_DOC_TAGS,
  DELETE_DOC_TAG,
  SET_PAGE,
} from '../actions/docs';

const initialState = {
  docs: [],
  totalDocsCount: 0,
  isFetching: false,
  cardView: true,
  openModal: false,
  docTags: {
    file_id: '',
    tags: [],
  },
  pageType: 'searchOnly',
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
    case HANDLE_MODAL:
      return { ...state, openModal: !state.openModal };
    case SET_DOC_TAGS:
      return {
        ...state,
        docTags: payload,
      };
    case UPDATE_DOC_TAGS:
      return {
        ...state,
        docTags: {
          ...state.docTags,
          tags: [...state.docTags.tags, payload],
        },
      };
    case DELETE_DOC_TAG:
      return {
        ...state,
        docTags: {
          ...state.docTags,
          tags: state.docTags.tags.filter(tag => tag !== payload),
        },
      };
    case SET_PAGE:
      return { ...state, pageType: payload };
    default:
      return state;
  }
};
