import React, { useState, useEffect } from 'react';
import {
  CardStyleInterpolators,
  createStackNavigator,
} from '@react-navigation/stack';
import StackNavigator from '../navigation/StackNavigator';
import OnBoardingScreen from './../screens/OnboardingScreen/index';
import SplashScreen from 'react-native-splash-screen';
import { useDispatch } from 'react-redux';
import { connect } from 'react-redux';
import { GetuserIdApi, InicialCall } from '../redux/actions/authActions';
import { useNetInfo } from '@react-native-community/netinfo';
import NoInternetBox from '../component/noDataBox/NoInternetBox';

import PhonePePaymentSDK from 'react-native-phonepe-pg'
import { checkInAppUpdate } from '../utils/checkInAppUpdate';

const Stack = createStackNavigator();


const Root = ({ token, InicialCall, onboarding }) => {
  const [internetConnection, setInternetConnection] = useState(true)
  const internetState = useNetInfo();

  useEffect(() => {
    SplashScreen.hide();
  
  }, []);

  useEffect(() => {
    if (internetState.isConnected === false) {
      setInternetConnection(false)
    } else {
      setInternetConnection(true)
    }
  }, [internetState.isConnected])

  useEffect(() => {
    InicialCall()
  }, [token]);

  let init = {
    environment: 'PRODUCTION',
    merchantId: 'M22Q3CHJHEYP0',
    appId: null,
    enableLogging: false,
  };

  useEffect(() => {
    PhonePePaymentSDK?.init(
      init.environment,
      init.merchantId,
      null,
      init.enableLogging,
    )
      .then(result => {
        console.log('PhonePePaymentSDK result: ', result)
      })
      .catch(error => {
        console.log('PhonePePaymentSDK error: ', result)
      });

      checkInAppUpdate("FORCE_UPDATE")
  }, [])

  // console.log = console.error = console.warn = {}
  // console.log = console.log

  return (
    <>
      {internetConnection ?
        <Stack.Navigator
          screenOptions={{
            cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
            headerShown: false,
          }}>
          {onboarding && <Stack.Screen name="OnBoardingScreen" component={OnBoardingScreen} />}
          <Stack.Screen name="StackNavigator" component={StackNavigator} />
         
        </Stack.Navigator>
        :
        <NoInternetBox />
      }
    </>

  )
}

const mapStateToProps = state => ({
  token: state.auth.token,
  onboarding: state.auth.onboarding,
  getuser: state.auth.getuser,
  getCoupon: state.cart.getCoupon,
});

const mapDispatchToProps = {
  InicialCall,
};

export default connect(mapStateToProps, mapDispatchToProps)(Root);

