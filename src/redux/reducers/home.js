import {COMPANY_DATA, ECOMMERCE_DATA, FAQ, HOME_DATA, NOTIFICATION, NOTIFICATION_COUNT, USER_STATE} from './../types';

const initialState = {
  getHomedata: null,
  companyData: null,
  faq: null,
  notification: null,
  notificationCount: null, 
};

export default (state = initialState, action) => {
  switch (action.type) {
    case HOME_DATA:
      return {
        ...state,
        getHomedata: action.payload,
      };
        case COMPANY_DATA:
          return {
            ...state,
            companyData: action.payload,
          };
          case FAQ:
            return {
              ...state,
              faq: action.payload,
            };
            case NOTIFICATION:
                return {
                    ...state,
                    notification: action.payload
                }
                case NOTIFICATION_COUNT:
                  return {
                      ...state,
                      notificationCount: action.payload
                  }
    default:
      return state;
  }
};
