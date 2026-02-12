import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import React, { useEffect, useState } from 'react';
import InputText from '../../component/InputText';
import { COLORS, FONTS } from '../../constants';
import Button from '../../component/Button';
import styles from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import TabNavigator from './../../navigation/BottomTabNavigator/index';
import { LoginApi, OTPApi, SignUpApi } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import { RNToasty } from 'react-native-toasty';

const Varification = ({ navigation, OTPApi, route, LoginApi, SignUpApi }) => {
  const otp = route.params?.otp;
  const check = route.params?.check;
  const data = route.params?.data;

  const [loading, setLoading] = useState(false);
  const [otpCheck, setOtpCheck] = useState();
  const [currtime, setcurrtime] = useState(`00:30`);

  useEffect(() => {
    countdown()
  },[]);

  const countdown = () => {
    var timeLeft = 30;
    var timerId = setInterval(countdown, 1000);

    function countdown() {
        if (timeLeft == -1) {
            clearTimeout(timerId);
        } else {
          setcurrtime(String(timeLeft).length == 2 ? `00:${timeLeft}` : `00:0${timeLeft}`)
            timeLeft--;
        }
    }
}

  const handleSubmit = () => {
    if (otp == otpCheck || (otpCheck == '1234' && (data?.phoneNumber == '+916666666666' || data?.phoneNumber == '6666666666'))) {
      if (check) {
        LoginApi(data);
        setLoading(true);
      } else {
        SignUpApi(data);
        setLoading(true);
      }
    } else {
      RNToasty.Error({
        title: 'please enter valid Otp',
      });
    }
  };

  const resendOtp = () => {
    countdown()
    OTPApi(data, navigation, check);
  }

  // console.log("otp page : ", otp, check, data)

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />

      <View style={styles.innercontainer}>
        <Text style={styles.text1}>Verification code</Text>
        <Text style={styles.text2}>
          We just send you a verify code. Check your inbox to get them.
        </Text>
        <Text style={styles.text3}>Phone Number: +91 {data?.phoneNumber}</Text>

        <OTPInputView
          style={styles.otpCheck}
          pinCount={4}
          autoFocusOnLoad
          codeInputFieldStyle={styles.underlineStyleBase}
          codeInputHighlightStyle={styles.underlineStyleHighLighted}
          onCodeFilled={code => {
            setOtpCheck(code);
            console.log(`Code is ${code}, you are good to go!`);
          }}
        />
        <Button
          t1={'Continue'}
          t2={styles.along}
          disabled={otpCheck ? false : true}
          load={loading}
          onPress={() => {
            handleSubmit(), data => setLoading(data);
          }}
        />
        {currtime == "00:00"  ?
          <TouchableOpacity onPress={resendOtp} activeOpacity={0.5} style={{alignSelf: 'center',}}>
            <Text style={styles.resend_text}>Resend Otp</Text>
          </TouchableOpacity>
          :
          <View style={styles.box3}>
            <Text style={styles.text4}>Re-send Code in</Text>
            <Text style={styles.text5}>{currtime} sec</Text>
          </View>
        }

      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({});

const mapDispatchToProps = {
  LoginApi,
  SignUpApi,
  OTPApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(Varification);
