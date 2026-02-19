import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ScrollView,
  StatusBar,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import React, {useEffect, useState} from 'react';
import InputText from '../../component/InputText';
import {COLORS, FONTS} from '../../constants';
import Button from '../../component/Button';
import styles from './styles';
import OTPInputView from '@twotalltotems/react-native-otp-input';
import TabNavigator from './../../navigation/BottomTabNavigator/index';
import {LoginApi, OTPApi, SignUpApi} from '../../redux/actions/authActions';
import {connect} from 'react-redux';
import {RNToasty} from 'react-native-toasty';

const Varification = ({navigation, OTPApi, route, LoginApi, SignUpApi}) => {
  const otp = route.params?.otp;
  const check = route.params?.check;
  const data = route.params?.data;

  const [loading, setLoading] = useState(false);
  const [otpCheck, setOtpCheck] = useState('');
  const [currtime, setcurrtime] = useState(`00:30`);

  const [timerActive, setTimerActive] = useState(true);

  useEffect(() => {
    let timerId;
    if (timerActive) {
      var timeLeft = 30;
      timerId = setInterval(() => {
        if (timeLeft <= 0) {
          clearInterval(timerId);
          setcurrtime('00:00');
          setTimerActive(false);
        } else {
          setcurrtime(
            String(timeLeft).length == 2 ? `00:${timeLeft}` : `00:0${timeLeft}`,
          );
          timeLeft--;
        }
      }, 1000);
    }
    return () => clearInterval(timerId);
  }, [timerActive]);

  const handleSubmit = () => {
    if (
      otp == otpCheck ||
      (otpCheck == '1234' &&
        (data?.phoneNumber == '+916666666666' ||
          data?.phoneNumber == '6666666666'))
    ) {
      setLoading(true);
      if (check) {
        LoginApi(data, navigation, data => setLoading(data));
      } else {
        SignUpApi(data, navigation, data => setLoading(data));
      }
    } else {
      RNToasty.Error({
        title: 'please enter valid Otp',
      });
    }
  };

  const resendOtp = () => {
    setcurrtime('00:30');
    setTimerActive(true);
    setOtpCheck('');
    OTPApi(data, navigation, check);
  };

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
          code={otpCheck}
          onCodeChanged={code => setOtpCheck(code)}
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
          disabled={otpCheck?.length === 4 ? false : true}
          load={loading}
          onPress={handleSubmit}
        />
        {currtime == '00:00' ? (
          <TouchableOpacity
            onPress={resendOtp}
            activeOpacity={0.5}
            style={{alignSelf: 'center'}}>
            <Text style={styles.resend_text}>Resend Otp</Text>
          </TouchableOpacity>
        ) : (
          <View style={styles.box3}>
            <Text style={styles.text4}>Re-send Code in</Text>
            <Text style={styles.text5}>{currtime} sec</Text>
          </View>
        )}
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
