import {CREATE_CARDS, GET_COUPON, GET_ALL_CARTS} from './../types';

const initialState = {
  createCart: null,
  getCoupon: null,
  getallcart: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case CREATE_CARDS:
      return {
        ...state,
        createCart: action.payload,
      };

    case GET_COUPON:
      return {
        ...state,
        getCoupon: action.payload,
      };

    case GET_ALL_CARTS:
      return {
        ...state,
        getallcart: action.payload,
      };

    default:
      return state;
  }
};
