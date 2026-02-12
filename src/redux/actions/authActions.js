import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNToasty } from 'react-native-toasty';
import http from './../../services/api';
import { AUTH_TOKEN, GET_ALL_CARTS, GET_USER } from '../types';
import objectToFormData from '../../services/objectToFormData';
import { GetAllCartcustomerIdApi, GetAllCouponApi } from './cartAction';
import { formDataHeaders } from '../../services/formDataHeaders';
import { GetCompanyDetailsApi, GetNotificationApi, ReadNotificationApi } from './homeActions';
import { GetAllOrdersApi } from './orderAction';


export const AuthFunction = () => dispatch => {
  dispatch({
    type: AUTH_TOKEN,
    payload: 's',
  });
};

export const InicialCall = () => async (dispatch, getState) => {
  const {token, customerId} = getState().auth
  if(token){
    dispatch(GetuserIdApi())
    dispatch(GetAllOrdersApi())
    dispatch(GetAllCartcustomerIdApi())
  }
  if(customerId){
    dispatch(GetAllCartcustomerIdApi())
  }
  dispatch(ReadNotificationApi())
  dispatch(GetCompanyDetailsApi())
  dispatch(GetAllCouponApi())
 
};

export const LogoutApi = () => dispatch => {
  dispatch({
    type: AUTH_TOKEN,
    payload: null,
  });
  dispatch({
    type: GET_USER,
    payload: null,
  });
  dispatch({
    type: GET_ALL_CARTS,
    payload: null,
  });
  AsyncStorage.removeItem('@USER_TOKEN');
  // RNToasty.Normal({
  //   title: 'LogOut Successful',
  // });
};
export const LoginApi = (postData, navigation, cb) => dispatch => {
  // console.log("LoginApi postdata : ", postData)
  cb && cb(true);
  http.post('login/customer', postData)
    .then(async response => {
      console.log('response.data?.data?.token', response.data?.data?.token);
      if (response?.data?.success) {
        dispatch({
          type: GET_USER,
          payload: response.data.data,
        });
        dispatch({
          type: AUTH_TOKEN,
          payload: response?.data?.data?.token,
        });
        await AsyncStorage.setItem('@USER_TOKEN', response?.data?.data?.token);
        await AsyncStorage.setItem("@USER_ID", response.data?.data?._id)
        // RNToasty.Success({
        //   title: response?.data?.message
        // })
        cb && cb(false);
        dispatch(InicialCall());
      } else {
        // RNToasty.Info({
        //   title: response?.data?.message
        // })
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
      console.log("login : ", error?.response?.data)
      RNToasty.Error({
          title: error?.response?.data?.message
        })
    });
};

export const SignUpApi = (postData, navigation, cb) => dispatch => {
  cb && cb(true);
  http
    .post('register', postData)
    .then(async response => {
      // console.log('response token', response.data?.data?.token);
      if (response.data) {
        dispatch({
          type: AUTH_TOKEN,
          payload: response.data?.data?.token,
        });
        dispatch({
          type: GET_USER,
          payload: response?.data?.data,
        });
        await AsyncStorage.setItem('@USER_TOKEN', response.data?.data?.token);
        await AsyncStorage.setItem("@USER_ID", response.data?.data?._id)
        dispatch(InicialCall());
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const OTPApi = (postData, navigation, check, cb) => async dispatch => {
  cb && cb(true);
  http
    .post('sendOtp', {
      phoneNumber: postData.phoneNumber,
      check: check,
    })
    .then(async response => {
      console.log("OTPApi error : ", response?.data)
      if (response.data?.success) {
        navigation?.navigate('Varification', {
          data: postData,
          check: check,
          otp: response.data.otp,
        });
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
      console.log("OTPApi error : ", error?.response?.data?.message)
      if (error?.response?.data?.message == 'User Not Found') {
        navigation?.navigate('SignUp', { phoneno: postData?.phoneNumber, email: postData?.email });
      }
    });
};
export const GetuserIdApi = (cb) => async (dispatch, getState) => {
  const { getuser } = getState().auth;
  const userId = await AsyncStorage.getItem("@USER_ID")
  
  cb && cb(true);
  http.get(`getUserById/${userId}`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_USER,
          payload: response.data?.data,
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

export const UpdateProfileApi = (postData, navigation, cb) => async (dispatch, getState) => {
  const { getuser } = getState().auth;
  console.log('UpdateProfileApi : ',postData);

  postData = objectToFormData(postData)

  cb && cb(true);
  http.put(`updateUser/${getuser?._id}`, postData, formDataHeaders)
    .then(async response => {
      if (response.data.success) {
        dispatch(GetuserIdApi())
        // RNToasty.Success({
        //   title: response?.data?.message
        // })
        navigation?.goBack()
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
      console.log('UpdateProfileApi error : ',error?.response);
      RNToasty.Error({
        title: error?.response?.data?.message
      })
    });
};
