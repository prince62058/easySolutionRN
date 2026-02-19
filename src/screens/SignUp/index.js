import {
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView,
  StatusBar,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import React, {useEffect, useState, useRef} from 'react';
import InputText from '../../component/InputText';
import {COLORS, FONTS} from '../../constants';
import Button from '../../component/Button';
import styles from './styles';
import {SignUpApi, OTPApi} from '../../redux/actions/authActions';
import {connect} from 'react-redux';
import messaging from '@react-native-firebase/messaging';
import validation from '../../utils/validation';
// import {Formik} from 'formik';
// import * as yup from 'yup';

const SignUp = ({navigation, SignUpApi, customerId, OTPApi, route}) => {
  const phoneno = route.params.phoneno;
  const [error, setEror] = useState(null);
  const [loading, setLoading] = useState(false);
  const [emailErr, seteEmailErr] = useState(null);

  const ScrollRef = useRef();
  const [fcm, setFcm] = useState();

  useEffect(() => {
    getDeviceToken();
  }, []);

  const getDeviceToken = async () => {
    try {
      let fcmToken = await messaging().getToken();
      console.log('signup fcm : ', fcmToken);
      setFcm(fcmToken);
    } catch (error) {
      console.log('SignUp FCM Token Error : ', error);
    }
  };

  const scrollend = () => {
    ScrollRef.current?.scrollToEnd();
  };

  const [post, setPost] = useState({
    hashKey: 'BAAPTOBAPPHOTAHAIBETA',
    phoneNumber: phoneno,
    fullName: null,
    email: route?.params?.email || '',
    customerId: customerId || '',
  });

  const handleChange = (name, value) => {
    setPost({
      ...post,
      [name]: value,
    });
  };

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      keyboardShouldPersistTaps="handled"
      ref={ScrollRef}
      style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <View style={styles.innercontainer}>
        <View style={styles.box1}>
          <Text style={styles.text1}>Create an Account</Text>
          <Text style={styles.text2}>SignUp</Text>
        </View>

        <InputText
          label="Full Name"
          placeholder={'Full Name'}
          onPressIn={scrollend}
          value={post.fullName}
          onChangeText={text => {
            handleChange('fullName', text);
            if (text.length > 1) {
              setEror(null);
            } else {
              setEror('Enter full name');
            }
          }}
          error={error}
        />

        <View style={styles.margin}>
          <InputText
            label="Phone Number"
            placeholder={'Phone Number'}
            onPressIn={scrollend}
            maxLength={10}
            keyboardType={'numeric'}
            value={post.phoneNumber}
            editable={false}
            // onChangeText={text => handleChange('phoneNumber', text)}
          />

          <InputText
            label="Email"
            placeholder={'Email'}
            value={post?.email}
            keyboardType={'email-address'}
            onChangeText={text => {
              if (validation('email', text)) {
                seteEmailErr('');
              } else {
                seteEmailErr('Enter Valid Email');
              }
              handleChange('email', text);
            }}
            error={emailErr}
          />
        </View>

        <Button
          t1={'Sign Up'}
          t2={styles.along}
          load={loading}
          onPress={() => {
            if (post.fullName && !emailErr) {
              OTPApi(
                {...post, customerFcmToken: fcm},
                navigation,
                false,
                data => setLoading(data),
              );
            } else if (!emailErr) {
              setEror('Enter full name');
            }
          }}
        />
        <View style={styles.box3}>
          <Text style={styles.text4}>Already have an Account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate('SignIn')}>
            <Text style={styles.text5}>Sign in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const mapStateToProps = state => ({
  customerId: state.auth.customerId,
});

const mapDispatchToProps = {
  SignUpApi,
  OTPApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUp);
