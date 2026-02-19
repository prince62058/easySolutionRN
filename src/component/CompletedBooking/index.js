import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import React, {useState} from 'react';
import {COLORS, FONTS, icons, images} from '../../constants';
import Collapsible from 'react-native-collapsible';
import Icons from '../Icons';
import {fileViewer, viewFileFromUrl} from '../../services/fileSystem';
import {http2} from '../../services/api';
// import { PhonepeCheckoutTouch } from 'react-native-phonepesdk';

const CompletedBooking = ({
  status,
  main_img,
  text_main,
  date,
  time,
  address,
  mobile,
  razorpayPress,
  phonepePress,
  cancelPress,
  invoice,
  onPress,
  invoicePress,
  email,
  subtitle,
  successCallback,
  orderTotal,
  mb,
}) => {
  const [isCollapsed, setisCollapsed] = useState(true);
  // console.log("url : ", main_img)
  return (
    <View>
      <View style={[styles.base, mb && {marginBottom: mb}]}>
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.box1}
          onPress={onPress}>
          <Image source={main_img} style={styles.img1} />
          <View style={styles.box2}>
            <Text numberOfLines={1} style={styles.text1}>
              {text_main}
            </Text>
            <Text numberOfLines={2} style={styles.text2}>
              {subtitle}
            </Text>
            <View
              style={[
                styles.btn,
                status == 'CANCELLED' && {backgroundColor: COLORS.red},
                status == 'PENDING' && {backgroundColor: '#ebc034'},
              ]}>
              <Text
                numberOfLines={1}
                style={{
                  ...styles.text3,
                  marginBottom: status?.length > 10 ? 0 : -2,
                }}>
                {status}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <View style={styles.box3}></View>
        <Collapsible collapsed={isCollapsed}>
          <View>
            {date && (
              <View style={styles.box4}>
                <Text style={styles.key}>Date</Text>
                <Text style={styles.value}>{date}</Text>
              </View>
            )}
            {time && (
              <View style={styles.box4}>
                <Text style={styles.key}>Time</Text>
                <Text style={styles.value}>{time}</Text>
              </View>
            )}
            <View style={styles.box4}>
              <Text style={styles.key}>Address</Text>
              <Text numberOfLines={1} style={styles.value}>
                {address}
              </Text>
            </View>
            <View style={styles.box4}>
              <Text style={styles.key}>Mobile no.</Text>
              <Text style={styles.value}>{mobile}</Text>
            </View>
            {/* <View style={styles.box4}>
              <Text style={styles.key}>Gmail</Text>
              <Text style={styles.value}>{email}</Text>
            </View> */}
            {status == 'PENDING' ? (
              <View style={styles.payment_row}>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={styles.pay_btn}
                  onPress={razorpayPress}>
                  <Text style={styles.text6}>Razorpay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[styles.pay_btn, {backgroundColor: '#5f259f'}]}
                  onPress={phonepePress}>
                  <Text style={styles.text6}>PhonePe</Text>
                </TouchableOpacity>
              </View>
            ) : (
              <View style={styles.cancel_row}>
                {status != 'CANCELLED' && (
                  <TouchableOpacity
                    activeOpacity={0.5}
                    style={styles.cancelbtn}
                    onPress={cancelPress}>
                    <Text style={styles.cancel}>Cancel Booking</Text>
                  </TouchableOpacity>
                )}
                {status == 'CANCELLED' ? (
                  <></>
                ) : (
                  invoice && (
                    <TouchableOpacity
                      activeOpacity={0.5}
                      style={[
                        styles.t2,
                        status != 'CANCELLED' && {width: width * 0.43},
                      ]}
                      onPress={invoicePress}
                      // onPress={() => fileViewer(http2 + invoice)}
                    >
                      <Text style={styles.text6}>View E-Reciept</Text>
                    </TouchableOpacity>
                  )
                )}
              </View>
            )}
          </View>
        </Collapsible>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => setisCollapsed(!isCollapsed)}
          style={styles.collapse_btn}>
          <Icons
            name={isCollapsed ? 'down-outline' : 'up-outline'}
            size={width * 0.07}
            color={COLORS.primary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

CompletedBooking.defaultProps = {
  visible: false,
  paymentPress: null,
  invoicePress: null,
};

export default CompletedBooking;

const styles = StyleSheet.create({
  base: {
    margin: width * 0.03,
    elevation: 5,
    backgroundColor: COLORS.white,
    borderRadius: 12,
  },
  box4: {
    width: width * 0.87,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: height * 0.013,
    // borderWidth: 1,
    alignSelf: 'center',
  },
  img1: {
    height: width * 0.22,
    width: width * 0.22,
    margin: width * 0.04,
    marginLeft: width * 0.03,
    marginBottom: width * 0.01,
    marginTop: height * 0.035,
    resizeMode: 'contain',
    backgroundColor: COLORS.lightGray31,
    borderRadius: 12,
  },
  collapse_btn: {
    height: height * 0.06,
    alignItems: 'center',
    justifyContent: 'center',
    // borderWidth: 1,
  },
  cancel_row: {
    flexDirection: 'row',
    gap: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },

  box1: {
    flexDirection: 'row',
  },

  box2: {
    marginTop: height * 0.035,
  },
  box3: {
    height: height * 0.001,
    width: width * 0.87,
    marginLeft: width * 0.03,
    backgroundColor: '#ADA4A5',
    marginTop: height * 0.007,
  },
  text1: {
    width: width * 0.5,
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    marginBottom: -4,
  },
  cancel: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    marginBottom: -3,
  },
  text2: {
    width: width * 0.5,
    fontSize: 13,
    fontFamily: FONTS.light,
    color: COLORS.black,
  },
  text3: {
    width: width * 0.2,
    fontFamily: FONTS.bold,
    fontSize: width * 0.026,
    color: COLORS.white,
    textAlign: 'center',
    alignSelf: 'center',
    // marginBottom: -3,
  },
  btn: {
    width: width * 0.23,
    height: height * 0.03,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#61D38F',
    borderRadius: width * 0.3,
    marginTop: height * 0.01,
  },
  t1: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#61D38F',
    borderRadius: width * 0.3,
    width: width * 0.23,
    height: height * 0.03,
    marginTop: height * 0.008,
    marginLeft: -width * 0.02,
  },
  t2: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.prime,
    borderRadius: 50,
    height: height * 0.06,
    width: width * 0.85,
    marginTop: height * 0.04,
    marginLeft: width * 0.045,
  },
  key: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    // marginLeft: width * 0.06,
    color: COLORS.gray,
  },

  value: {
    width: width * 0.5,
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    // textAlign: 'center',
    textAlign: 'right',
    // marginRight: width * 0.05,
    // borderWidth: 1,
  },
  text6: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    marginBottom: -3,
  },

  cancelbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    height: height * 0.06,
    width: width * 0.4,
    marginTop: height * 0.045,
    borderRadius: 50,
  },
  payment_row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: width * 0.045,
    marginTop: height * 0.04,
  },
  pay_btn: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: 50,
    height: height * 0.05,
    width: width * 0.41,
  },
  pay_icon: {
    height: height * 0.03,
    width: width * 0.06,
    resizeMode: 'contain',
    marginRight: 8,
  },
});

// const payload = {
//     merchantId: "M22Q3CHJHEYP0",
//     merchantTransactionId: uniqueID,
//     merchantUserId: "user" || userId,
//     amount: amount * 100 || amount,
//     redirectUrl: https://essindiaonline.com/paymentstauspage,
//     redirectMode:"REDIRECT",
//     callbackUrl: https://api.essindiaonline.com/api/PhonePayGatewayStatus?merchantTransactionId=${uniqueID}&orderId=${orderId}, // Use the dynamically fetched callback URL
//     mobileNumber: "8986576761" || mobileNumber,
//     paymentInstrument: {
//       type: process.env.PAYMENTINSTRUMENT_TYPE,
//     },
//   };
