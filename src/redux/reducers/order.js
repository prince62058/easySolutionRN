import { ORDER_DATA, REVIEW_DATA, SINGLE_ORDER, USER_STATE } from '../types';

const initialState = {
  orderData: null,
  singleOrder: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ORDER_DATA:
      return {
        ...state,
        orderData: action.payload,
      };
    case SINGLE_ORDER:
      return {
        ...state,
        singleOrder: action.payload,
      };
    
    default:
      return state;
  }
};
