import React, {useState, useEffect, useRef} from 'react';
import {
  Image,
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StatusBar,
  FlatList,
  ScrollView,
  ActivityIndicator,
  Dimensions,
} from 'react-native';
import {COLORS, FONTS, SIZES, data} from './../../constants';
import styles from './styles';
import {icons, images} from './../../constants';
import {connect, useDispatch} from 'react-redux';
import {http2, RAZORPAY_KEY} from '../../services/api';
import NoDataBox from '../../component/noDataBox/NoDataBox';
import CompletedBooking from '../../component/CompletedBooking';
import Loader from '../../component/modalLoading';
import {USER_STATE} from '../../redux/types';
import {
  CancelBookingApi,
  GetAllOrdersApi,
  GetOrderByIdApi,
  OpenPhonepayApi,
  UpdatetransactionIdApi,
} from '../../redux/actions/orderAction';
import {formattedDate3} from '../../services/date';
import Modal from 'react-native-modal';
import Button from '../../component/Button';
import RazorpayCheckout from 'react-native-razorpay';
import Input1 from '../../component/input/Input1';
import {RNToasty} from 'react-native-toasty';
import LoginBox from '../../component/loginBox';
import OrderCard from '../../component/card/OrderCard';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import OrderCancelModal from '../../component/modal/OrderCancelModal';
import PaymentSuccessModal from '../../component/modal/PaymentSuccessModal';
import {BottomSheet} from 'react-native-btr';
import PhonePayView from '../../component/PhonePayView';
import {PhonepeCheckoutService} from '../../services/phonepe.service';
const {height, width} = Dimensions.get('window');

const Booking = ({
  navigation,
  token,
  CancelBookingApi,
  GetOrderByIdApi,
  UpdatetransactionIdApi,
  OpenPhonepayApi,
  userstate,
  orderData,
  GetAllOrdersApi,
  getuser,
}) => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [loader, setLoader] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [reason, setReason] = useState('');
  const [isModalVisible, setModalVisible] = useState(false);
  const [paymentModal, setPaymentModal] = useState(false);
  const [page, setPage] = useState(1);
  const [orderId, setOrderId] = useState();
  const [cancel, setCancel] = useState(false);
  const [cancelModal, setCancelModal] = useState(false);
  const [paymentUrl, setPaymentUrl] = useState(null);
  const [isPhonePayModalVisible, setIsPhonePayModalVisible] = useState(false);
  const dispatch = useDispatch();

  const handleSubmit = () => {
    if (reason) {
      setModalVisible(false);
      CancelBookingApi(orderId, {reason: reason}, (res, data) => {
        setLoader(data);
        setCancel(false);
        setReason('');
        if (res) {
          setCancelModal(true);
        }
      });
    } else {
      RNToasty.Error({
        title: 'Please write your reason',
      });
    }
  };

  const phonePe = (id, amt) => {
    PhonepeCheckoutService(
      {
        merchantId: 'M22Q3CHJHEYP0',
        amount: Number(amt),
        callbackUrl: 'https://essindiaonline.com/callback',
        merchantUserId: getuser?._id,
        saltIndex: 1,
        saltKey: '09d82f66-8de2-4a23-8502-cbc4f1856030',
        packageName: 'com.essindiaonline',
      },
      result => {
        if (result.status == 'SUCCESS') {
          console.log('phonepe payment success: ', result);
          const tranData = {
            transactionId: result?.merchantTransactionId,
            startDate: startDate,
          };
        }
      },
      error => {
        console.log('phonepe payment error : ', error);
      },
    );
  };

  const Rozarpayonline = (id, amt) => {
    setOrderId(id);
    var options = {
      description: 'Credits towards consultation',
      image:
        'https://easysolution.booksica.in/static/media/logo.f33c4633b780f8cf8053.png',
      currency: 'INR',
      key: RAZORPAY_KEY,
      amount: Number(amt) * 100,
      name: 'Easy Solution Services',
      // order_id: id,
      prefill: {
        email: getuser?.email || '',
        contact: orderData?.[0]?.product?.mobile || '',
        name: getuser?.name || '',
      },
      theme: COLORS.primary,
    };
    RazorpayCheckout.open(options)
      .then(data => {
        // handle success
        UpdatetransactionIdApi(id, data.razorpay_payment_id, (res, data) => {
          setPaymentModal(res), setLoader(data);
        });
        GetAllOrdersApi(1);
        console.log(`Success: ${data.razorpay_payment_id}`);
      })
      .catch(error => {
        // handle failure
        console.log(`Error: ${error.code} | ${error.description}`);
      });
  };

  const Phonepayonline = (id, amt) => {
    setOrderId(id); // Store order ID for future use

    // Call the OpenPhonepayApi with required parameters
    OpenPhonepayApi(
      {
        orderId: id,
        amount: amt,
        mobileNumber: getuser?.phoneNumber,
        userId: getuser?._id,
      },
      (cl, response) => {
        const paymentUrl =
          response?.data?.data?.instrumentResponse?.redirectInfo?.url;
        console.log('paymentUrl', response);
        if (response?.success && paymentUrl) {
          setPaymentUrl(paymentUrl);
          setIsPhonePayModalVisible(true);
        } else if (!cl) {
          console.error('Failed to get payment URL');
        }
      },
    );
  };

  const successPaymentCB = data => {
    console.log('/ success: ', data);
    setIsPhonePayModalVisible(false);
    setPaymentModal(true);
    // UpdatetransactionIdApi(orderId, 'phonepe_transaction_id', (res, data) => {
    //   setIsPhonePayModalVisible(false);
    //   setPaymentModal(true);
    //   setLoader(data);
    // });
    GetAllOrdersApi(1);
  };

  const errorPaymentCB = error => {
    setPaymentModal(true);
    setIsPhonePayModalVisible(false);
    // Add some feedback in the modal about the failure
    console.log('/ failed: ', error);
    // Optional: Show a different message in the modal for error case
  };

  const onRefresh = () => {
    setPage(1);
    setRefresh(true);
    GetAllOrdersApi(1);
    setRefresh(false);
  };

  useEffect(() => {
    GetAllOrdersApi(1, data => setLoading(data));
  }, [userstate]);

  console.log('order data............... : ', orderData?.[0]?.date);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle="light-content" />
      <Loader loading={loader} />
      {token ? (
        <>
          <View style={styles.switchrow}>
            <TouchableOpacity
              activeOpacity={0.5}
              style={[
                styles.switchbox,
                userstate == 'Services' && {
                  backgroundColor: COLORS.primary,
                  borderColor: COLORS.primary,
                },
              ]}
              onPress={() => {
                // scrollTop()
                dispatch({
                  type: USER_STATE,
                  payload: 'Services',
                });
              }}>
              <Text
                style={[
                  styles.switchtext,
                  userstate == 'Services' && {color: COLORS.white},
                ]}>
                Services
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => {
                // scrollTop()
                dispatch({
                  type: USER_STATE,
                  payload: 'Product',
                });
              }}
              style={[
                styles.switchbox,
                userstate == 'Product' && {
                  backgroundColor: COLORS.primary,
                  borderColor: COLORS.primary,
                },
              ]}>
              <Text
                style={[
                  styles.switchtext,
                  userstate == 'Product' && {color: COLORS.white},
                ]}>
                Product
              </Text>
            </TouchableOpacity>
          </View>

          {loading ? (
            <View
              style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
              <ActivityIndicator size={'large'} color={COLORS.primary} />
            </View>
          ) : (
            <>
              {userstate == 'Services' ? (
                <>
                  {orderData?.[0] ? (
                    // <View>
                    <FlatList
                      data={orderData}
                      renderItem={({item, index}) => (
                        <View
                        // style={{ marginBottom: index == orderData?.length - 1 ? height * .01 : 0 }}
                        >
                          {item?.product &&
                            item?.product?.map((ele, index) => {
                              return (
                                <CompletedBooking
                                  key={ele?._id}
                                  // mb={index == orderData?.length - 1 ? height * .1 : 0}
                                  status={item?.status}
                                  t2={styles.border}
                                  main_img={
                                    ele?.productId?.thumnail
                                      ? {uri: http2 + ele?.productId?.thumnail}
                                      : images?.no_image
                                  }
                                  invoice={item.invoice}
                                  // text_main={'Running'}
                                  date={item?.date ? item?.date : ''}
                                  time={item?.time}
                                  address={item?.address?.address}
                                  mobile={item?.address?.mobile}
                                  text_main={ele?.productId?.title}
                                  subtitle={ele?.productId?.subtitle}
                                  // email={item.email}
                                  orderTotal={item?.orderTotal}
                                  successCallback={data => {
                                    UpdatetransactionIdApi(
                                      item._id,
                                      data?.transactionId,
                                      (res, data) => {
                                        setPaymentModal(res), setLoader(data);
                                      },
                                    );
                                    GetAllOrdersApi(1);
                                    console.log('success data : ', data);
                                  }}
                                  // paymentPress={() => Phonepayonline(item._id, item?.orderTotal)}
                                  // paymentPress={() => phonePe(item._id, item?.orderTotal)}
                                  razorpayPress={() =>
                                    Rozarpayonline(item._id, item?.orderTotal)
                                  }
                                  phonepePress={() =>
                                    Phonepayonline(item._id, item?.orderTotal)
                                  }
                                  cancelPress={() => {
                                    setCancel(false),
                                      setModalVisible(true),
                                      setOrderId(item._id);
                                  }}
                                  invoicePress={() =>
                                    navigation.navigate('Invoice', {
                                      data: item,
                                      pId: ele._id,
                                    })
                                  }
                                  // onPress={() => GetOrderByIdApi(item._id, ele?._id, '', (data, success) => {setLoader(data), success == 'success' && navigation.navigate("BookingDetail", { data: item, pId: ele?._id })})}
                                />
                              );
                            })}
                        </View>
                      )}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps={'handled'}
                      key={({item, index}) => item.id}
                      onEndReached={() => {
                        if (orderData?.length >= 20) {
                          // console.log('reached', page + 1);
                          GetAllOrdersApi(page + 1, data => setLoading1(data));
                          setPage(page + 1);
                        }
                      }}
                      refreshing={refresh}
                      onRefresh={onRefresh}
                      ListFooterComponent={() => {
                        return (
                          <View>
                            {loading1 && (
                              <ActivityIndicator
                                color={COLORS.primary}
                                size={'large'}
                                style={{marginBottom: SIZES.height * 0.02}}
                              />
                            )}
                          </View>
                        );
                      }}
                    />
                  ) : (
                    // </View>
                    <NoDataBox
                      source={images.search_not_found}
                      title={'Booking not found'}
                    />
                  )}
                </>
              ) : (
                <>
                  {orderData?.[0] ? (
                    // <View>
                    <FlatList
                      data={orderData}
                      renderItem={({item, index}) => (
                        <View
                        // style={{ marginBottom: index == orderData?.length - 1 ? height * .1 : 0 }}
                        >
                          {item?.product &&
                            item?.product?.map((ele, index) => {
                              return (
                                <OrderCard
                                  key={ele?._id}
                                  source={
                                    ele?.productId?.thumnail
                                      ? {uri: http2 + ele?.productId?.thumnail}
                                      : images?.no_image
                                  }
                                  title={ele?.productId?.title}
                                  subtitle={ele?.productId?.subtitle}
                                  orderNo={item?._id}
                                  date={
                                    item.createdAt
                                      ? formattedDate3(item.createdAt)
                                      : ''
                                  }
                                  // price={ele?.productId?.price}
                                  price={item?.orderTotal}
                                  status={ele?.status}
                                  name={`${item.address?.firstName} ${item.address?.lastName}`}
                                  trackPress={() =>
                                    navigation?.navigate('Tracking', {
                                      status: ele?.status,
                                    })
                                  }
                                  onPress={() =>
                                    GetOrderByIdApi(
                                      item._id,
                                      ele?._id,
                                      navigation,
                                      data => setLoader(data),
                                    )
                                  }
                                  // onPress={() => navigation?.navigate("OrderDetail", {data: item, pId: ele?._id})}
                                />
                              );
                            })}
                        </View>
                      )}
                      showsVerticalScrollIndicator={false}
                      keyboardShouldPersistTaps={'handled'}
                      key={({item, index}) => item.id}
                      onEndReached={() => {
                        if (orderData?.length >= 20) {
                          // console.log('reached', page + 1);
                          GetAllOrdersApi(page + 1, data => setLoading1(data));
                          setPage(page + 1);
                        }
                      }}
                      refreshing={refresh}
                      onRefresh={onRefresh}
                      ListFooterComponent={() => {
                        return (
                          <View>
                            {loading1 && (
                              <ActivityIndicator
                                color={COLORS.primary}
                                size={'large'}
                                style={{marginBottom: SIZES.height * 0.02}}
                              />
                            )}
                          </View>
                        );
                      }}
                    />
                  ) : (
                    // </View>
                    <NoDataBox
                      source={images.search_not_found}
                      title={'Booking not found'}
                    />
                  )}
                </>
              )}
            </>
          )}
        </>
      ) : (
        <LoginBox />
      )}

      {paymentUrl && (
        <PhonePayView
          orderId={orderId}
          visible={isPhonePayModalVisible}
          url={paymentUrl}
          successCallback={successPaymentCB}
          errorCallback={errorPaymentCB}
          navigation={navigation}
        />
      )}

      <PaymentSuccessModal
        visible={paymentModal}
        orderId={orderId}
        onchangeVisible={() => {
          setPaymentModal(false);
          navigation?.navigate('Booking');
        }}
      />

      <OrderCancelModal
        visible={cancelModal}
        onchangeVisible={() => {
          setCancelModal(false);
          navigation?.navigate('Booking');
        }}
      />

      {/* cancel booking modal */}
      <BottomSheet
        visible={isModalVisible}
        onBackButtonPress={() => {
          setCancel(false), setReason(''), setModalVisible(false);
        }}
        onBackdropPress={() => {
          setCancel(false), setReason(''), setModalVisible(false);
        }}>
        <View style={styles.cancel_modalstyle}>
          <View>
            <Text style={styles.text6}>
              {cancel ? 'Reason' : 'Cancel Booking'}
            </Text>
            <View style={styles.line}></View>
          </View>
          {cancel ? (
            <Input1
              placeholder={'reason'}
              multiline={true}
              numberOfLines={5}
              inputTextStyle={{marginTop: SIZES.height * 0.025}}
              value={reason}
              onChangeText={text => setReason(text)}
            />
          ) : (
            <>
              <Text style={styles.text4}>
                Are you sure want to cancel your service booking ?
              </Text>
              <Text style={[styles.text4, {color: COLORS.gray}]}>
                Only 80% of the money you can refund from your payment according
                to our policy
              </Text>
            </>
          )}
          <View style={styles.line}></View>
          {cancel ? (
            <View style={styles.modal_box2}>
              <Button t1={'Confirm'} t2={styles.btn} onPress={handleSubmit} />
            </View>
          ) : (
            <View style={styles.modal_box2}>
              <Button
                t1={'Cancel'}
                t2={styles.modalcanclebtn}
                t3={{color: COLORS.primary}}
                onPress={() => setModalVisible(false)}
              />
              <Button
                t1={'Yes, Cancel Booking'}
                t2={styles.btn}
                t3={{fontSize: 12}}
                onPress={() => setCancel(true)}
              />
            </View>
          )}
        </View>
      </BottomSheet>
    </View>
  );
};
const mapStateToProps = state => ({
  token: state.auth.token,
  orderData: state.order.orderData,
  userstate: state.blacklist.userstate,
  getuser: state.auth.getuser,
});

const mapDispatchToProps = {
  GetAllOrdersApi,
  UpdatetransactionIdApi,
  CancelBookingApi,
  GetOrderByIdApi,
  OpenPhonepayApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Booking);
