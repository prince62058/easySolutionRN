import {GET_ADDRESS_BYUSERID, GET_ADDRESS_BYID, GET_PINCODE} from '../types';

const initialState = {
  getaddressbyuserid: null,
  getaddressbyid: null,
  getpincode: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case GET_ADDRESS_BYUSERID:
      return {
        ...state,
        getaddressbyuserid: action.payload,
      };

    case GET_PINCODE:
      return {
        ...state,
        getpincode: action.payload,
      };

    case GET_ADDRESS_BYID:
      return {
        ...state,
        getaddressbyid: action.payload,
      };
    default:
      return state;
  }
};
