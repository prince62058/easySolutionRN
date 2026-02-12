import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
  BackHandler,
} from 'react-native';
import Collapsible from 'react-native-collapsible';
import RazorpayCheckout from 'react-native-razorpay';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import Modal from 'react-native-modal';
import { COLORS, icons } from '../../constants';
import { RadioButton } from 'react-native-paper';
import Button from '../../component/Button';
import { connect } from 'react-redux';
import { CheckTransactionStatusApi, CreateOrderApi, OpenPhonepayApi, UpdatetransactionIdApi } from '../../redux/actions/orderAction';
import Loader from '../../component/modalLoading';
import Icons from '../../component/Icons';
import PaymentSuccessModal from '../../component/modal/PaymentSuccessModal';
import { useFocusEffect } from '@react-navigation/native';
import { openUrl } from '../../services/fileSystem';
// import { PhonepeCheckoutTouch } from 'react-native-phonepesdk';
import PhonePayView from '../../component/PhonePayView';
import { RNToasty } from 'react-native-toasty';
const { height, width } = Dimensions.get('window');

const Payment = ({ route, navigation, CheckTransactionStatusApi, OpenPhonepayApi, CreateOrderApi, getallcart, UpdatetransactionIdApi, getuser }) => {
  const [radio, setRadio] = useState(1);
  const [loading, setLoading] = useState(false);
  const [orderId, setOrderId] = useState();
  const [paymentModal, setPaymentModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);


  // console.log("payment post : ", route?.params?.data)
  navigation?.setOptions({

    headerLeft: () => (
      <TouchableOpacity style={styles.back_btn} onPress={() => orderId ? navigation?.navigate("Booking") : navigation?.goBack()}>
        <Icons name={'back'} size={width * .08} color={COLORS.black} />
      </TouchableOpacity>
    ),
  })

  const backAction = () => {
    if (orderId) {
      navigation?.navigate("Booking")
    } else {
      navigation?.goBack()
    }
    return true;
  };

  useFocusEffect(
    React.useCallback(() => {
      const backHandler = BackHandler.addEventListener('hardwareBackPress', backAction,);
      return () => backHandler.remove();
    }, [orderId])
  );


  const Rozarpayonline = () => {
    CreateOrderApi({ ...route?.params?.data, "paymentMethod": 'ONLINE' }, (res, id, data) => {
      setLoading(data)
      if (res) {
        setOrderId(id)
        var options = {
          description: 'Credits towards consultation',
          image: 'https://easysolution.booksica.in/static/media/logo.f33c4633b780f8cf8053.png',
          currency: 'INR',
          key: 'rzp_live_aKsK39078JVDks',
          amount: Number(route?.params?.data?.orderTotal) * 100,
          name: 'Easy Solution Services',
          // order_id: id,
          prefill: {
            email: getuser?.email || '',
            // contact: singleOrder?.address?.mobile || '',
            name: getuser?.name || ''
          },
          theme: COLORS.primary,
        };
        RazorpayCheckout.open(options)
          .then(data => {
            // handle success
            UpdatetransactionIdApi(id, data.razorpay_payment_id, (res, data) => { setModalVisible(res), setLoading(data) })
            console.log(`Success: ${data.razorpay_payment_id}`);
          })
          .catch(error => {
            // handle failure
            console.log(`Error: ${error.code} | ${error.description}`);
          });
      }
    })
  };





  const PaymentFun = () => {


    CreateOrderApi({ ...route?.params?.data, "paymentMethod": 'ONLINE' }, (res, id, data) => {
      setLoading(data);

      // console.log(' data id...................', res)
      if (res) {
        setOrderId(id);

        const orderData = {
          orderId: id,
          amount: route?.params?.data?.orderTotal,
          userId: getuser?._id,
          mobileNumber: getuser?.phoneNumber,
        };

        OpenPhonepayApi(orderData, (cl, response) => {
          const paymentUrl = response?.data?.data?.instrumentResponse?.redirectInfo?.url;
          if (response?.success && paymentUrl) {
            setPaymentUrl(paymentUrl);
            setPaymentModal(true);
          } else if (!cl) {
            console.error('Failed to get payment URL');
          }
        });
      }
    });
  };

  const successPaymentCB = () => {
    setPaymentModal(false);
    setPaymentUrl(null);
    setModalVisible(true);
  };

  const errorPaymentCB = () => {
    setPaymentModal(false);
    setPaymentUrl(null);
    setModalVisible(true);
    // Handle error case
  };


  return (
    <ScrollView style={styles.container}>
      <Loader loading={loading} />
      <View>
        {getallcart?.cartData?.length &&
          <View style={[styles.box2]}>
            <Text style={styles.text1}>
              {getallcart?.cartData?.length} Product , ₹{route?.params?.data?.netAmount} In this Product for Buy Now
            </Text>
          </View>
        }

        <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => {
            setRadio(1)
          }}
          style={styles.pymentBox}>
          <Image source={icons.Online} style={styles.pymtIcon} />
          <Text style={styles.pymtname}>Online</Text>
          <View style={styles.radioBox}>
            {radio === 1 && <Text style={styles.radioInner}></Text>}
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          activeOpacity={0.7}
          onPress={() => setRadio(2)}
          style={styles.pymentBox}>
          <Image source={icons.cashon} style={styles.pymtIcon} />
          <Text style={styles.pymtname}> Cash On Delivery</Text>
          <View style={styles.radioBox}>
            {radio === 2 && <Text style={styles.radioInner}></Text>}
          </View>
        </TouchableOpacity> */}



        {radio === 1 && (
          <Button
            t1={'Continue'}
            t2={styles.btn}
            onPress={Rozarpayonline}
            // onPress={PaymentFun}
          />
        )}

        {paymentUrl && (
          <PhonePayView
            orderId={orderId}
            visible={paymentModal}
            url={paymentUrl}
            successCallback={successPaymentCB}
            errorCallback={errorPaymentCB}
            navigation={navigation}
          />
        )}

        <PaymentSuccessModal
          visible={isModalVisible}
          orderId={orderId}
          onchangeVisible={() => {
            setModalVisible(false);
            navigation?.navigate("Booking");
          }}
        />


      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  getallcart: state.cart.getallcart,
  getuser: state.auth.getuser,
});

const mapDispatchToProps = {
  CreateOrderApi,
  UpdatetransactionIdApi,
  OpenPhonepayApi,
  CheckTransactionStatusApi
};

export default connect(mapStateToProps, mapDispatchToProps)(Payment);
