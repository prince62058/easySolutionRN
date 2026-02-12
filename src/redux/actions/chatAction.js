import AsyncStorage from '@react-native-async-storage/async-storage';
import { RNToasty } from 'react-native-toasty';
import http from './../../services/api';
import { GET_CHAT_MSG,} from './../types';
import { formDataHeaders } from '../../services/formDataHeaders';
import objectToFormData from '../../services/objectToFormData';

export const GetThreadIdApi = (cb) => async dispatch => {
    cb && cb(true, null)
    const userId = await AsyncStorage.getItem("@USER_ID")
    // console.log("GetThreadIdApi : ", userId)

    http.get(`getYourThreadId/${userId}?userType=USER`)
        .then(async response => {
            // console.log("GetThreadIdApi res : ", response?.data)
            if (response?.data?.success) {
                cb && cb(false, response?.data)
            } else {
                cb && cb(false, null)
            }
        })
        .catch(error => {
            cb && cb(false, null)
        })
};


export const GetMsgApi = (threadId, cb) => async dispatch => {
    cb && cb(true)
    const userId = await AsyncStorage.getItem("@USER_ID")

    // console.log("GetMsgApi : ", threadId)

    http.get(`getChatFromThreadId/${threadId}`)
        .then(async response => {
            // console.log("GetMsgApi res : ", response?.data)
            if (response?.data?.success) {
                // dispatch({
                //     type: GET_CHAT_MSG,
                //     payload: response?.data?.data
                // })
                // RNToasty.Success({
                //     title: response?.data.message,
                //     position: 'top',
                //     duration: 2
                // })
                cb && cb(false, response?.data)
            } else {
                // RNToasty.Info({
                //     title: response?.data?.message,
                //     position: 'top',
                //     duration: 2
                // })
                cb && cb(false)
            }
        })
        .catch(error => {
            cb && cb(false)
            // dispatch({
            //     type: GET_CHAT_MSG,
            //     payload: null
            // })
            console.log("GetMsgApi error : ", error?.response?.data)
            // RNToasty.Error({
            //     title: error?.response?.data?.message,
            //     position: 'top',
            //     duration: 2
            // })
        })
};


export const SendMsgApi = (postData, cb) => async dispatch => {
    cb && cb(true)
    // console.log("SendMsgApi : ", postData)
    postData = objectToFormData(postData)
    
    http.post(`createMessage`, postData, formDataHeaders)
        .then(async response => {
            // console.log("SendMsgApi res: ", response?.data)
            if (response?.data?.success) {
                // RNToasty.Success({
                //     title: response.data.message,
                //     position: 'top',
                //     duration: 2
                // })
                cb && cb(false, response?.data)
            } else {
                // RNToasty.Info({
                //     title: response.data.message,
                //     position: 'top',
                //     duration: 2
                // })
                cb && cb(false)
            }
        })
        .catch(error => {
            cb && cb(false)
           
            // RNToasty.Error({
            //     title: error.response.data.message,
            //     position: 'top',
            //     duration: 2
            // })
        })
};

export const GetSupportQuestionsApi = (cb) => async dispatch => {
    cb && cb(true, null)
    const userId = await AsyncStorage.getItem("@USER_ID")
    // console.log("GetSupportQuestionsApi : ", userId)

    http.get(`getAllQuestion?disable=false`)
        .then(async response => {
            // console.log("GetSupportQuestionsApi res : ", response?.data)
            if (response?.data?.success) {
                cb && cb(false, response?.data)
            } else {
                cb && cb(false, null)
            }
        })
        .catch(error => {
            cb && cb(false, null)
        
        })
};