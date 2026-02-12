import React, { useEffect, useState, useRef } from 'react';
import {
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  ScrollView,
} from 'react-native';
import InputText from '../../component/InputText';
import { COLORS, FONTS } from '../../constants';
import Button from '../../component/Button';
import styles from './styles';
import { LoginApi, OTPApi } from '../../redux/actions/authActions';
import { connect } from 'react-redux';
import messaging from "@react-native-firebase/messaging"
import validation from '../../utils/validation';


const SignIn = ({ navigation, LoginApi, customerId, OTPApi }) => {
  const [loading, setLoading] = useState(false);
  const [error, setEror] = useState(null);
  const [emailErr, seteEmailErr] = useState(null)
  const [fcm, setFcm] = useState();

  useEffect(() => {
    getDeviceToken()
  }, [])

  const getDeviceToken = async () => {
    let fcmToken = await messaging().getToken();
    console.log("signin fcm : ", fcmToken);
    setFcm(fcmToken)
  }

  const ScrollRef = useRef();
  const scrollend = () => {
    ScrollRef.current?.scrollToEnd();
  };

  const [postData, setPostData] = useState({
    hashKey: 'BAAPTOBAPPHOTAHAIBETA',
    phoneNumber: '',
    // email: '',
    customerId: customerId || '',
  });

  const handleChange = (name, value) => {
    setPostData({
      ...postData,
      [name]: value,
    });
  };

  return (
    useEffect(() => {
      scrollend();
    }, []),
    (
      <ScrollView
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ref={ScrollRef}
        style={styles.container}>
        <StatusBar
          backgroundColor={COLORS.primary}
          barStyle={'light-content'}
        />

        <View style={styles.innercontainer}>
          <Text style={styles.text1}>Hello Again!</Text>
          <Text style={styles.text2}>Welcome back you’ve been missed!</Text>

          <InputText
            label="Phone number"
            placeholder={'Phone number'}
            onPressIn={scrollend}
            maxLength={14}
            keyboardType={'numeric'}
            value={postData.phoneNumber}
            onChangeText={text => {
              handleChange('phoneNumber', text)
              // handleChange('phoneNumber', text?.slice(-10))
              // if(text?.slice(0, 1) == "+"){
              //   handleChange('phoneNumber', text?.slice(-10))
              // }else{
              //   handleChange('phoneNumber', text)
              // }
            }}
            error={error}
          />
          {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}

          <InputText
            label="Email"
            placeholder={'Email'}
            value={postData?.email}
            keyboardType={'email-address'}
            onChangeText={text => {
              if(validation("email", text)){
                seteEmailErr("")
              }else{
                seteEmailErr("Enter Valid Email")
              }
              handleChange('email', text)
            }}
            error={emailErr}
          />

          <Button
            t1={'Sign In'}
            t2={styles.along}
            load={loading}
            disabled={postData?.phoneNumber?.length < 10 ? true : false}
            onPress={() => {
              if (postData.phoneNumber && !emailErr) {
                OTPApi({ ...postData, phoneNumber: postData.phoneNumber?.slice(-10), customerFcmToken: fcm }, navigation, true, data => setLoading(data));
              } else if( !emailErr){
                setEror('Enter Valid Phone Number');
              }
            }}
          />
          {/* <TouchableOpacity>
            <View style={styles.guest}>
              <Text style={styles.text4}>Continue as a Guest</Text>
            </View>
          </TouchableOpacity> */}
        </View>
      </ScrollView>
    )
  );
};

const mapStateToProps = state => ({
  customerId: state.auth.customerId
});

const mapDispatchToProps = {
  LoginApi,
  OTPApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);
