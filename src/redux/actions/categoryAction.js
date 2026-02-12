import { RNToasty } from 'react-native-toasty';
import http from './../../services/api';
import {
  GET_PARENT_CATEGORIES,
  GET_SUB_CATEGORIES,
  GET_BYPRODUCT_ID,
  SEARCH_DATA,
  ALL_REVIEW,
} from './../types';

export const GetParentCategoryApi = (id, navigation, cb) => (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const url = userstate == "Services" ? `getCategoryWithPcategoryByUser/${id}` : `eCommerce/getCategoryWithPcategoryByUser/${id}`

  console.log("GetParentCategoryApi id : ", id);
  cb && cb(true);
  http
    .get(url)
    .then(async response => {
      if (response.data?.success) {
        dispatch({
          type: GET_PARENT_CATEGORIES,
          payload: response.data.data,
        });
        // RNToasty.Success({
        //   title: response?.data?.message
        // })
        navigation && navigation?.navigate('HomeServices');
        cb && cb(false);
      } else {
        // RNToasty.Info({
        //   title: response?.data?.message
        // })
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
      // RNToasty.Error({
      //   title: error?.response?.data?.message
      // })
    });
};

export const GetSubCategoryApi = (id, cb) => (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const url = userstate == "Services" ? `getProductBySubCategory/${id}` : `eCommerce/getProductBySubCategory/${id}`
  cb && cb(true);
  http
    .get(url)
    .then(async response => {
      // console.log("GetSubCategoryApi res : ", response.data)
      if (response.data.success) {
        dispatch({
          type: GET_SUB_CATEGORIES,
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

export const GetByProductIdApi = (id, navigation, cb) => (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const url = userstate == "Services" ? `getByProductId/${id}` : `eCommerce/getByProductId/${id}`
  cb && cb(true);
  http
    .get(url)
    .then(async response => {
      if (response.data.success) {
        dispatch({
          type: GET_BYPRODUCT_ID,
          payload: response.data,
        });
        navigation?.navigate('ServiceDetail');
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};

export const SearchApi = (page, title, cb) => (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const { searchData } = getState().category;
  const url = userstate == "Services" ? `searchServices` : `searchProducts`

  cb && cb(true);
  http.get(url, {
    params: {
      page: page || 1,
      search: title || ''
    }
  })
    .then(async response => {
      if (response.data.success) {
        if (page > 1 && page < 10) {
          dispatch({
            type: SEARCH_DATA,
            payload: [...searchData, ...response.data?.data?.services],
          })
        } else {
          if (page == 1) {
            dispatch({
              type: SEARCH_DATA,
              payload: response.data?.data?.services,
            })
          }
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

export const AddReviewApi = (postData, navigation, cb) => async (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const url = userstate == "Services" ? `createReview` : `eCommerce/createReview`

  // console.log('AddReviewApi postdata : ', postData)

  cb && cb(true)
  http.post(url, postData)
      .then(async response => {
          if (response.data.success) {
              // dispatch(GetCompanyDetailsApi(postData.c_id))
              navigation?.goBack()
              cb && cb(false)
              RNToasty.Success({
                  title: response.data.message,
                  duration: 2,
              });
          } else {
              // RNToasty.Info({
              //     title: response.data.message,
              //     duration: 2,
              // });
              cb && cb(false)
          }
      })
      .catch(error => {
          cb && cb(false)
          console.log("add product review error : ", error.response?.data)
          
          RNToasty.Error({
              title: error?.response?.data?.message,
              duration: 2,
          });
      })
};

export const GetAllReviewApi = (page, pId, navigation, cb) => (dispatch, getState) => {
  const { userstate } = getState().blacklist;
  const { allReview } = getState().category;
  const url = userstate == "Services" ? `getAllReviewByProductId/${pId}` : `eCommerce/getAllReviewByProductId/${pId}`

  cb && cb(true);
  http.get(url, {
    params: {
      page: page || 1,
    }
  })
    .then(async response => {
      if (response.data.success) {
        if (page > 1 && page < 10) {
          dispatch({
            type: ALL_REVIEW,
            payload: [...allReview, ...response.data?.data],
          })
        } else {
          if (page == 1) {
            dispatch({
              type: ALL_REVIEW,
              payload: response.data?.data,
            })
          }
        }
        navigation?.navigate("ProductReview")
        cb && cb(false);
      } else {
        cb && cb(false);
      }
    })
    .catch(error => {
      cb && cb(false);
    });
};
