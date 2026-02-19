import { DEFAULT_ADDRESS, USER_STATE} from '../types';

const initialState = {
    userstate: 'Services', //switch product service
    defaultAddress: null
};

export default (state = initialState, action) => {
  switch (action.type) {
    case USER_STATE:
      return {
        ...state,
        userstate: action.payload,
      };
      case DEFAULT_ADDRESS:
      return {
        ...state,
        defaultAddress: action.payload,
      };
    default:
      return state;
  }
};
