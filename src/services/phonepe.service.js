import {Alert} from 'react-native';

import PhonePePaymentSDK from 'react-native-phonepe-pg';
import http, {INITIATE_PAYMENT_API, PHONEPE_MERCHANT_ID} from './api';

export const PhonepeCheckoutService = async (body, responseCallBack) => {
  if (!PHONEPE_MERCHANT_ID) {
    Alert.alert('Error', 'Merchant Id is required');
    return;
  }

  try {
    // 1. Initiate Payment on Backend to get Checksum and Base64 Body
    const initiateResponse = await http.post(INITIATE_PAYMENT_API, {
      amount: body.amount,
      mobileNumber: body.mobileNumber,
      userId: body.userId,
    });

    if (!initiateResponse.data || !initiateResponse.data.success) {
      Alert.alert(
        'Error',
        initiateResponse.data.message || 'Failed to initiate payment',
      );
      return;
    }

    const {base64Body, checksum, merchantTransactionId} = initiateResponse.data;

    // 2. Start Transaction with SDK
    PhonePePaymentSDK.startTransaction(
      base64Body,
      checksum,
      body.packageName || null,
      null,
    )
      .then(result => {
        checkPaymentStatus(merchantTransactionId);
        responseCallBack({
          ...result,
          funcStatus: true,
          merchantTransactionId: merchantTransactionId,
        });
      })
      .catch(error => {
        responseCallBack({
          ...error,
          funcStatus: false,
          merchantTransactionId: merchantTransactionId,
        });
      });
  } catch (error) {
    console.log('PhonePe Initiation Error', error);
    Alert.alert('Error', 'Failed to initiate payment flow');
    responseCallBack({
      funcStatus: false,
    });
  }
};

const checkPaymentStatus = async merchantTransactionId => {
  try {
    const response = await fetch(
      'https://api.phonepe.com/v3/checkPaymentStatus',
      {
        method: 'POST', // Check if PhonePe API expects POST or GET
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if required by the API
          Authorization: 'Bearer YOUR_ACCESS_TOKEN',
        },
        body: JSON.stringify({
          merchantTransactionId: merchantTransactionId,
        }),
      },
    );

    const result = await response.json();
    console.log('checkPaymentStatus result : ', result);
    // Assuming the API returns a status field in the response
    //   setPaymentStatus(result.status);
  } catch (error) {
    console.log('Error checking payment status:', error);
    //   setPaymentStatus('Error fetching status');
  }
};
