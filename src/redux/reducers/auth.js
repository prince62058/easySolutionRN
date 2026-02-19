import { AUTH_TOKEN, CUSTOMER_ID, GET_USER, ONBOARDING } from '../types';

const initialState = {
  token: null,
  getuser: null,
  onboarding: true,
  customerId: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case AUTH_TOKEN:
      return {
        ...state,
        token: action.payload,
      };
    case GET_USER:
      return {
        ...state,
        getuser: action.payload,
      };
    case ONBOARDING:
      return {
        ...state,
        onboarding: action.payload
      }
      case CUSTOMER_ID:
        return {
          ...state,
          customerId: action.payload
        }
    default:
      return state;
  }
};
