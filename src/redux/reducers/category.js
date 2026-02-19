import {
  GET_PARENT_CATEGORIES,
  GET_SUB_CATEGORIES,
  GET_BYPRODUCT_ID,
  SEARCH_DATA,
  ALL_REVIEW,
} from './../types';

const initialState = {
  getParentCategory: null,
  getsubCategory: null,
  getbyProductid: null,
  searchData: null,
  allReview: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_PARENT_CATEGORIES:
      return {
        ...state,
        getParentCategory: action.payload,
      };
    case GET_SUB_CATEGORIES:
      return {
        ...state,
        getsubCategory: action.payload,
      };
    case GET_BYPRODUCT_ID:
      return {
        ...state,
        getbyProductid: action.payload,
      };
    case SEARCH_DATA:
      return {
        ...state,
        searchData: action.payload,
      };
      case ALL_REVIEW:
      return {
        ...state,
        allReview: action.payload,
      };

    default:
      return state;
  }
};
