import { Alert } from "react-native"
import base64 from "react-native-base64"
import uuid from 'react-native-uuid';
import { sha256 } from "./sha256.service"
import PhonePePaymentSDK from 'react-native-phonepe-pg'

export const PhonepeCheckoutService = (body, responseCallBack) => {

    if (!body.merchantId) {
        Alert.alert("Error", "Merchant Id is required")
        return
    }
    else if (!body.amount) {
        Alert.alert("Error", "Merchant Amount is required")
        return
    }
    else if (!body.callbackUrl) {
        Alert.alert("Error", "Callback URL is required")
        return
    }
    else if (!body.saltKey) {
        Alert.alert("Error", "Salt Key is required")
        return
    }
    else if (!body.saltIndex) {
        Alert.alert("Error", "Salt Index is required")
        return
    }
    else if (!body.merchantUserId) {
        Alert.alert("Error", "Merchant User Id is required")
        return
    }
    else {

        let selfGeneratedMerchantTransactionId = uuid.v4().slice(0, 24)
        let requestPayload = {
            "merchantId": body.merchantId,
            "merchantTransactionId": selfGeneratedMerchantTransactionId,
            "merchantUserId": body.merchantUserId,
            "amount": body.amount * 100,
            "redirectUrl": body.callbackUrl,
            "callbackUrl": body.callbackUrl,
            "redirectMode": "REDIRECT",
            "paymentInstrument": {
                "type": "PAY_PAGE"
            }
        }

        let base64Data = base64.encode(JSON.stringify(requestPayload))
        let xVerify = sha256(base64Data + "/pg/v1/pay" + body.saltKey) + "###" + body.saltIndex

        PhonePePaymentSDK.startTransaction(
            base64Data,
            xVerify,
            body.packageName || null,
            null
        ).then(result => {
            checkPaymentStatus(selfGeneratedMerchantTransactionId)
            responseCallBack({ ...result, funcStatus: true, merchantTransactionId: selfGeneratedMerchantTransactionId })
        })
            .catch(error => {
                responseCallBack({ ...error, funcStatus: false, merchantTransactionId: selfGeneratedMerchantTransactionId })
            })
    }
}

const checkPaymentStatus = async (merchantTransactionId) => {
    try {
      const response = await fetch('https://api.phonepe.com/v3/checkPaymentStatus', {
        method: 'POST', // Check if PhonePe API expects POST or GET
        headers: {
          'Content-Type': 'application/json',
          // Add authentication headers if required by the API
          'Authorization': 'Bearer YOUR_ACCESS_TOKEN', 
        },
        body: JSON.stringify({
          merchantTransactionId: merchantTransactionId,
        }),
      });

      const result = await response.json();
      console.log("checkPaymentStatus result : ", result)
      // Assuming the API returns a status field in the response
    //   setPaymentStatus(result.status);
    } catch (error) {
      console.log('Error checking payment status:', error);
    //   setPaymentStatus('Error fetching status');
    }
  };