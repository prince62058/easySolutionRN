import { StyleSheet, Text, View, ActivityIndicator, Modal, Alert } from 'react-native';
import React, { useState } from 'react';
import WebView from 'react-native-webview';
import { COLORS } from '../../constants';
import { useDispatch } from 'react-redux';
import { CheckTransactionStatusApi } from '../../redux/actions/orderAction';



const PhonePayView = ({ successCallback, errorCallback, url, visible, orderId }) => {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch()

  const transactionCallBack = (data) => {
    if (data?.loading) {
      setLoading(true);
    } else {
      setLoading(false);
    }
    console.log("transactionCallBack : ", data)

    if (data?.canGoBack) {
      dispatch(CheckTransactionStatusApi(orderId, (loader, success, data) => {
        if(success == "success"){
          successCallback && successCallback(data);
        }else if(success == "info" || success == "error"){
          errorCallback && errorCallback(data);
        }
      }))
      // successCallback && successCallback();
    } 
    // Check for success and failure URLs
    // if (data?.canGoBack) {
    //   successCallback && successCallback();
    //   // navigation.goBack();
    // } else if (data?.url.includes('failure')) {
    //   errorCallback && errorCallback();
    // };


  }


  return (
    <Modal
      visible={visible}
      style={{ margin: 0 }}
      onRequestClose={() => {
        Alert.alert(
          'Are you sure you want to cancel the payment?',
          'Your transaction will be canceled',
          [
            {
              text: 'Cancel',
              onPress: () => console.log('Cancel Pressed'),
              style: 'cancel',
            },
            { text: 'OK', onPress: errorCallback },
          ]
        );
      }}
    >
      {visible && url && (
        <WebView
          style={styles.webview}
          source={{ uri: url }}
          onNavigationStateChange={(e) => transactionCallBack(e)}
          renderLoading={() => (
            <View style={styles.box}>
              <ActivityIndicator size={'large'} color={COLORS.primary} />
            </View>
          )}
          startInLoadingState={true}
        />
      )}
    </Modal>
  );
};

export default PhonePayView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  box: {
    flex: 1,
    justifyContent: 'center', // center the loader in the screen
    alignItems: 'center',
  },
});
