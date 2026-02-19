import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {GET_ADDRESS_BYUSERID, GET_ADDRESS_BYID, } from './../types';

export const CreateAddressApi = (post, navigation, cb) => async (dispatch, getState) => {
  console.log('post', post);
  const {userstate} = getState().blacklist;
  const url = userstate == "Services" ? `servicesCreateAddress` :  `createAddress`
   
  cb && cb(true);
  http.post(`createAddress`, post)
    .then(async response => {
      if (response.data.success) {
        dispatch(GetAddressByUserIdApi())
        navigation && navigation?.goBack();
        // console.log('success');
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const UpdateAddressApi = (id, post, navigation, cb) => async (dispatch, getState) => {
  // console.log('post', post);
  const {userstate} = getState().blacklist;
  const url = userstate == "Services" ? `servicesUpdateAddress/${id}` :  `updateAddress/${id}`
   
  cb && cb(true);
  http.put(`updateAddress/${id}`, post)
    .then(async response => {
      if (response.data.success) {
        dispatch(GetAddressByUserIdApi())
        navigation?.goBack();
        RNToasty.Success({
          title: response?.data?.message
        })
        // console.log('success');
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const DeleteAddressApi = (id, cb) => async (dispatch, getState) => {
  // console.log('post', post);
  const {userstate} = getState().blacklist;
  const url = userstate == "Services" ? `servicesDeleteAddress/${id}` :  `deleteAddress/${id}`
   
  cb && cb(true);
  http.delete(`deleteAddress/${id}`)
    .then(async response => {
      if (response.data.success) {
        dispatch(GetAddressByUserIdApi())
        // RNToasty.Success({
        //   title: response?.data?.message
        // })
        // console.log('success');
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const GetAddressByUserIdApi = cb => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  const {userstate} = getState().blacklist;
  const url = userstate == "Services" ? `servicesGetAllAddressByCustomerId/${getuser?._id}` : `getAllAddressByCustomerId/${getuser?._id}`
  
  cb && cb(true);
  http.get(`getAllAddressByCustomerId/${getuser?._id}`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_ADDRESS_BYUSERID,
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

export const GetAddressByIdApi = (id, navigation, cb) => async (dispatch, getState)  => {
  const {userstate} = getState().blacklist;
  const url = userstate == "Services" ? `servicesGetByAddressId/${id}` : `getByAddressId/${id}`
 
  cb && cb(true);
  http.get(`getByAddressId/${id}`)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_ADDRESS_BYID,
          payload: response.data.data,
        });
        navigation?.goBack()
        // navigation?.navigate('SetTime');
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};
