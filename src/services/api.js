import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';
// import {getUniqueId} from 'react-native-device-info';

// export const baseURL = 'https://easysolution.backends.booksica.in/api';
// export const baseURL = 'https://api.essindiaonline.com/api';
// @ts-ignore
import {
  CLIENT_ID as ENV_CLIENT_ID,
  CLIENT_SECRET as ENV_CLIENT_SECRET,
} from '@env';

export const CLIENT_ID = ENV_CLIENT_ID;
export const CLIENT_SECRET = ENV_CLIENT_SECRET;

// export const baseURL = 'https://api.essindiaonline.com/api/';
// export const socketURL = 'https://api.essindiaonline.com/';
export const baseURL = 'https://api.essindiaonline.com/api/';
export const socketURL = 'https://api.essindiaonline.com/';
export const RAZORPAY_KEY = 'rzp_live_SBE6WZW6PxxgfF';
export const PHONEPE_MERCHANT_ID = 'M22Q3CHJHEYP0';
export const PHONEPE_ENV = 'production';
export const INITIATE_PAYMENT_API = `${baseURL}/initiate-sdk`;
export const http2 = 'https://satyakabir-bucket.sgp1.digitaloceanspaces.com/';

const http = axios.create({
  baseURL: baseURL,
  timeout: 100000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    // ApiToken: 'U0RvR2x0SEZYa0ljSzgxUkFCUHZpRUpvREFlb0FuTFBPSFA=',
  },
});
http.interceptors.request.use(
  async config => {
    const token = await AsyncStorage.getItem('@USER_TOKEN');
    if (token) config.headers.Authorization = `Bearer ${token}`;
    console.log(
      `📡 API Request: ${config.method?.toUpperCase()} ${config.baseURL}${
        config.url
      }`,
    );
    return config;
  },
  error => {
    return Promise.reject(error);
  },
);

http.interceptors.response.use(
  response => {
    console.log(
      `✅ API Response: ${response.config.method?.toUpperCase()} ${
        response.config.url
      } [${response.status}]`,
    );
    return response;
  },
  error => {
    console.log(
      `❌ API Error: ${error.config?.method?.toUpperCase()} ${
        error.config?.url
      } [${error.response?.status}]`,
    );
    console.log('Error Data:', error.response?.data);
    return Promise.reject(error);
  },
);

export default http;
