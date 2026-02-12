import { RNToasty } from 'react-native-toasty';
import http from './../../services/api';
import { GET_COUPON, GET_ALL_CARTS, CUSTOMER_ID } from './../types';

export const CreateCartApi = (postData, cb) => (dispatch, getState) => {
  const { token } = getState().auth;
  const { userstate } = getState().blacklist;
  // const url = userstate == "Services" ? `createCart` : `eCommerce/createCart`
  const url = token ? (userstate == "Services" ? `createCart` : `eCommerce/createCart`) : (userstate == "Services" ? `createDummyCart` : `eCommerce/createDummyCart`)
  // console.log("CreateCartApi enter url : ", url, postData)

  cb && cb(false, true);
  http.post(url, postData)
    .then(async response => {
      // console.log("CreateCartApi res : ", response?.data)
      if (response.data?.success) {
        dispatch({
          type: CUSTOMER_ID,
          payload: response.data?.data?.customerId,
        });
        dispatch(GetAllCartcustomerIdApi())
        // navigation?.navigate('ServiceCart');
        RNToasty.Success({
          position: 'top',
          title: response?.data?.message,
        })
        cb && cb(true, false);
      } else {
        // RNToasty.Info({
        //   title: response?.data?.message,
        // })
        cb && cb(false, false);
      }
    })
    .catch(error => {
      cb && cb(false, false);
      console.log("create cart error : ", error?.response?.data)
      RNToasty.Error({
        title: error?.response?.data?.message,
      })
    });
};

export const GetAllCouponApi = cb => async (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const url = userstate == "Services" ? `getAllCoupon?type=CATEGORY` : `getAllCoupon?type=ECOM_CATEGORY`

  cb && cb(true);
  http.get(url)
    .then(async response => {
      // console.log("GetAllCouponApi : ", response?.data)
      if (response.data.success) {
        dispatch({
          type: GET_COUPON,
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

export const GetAllCartcustomerIdApi = (couponCode, navigation, cb) => async (dispatch, getState) => {
  const { getuser, customerId, token } = getState().auth;
  const { userstate } = getState().blacklist;

  const url = token ? (userstate == "Services" ? `getAllCartBycustomerId/${getuser?._id}` : `eCommerce/getAllCartBycustomerId/${getuser?._id}`) : (userstate == "Services" ? `getAllCartByuserId/${customerId}` : `eCommerce/getAllDummyCartBycustomerId/${customerId}`)
  // console.log('GetAllCartcustomerIdApi couponCode : ', couponCode, userstate, url,)
  console.log("GetAllCartcustomerIdApi enter url : ", url, customerId)

  cb && cb(true);
  http.get(url, {
    params: {
      couponCode: couponCode || '',
    }
  })
    .then(async response => {
      // console.log("get cart res : ", url, response.data)
      if (response.data?.success) {
        dispatch({
          type: GET_ALL_CARTS,
          payload: response.data?.data,
        });
        //  RNToasty.Success({
        //   title: response.data.message,
        // });
        cb && cb(false);
        if (couponCode) {
          if (response.data?.isSuccess) {
            RNToasty.Success({
              title: response.data?.isMessage,
            });
            navigation?.goBack()
          } else {
            RNToasty.Normal({
              title: response.data?.isMessage,
            });
          }
        }
        // cb && cb(false);
      } else {
        cb && cb(false);
        //  RNToasty.Info({
        //   title: response.data?.message,
        // });
      }
    })
    .catch(error => {
      // dispatch({
      //   type: GET_ALL_CARTS,
      //   payload: null,
      // });
      console.log("GetAllCartcustomerIdApi error : ", error?.response)
      cb && cb(false);

      // RNToasty.Error({
      //   title: error?.response?.data?.message,
      // });
    });
};


export const AddQuantityApi = id => async (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const url = userstate == "Services" ? `quantityUpdate/${id}` : `eCommerce/quantityUpdate/${id}`

  http.put(url)
    .then(async response => {
      if (response.data.success) {
        dispatch(GetAllCartcustomerIdApi());
          // RNToasty.Success({
          //   title: response.data.message,
          // });
      } else {
        // RNToasty.Info({
        //   title: response.data.message,
        // });
      }
    })
    .catch(error => {
      RNToasty.Normal({
        title: error?.response?.data?.message,
      });
    });
};

export const RemoveQuantityApi = id => async (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const url = userstate == "Services" ? `removeQuantity/${id}` : `eCommerce/removeQuantity/${id}`

  http.put(url)
    .then(async response => {
      if (response.data.success) {
        dispatch(GetAllCartcustomerIdApi());
        // RNToasty.Success({
        //   title: response.data.message,
        // });
      } else {
        // RNToasty.Info({
        //   title: response.data.message,
        // });
      }
    })
    .catch(error => {
      // RNToasty.Error({
      //   title: error.response.data.message,
      // });
    });
};

export const RemoveCartByIdApi = id => async (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const url = userstate == "Services" ? `deleteCartById/${id}` : `eCommerce/deleteCartById/${id}`

  http.delete(url)
    .then(async response => {
      if (response.data.success) {
        dispatch(GetAllCartcustomerIdApi());
        // RNToasty.Success({
        //   title: response.data.message,
        // });
      } else {
        // RNToasty.Info({
        //   title: response.data.message,
        // });
      }
    })
    .catch(error => {
      // RNToasty.Error({
      //   title: error.response.data.message,
      // });
    });
};
