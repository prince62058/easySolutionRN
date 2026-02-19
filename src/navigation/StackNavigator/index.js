import React, { useState } from 'react';
import { CardStyleInterpolators, createStackNavigator } from '@react-navigation/stack';
import TabNavigator from '../BottomTabNavigator';
import Search from '../../screens/Search';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StatusBar,
  TextInput,
} from 'react-native';
import styles from './styles';
import { COLORS, icons } from '../../constants';
import NotificationView from '../../screens/NotificationView';
import ProductDetail from '../../screens/ProductDetail';
import UpadateAddress from '../../screens/UpdateAddress';
import SaveAddress from '../../screens/SaveAddress';
import Payment from '../../screens/Payment';
import UpcomingNew from '../../screens/UpcomingNew';
import HomeServices from '../../screens/HomeServices';
import ServiceDetail from '../../screens/ServiceDetail';
import SetTime from '../../screens/SetTime';
import ServiceOrderSummery from '../../screens/ServiceOrderSummery';
import PrivacyPolicy from '../../screens/PrivacyPolicy';
import EditProfileDetail from '../../screens/EditProfileDetail';
import coupons from '../../screens/coupons';
import { connect } from 'react-redux';
import SignIn from '../../screens/SignIn';
import SignUp from '../../screens/SignUp';
import Varification from '../../screens/Varification';
import faq from '../../screens/faq';
import HelpCenter from '../../screens/HelpCenter';
import Tracking from '../../screens/tracking';
import OrderDetail from '../../screens/orderDetail';
import ProductReview from '../../screens/productReview';
import Invoice from '../../screens/invoice';
import bookingDetail from '../../screens/bookingDetail';
import supportChat from '../../screens/supportChat';

const Stack = createStackNavigator();

const StackNavigator = ({ navigation, token }) => {

  // console.log("token : ", token)
  return (
    <Stack.Navigator
      initialRouteName="TabNavigator"
      screenOptions={{
        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
        },
        headerTitleStyle: styles.title,
      }}>
      <Stack.Screen
        options={{
          headerShown: false,
        }}
        name="TabNavigator"
        component={TabNavigator}
      />
      {token == null &&
        <>
          <Stack.Screen name="SignIn" options={{ headerShown: false }} component={SignIn} />
          <Stack.Screen name="SignUp" options={{ headerShown: false }} component={SignUp} />
          <Stack.Screen name="Varification" options={{ headerShown: false }} component={Varification} />
        </>
      }
      <Stack.Screen
        name="Search"
        component={Search}
      />
      <Stack.Screen name="Tracking" component={Tracking} />
      <Stack.Screen name="OrderDetail" options={{ title: 'Order Detail' }} component={OrderDetail} />

      <Stack.Screen name="BookingDetail" options={{ title: 'Booking Detail' }} component={bookingDetail} />
      <Stack.Screen
        options={{
          title: 'Notification',
        }}
        name="NotificationView"
        component={NotificationView}
      />
      <Stack.Screen
        options={{
          title: 'Chat With Us',
        }}
        name="SupportChat"
        component={supportChat}
      />
      <Stack.Screen name="ProductReview" component={ProductReview}
        options={{
          title: 'Product Review',
        }}
      />
      <Stack.Screen name="Invoice" component={Invoice}
        options={{
          title: 'E-Receipt',
        }}
      />
      <Stack.Screen
        options={{
          title: 'Product Detail',
          headerRight: () => (
            <TouchableOpacity>
              <Image source={icons.Producticon} style={styles.Cart} />
            </TouchableOpacity>
          ),
        }}
        name="ProductDetail"
        component={ProductDetail}
      />

      <Stack.Screen
        options={{
          title: 'Upadate Address',
        }}
        name="UpadateAddress"
        component={UpadateAddress}
      />
      <Stack.Screen name="SaveAddress" component={SaveAddress} options={{
        title: 'Save Address',
      }} />
      <Stack.Screen name="Payment" component={Payment} />
      <Stack.Screen
        options={{
          title: 'Upcoming New',
        }}
        name="UpcomingNew"
        component={UpcomingNew}
      />
      <Stack.Screen
        options={{
          title: 'Service',
        }}
        name="HomeServices"
        component={HomeServices}
      />
      <Stack.Screen
        options={{
          title: 'Service Detail',
        }}
        name="ServiceDetail"
        component={ServiceDetail}
      />

      <Stack.Screen name="Coupons" component={coupons} />
      <Stack.Screen
        options={{
          title: 'Set Time',
        }}
        name="SetTime"
        component={SetTime}
      />
      <Stack.Screen
        options={{
          title: 'Order Summery',
        }}
        name="ServiceOrderSummery"
        component={ServiceOrderSummery}
      />
      <Stack.Screen
        options={{
          title: 'Help Center',
        }}
        name="HelpCenter"
        component={HelpCenter}
      />
      <Stack.Screen name="FAQ" component={faq}
        options={{
          title: 'Help Center',
        }}
      />

      <Stack.Screen
        options={{
          title: 'Privacy Policy',
        }}
        name="PrivacyPolicy"
        component={PrivacyPolicy}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileDetail}
        options={{
          title: 'Edit Profile',
        }}
      />
    </Stack.Navigator>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,

});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(StackNavigator);
