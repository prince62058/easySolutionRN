import {RNToasty} from 'react-native-toasty';
import http from './../../services/api';
import {ORDER_DATA, SINGLE_ORDER} from './../types';
import {GetAllCartcustomerIdApi} from './cartAction';
import {GetNotificationApi} from './homeActions';

export const CreateOrderApi = (post, cb) => async (dispatch, getState) => {
  const {userstate} = getState().blacklist;
  const url = userstate == 'Services' ? `createOrder` : `eCommerce/createOrder`;

  console.log(
    'CreateOrderApi initiating POST to:',
    url,
    'with data:',
    JSON.stringify(post, null, 2),
  );
  cb && cb(false, '', true);
  http
    .post(url, post)
    .then(async response => {
      console.log(
        'CreateOrderApi success response:',
        JSON.stringify(response?.data, null, 2),
      );
      if (response.data.success) {
        dispatch(GetAllOrdersApi());
        dispatch(GetAllCartcustomerIdApi());
        // navigation?.goBack();
        // RNToasty.Success({
        //   title: response.data.message
        // })

        cb && cb(true, response?.data?.data?._id, false);
      } else {
        RNToasty.Info({
          title: response.data.message,
        });
        cb && cb(false, '', false);
      }
    })
    .catch(error => {
      console.error(
        'CreateOrderApi error catch:',
        error?.response?.data || error.message,
      );
      cb && cb(false, '', false);
      RNToasty.Error({
        title: error?.response?.data?.message || error.message,
      });
    });
};

export const UpdatetransactionIdApi =
  (orderId, transactionId, cb) => async (dispatch, getState) => {
    const {userstate} = getState().blacklist;
    const url =
      userstate == 'Services'
        ? `updateTransactionId/${orderId}`
        : `eCommerce/updateTransitionId/${orderId}`;

    // console.log("UpdatetransactionIdApi enter : ", orderId, transactionId)

    cb && cb(false, true);
    http
      .put(url, {transactionId: transactionId})
      .then(async response => {
        // console.log("UpdatetransactionIdApi res : ", response?.data)
        if (response?.data?.success) {
          dispatch(GetAllOrdersApi());
          // RNToasty.Success({
          //   title: response.data.message
          // })
          cb && cb(true, false);
        } else {
          dispatch(GetAllOrdersApi());
          RNToasty.Info({
            title: response.data.message,
          });
          cb && cb(false, false);
        }
      })
      .catch(error => {
        dispatch(GetAllOrdersApi());
        cb && cb(false, false);
        RNToasty.Error({
          title: error?.response?.data?.message,
        });
      });
  };

export const CancelBookingApi =
  (orderId, postData, cb) => async (dispatch, getState) => {
    const {getuser} = getState().auth;
    const {userstate} = getState().blacklist;
    const url =
      userstate == 'Services'
        ? `cancelOrder/${orderId}/${getuser?._id}`
        : `eCommerce/cancelOrder/${orderId}`;

    // console.log("CancelBookingApi enter : ", orderId, postData)

    cb && cb(false, true);
    http
      .put(url, postData)
      .then(async response => {
        // console.log("CancelBookingApi res : ", response?.data)
        if (response?.data?.success) {
          dispatch(GetAllOrdersApi());
          RNToasty.Success({
            title: response?.data?.message,
          });
          cb && cb(true, false);
        } else {
          // RNToasty.Info({
          //   title: response.data.message
          // })
          cb && cb(false, false);
        }
      })
      .catch(error => {
        cb && cb(false, false);
        console.log('CancelBookingApi error : ', error?.response?.data);
        // RNToasty.Error({
        //   title: error?.response?.data?.message
        // })
      });
  };

export const GetAllOrdersApi = (page, cb) => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  const {orderData} = getState().order;
  const {userstate} = getState().blacklist;
  const url =
    userstate == 'Services'
      ? `getAllOrderByCostomerId/${getuser?._id}`
      : `eCommerce/getOrderByCustomerId/${getuser?._id}`;

  cb && cb(true);
  http
    .get(url, {
      params: {
        page: page || 1,
      },
    })
    .then(async response => {
      if (response.data.success) {
        if (page > 1 && page < 10) {
          dispatch({
            type: ORDER_DATA,
            payload: [...orderData, ...response?.data?.data],
          });
        } else {
          dispatch({
            type: ORDER_DATA,
            payload: response.data.data,
          });
        }

        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const GetOrderByIdApi =
  (id, pId, navigation, cb, uri, type) => async (dispatch, getState) => {
    const {userstate} = getState().blacklist;
    const url =
      userstate == 'Services'
        ? `getOrderByOrderId/${id}`
        : `eCommerce/getByOrderId/${id}`;

    cb && cb(true);
    http
      .get(uri ? uri : url)
      .then(async response => {
        console.log('GetOrderByIdApi res : ', response?.data?.data);
        if (response.data.success) {
          dispatch({
            type: SINGLE_ORDER,
            payload: response.data.data,
          });
          if (type == 'Services') {
            navigation &&
              navigation.navigate('Invoice', {
                data: response?.data?.data,
                pId: pId || response?.data?.data?.product?.[0]?._id,
              });
          } else {
            navigation &&
              navigation?.navigate('OrderDetail', {
                pId: pId || response?.data?.data?.product?.[0]?._id,
              });
          }

          cb && cb(false, 'success');
        } else {
          if (type == 'Services') {
            navigation &&
              navigation.navigate('Invoice', {
                data: response?.data?.data,
                pId: pId,
              });
          } else {
            navigation && navigation?.navigate('OrderDetail', {pId: pId});
          }
          dispatch({
            type: SINGLE_ORDER,
            payload: null,
          });
          cb && cb(false);
        }
      })
      .catch(error => {
        cb && cb(false);
        dispatch({
          type: SINGLE_ORDER,
          payload: null,
        });
        navigation && navigation?.navigate('OrderDetail', {pId: pId});
      });
  };

export const SendReturnRequestApi =
  (pId, orderId, navigation, cb) => async (dispatch, getState) => {
    // ${getuser?._id}

    cb && cb(true);
    http
      .put(`eCommerce/returnRequestOrde/${orderId}?productId=${pId}`)
      .then(async response => {
        if (response.data.success) {
          dispatch(GetAllOrdersApi());
          cb && cb(false);
          RNToasty.Success({
            title: response.data.message,
            duration: 2,
          });
          navigation?.goBack();
        } else {
          // RNToasty.Info({
          //     title: response.data.message,
          //     duration: 2,
          // });
          cb && cb(false);
        }
      })
      .catch(error => {
        cb && cb(false);
        console.log('add product review error : ', error.response?.data);

        // RNToasty.Error({
        //     title: error.response?.data?.message,
        //     duration: 2,
        // });
      });
  };

export const OpenPhonepayApi = (postData, cb) => async (dispatch, getState) => {
  const {getuser} = getState().auth;
  console.log('OpenPhonepayApi postData', postData);
  cb && cb(true);
  http
    .post(`PhonePayGateway`, postData)
    .then(async response => {
      console.log(
        'PhonePayGateway res : ',
        response?.data,
        response?.data?.data?.data?.instrumentResponse?.redirectInfo,
      );
      if (response?.data?.success) {
        cb && cb(false, response?.data);
        RNToasty.Success({
          title: response.data.message,
        });
      } else {
        RNToasty.Info({
          title: response.data.message,
        });
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
      console.log(
        'PhonePayGateway error ..................: ',
        error.response?.data,
      );

      RNToasty.Error({
        title: error.response?.data?.message,
      });
    });
};

export const CheckTransactionStatusApi =
  (id, cb) => async (dispatch, getState) => {
    cb && cb(true);
    http
      .get(`PhonePayGatewayCheckStatus?merchantTransactionId=${id}`)
      .then(async response => {
        console.log('CheckTransactionStatusApi res : ', response?.data);
        if (response?.data?.success) {
          // dispatch(GetAllOrdersApi())
          cb && cb(false, 'success', response?.data);
          RNToasty.Success({
            title: response.data.message,
          });
        } else {
          // RNToasty.Info({
          //   title: response.data.message,
          // });
          cb && cb(false, 'info', response?.data);
        }
      })
      .catch(error => {
        cb && cb(false, 'error', error?.response?.data);
        console.log('CheckTransactionStatusApi error : ', error.response?.data);

        RNToasty.Error({
          title: error?.response?.data?.message,
        });
      });
  };
