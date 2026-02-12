import { RNToasty } from 'react-native-toasty';
import http from './../../services/api';
import { COMPANY_DATA, FAQ, HOME_DATA, NOTIFICATION, NOTIFICATION_COUNT, USER_STATE } from './../types';

export const GetHomeDataApi = (cb) => async (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const url = userstate == "Services" ? `homePage` : `eCommerce/homePage`

  cb && cb(true);
  http.get(url)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: HOME_DATA,
          payload: response.data.data,
        });
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};


export const GetCompanyDetailsApi = (cb) => async dispatch => {
  cb && cb(true);
  http.get('get/company')
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: COMPANY_DATA,
          payload: response.data.data,
        });
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const GetFaqApi = (navigation, cb) => async dispatch => {
  cb && cb(true);
  http.get('getAllFAQ')
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: FAQ,
          payload: response.data.data,
        });
        navigation?.navigate('FAQ')
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const GetNotificationApi = (cb) => async (dispatch, getState) => {
  const { getuser } = getState().auth

  cb && cb(true)
  http.get(`getByUserId/${getuser?._id}?userType=CUSTOMER`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: NOTIFICATION,
          payload: response.data.data,
        })
        cb && cb(false)
      } else {
        cb && cb(false)
      }
    })
    .catch(error => {
      cb && cb(false)
    })
};

export const ReadNotificationApi = (cb) => async (dispatch, getState) => {
  const { getuser } = getState().auth

  cb && cb(true)
  http.get(`seenCount/${getuser?._id}?userType=CUSTOMER`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: NOTIFICATION_COUNT,
          payload: response.data,
        })
        cb && cb(false)
      } else {
        cb && cb(false)
      }
    })
    .catch(error => {
      cb && cb(false)
    })
};