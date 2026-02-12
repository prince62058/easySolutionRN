import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  TextInput,
} from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { icons, COLORS, images, FONTS } from '../../constants';
import Home from '../../screens/Home';
import Booking from '../../screens/Booking';
import Profile from '../../screens/Profile';
import styles from './styles';
import ServiceCart from '../../screens/ServiceCart';
import { http2 } from '../../services/api';
import { connect } from 'react-redux';
import Badge from '../../component/badge';
import { Greeting } from '../../services/welcome';

const { height, width } = Dimensions.get('window');
const Tab = createBottomTabNavigator();

const TabNavigator = ({ navigation, getuser, getallcart, notificationCount }) => {
  return (
    <Tab.Navigator
      screenOptions={{
        tabBarLabelStyle: {
          ...FONTS.fourHundred,
          textAlign: 'center',
          fontSize: 12,
        },
        headerStyle: {
          elevation: 0,
          shadowOpacity: 0,
          // height: height * 0.09,
        },
        tabBarActiveTintColor: COLORS.primary,
        tabBarInactiveTintColor: COLORS.gray60,
        headerTitleStyle: styles.title,
      }}>
      <Tab.Screen
        name="Home"
        component={Home}
        options={{
          title: '',
          tabBarLabel: 'Home',
          headerStyle: {
            // elevation: 0,
            // shadowOpacity: 0,
            height: height * 0.09,
          },
          headerLeft: () => (
            <View style={styles.row}>
              <TouchableOpacity activeOpacity={0.5} onPress={() => navigation?.navigate("Profile")}>
              <Image source={getuser?.image ? { uri: http2 + getuser?.image } : images.profile} style={styles.homeimg} />
              </TouchableOpacity>
              <View style={styles.box3}>
              <Text style={styles.title1}>Easy Solutions Service</Text>
                {/* <Text style={styles.text1}>{Greeting()}</Text> */}
                {getuser?.fullName && <Text style={styles.name}>Hi, {getuser?.fullName}</Text>}
                {/* <View style={styles.row}>
                  <Image
                    source={images.HomeLocation}
                    style={styles.locationstyle}
                  />
                  <Text style={styles.text2}>Location 458001</Text>
                </View> */}
              </View>
            </View>
          ),
          headerRight: () => (
            <TouchableOpacity
            style={styles.right_btn}
              onPress={() => navigation?.navigate('NotificationView')}>
              <Image
                source={images.HomeNotification}
                style={styles.notificationstyle}
              />
               <Badge count={notificationCount?.count} />
            </TouchableOpacity>
          ),
          tabBarIcon: ({ focused }) => (
            <Image
              resizeMode="contain"
              source={focused ? icons.Homeiconfilled : icons.Homeicon}
              style={styles.bottomicon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Booking"
        component={Booking}
        options={{
          tabBarIcon: ({ focused }) => (
            <Image
              resizeMode="contain"
              source={focused ? icons.Bookingiconfilled : icons.Bookingicon}
              style={styles.bottomicon}
            />
          ),
        }}
      />
      <Tab.Screen
        name="ServiceCart"
        component={ServiceCart}
        options={() => ({
          title: 'Cart',
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                resizeMode="contain"
                source={focused ? icons.Chat : icons.Carticon}
                style={styles.bottomiconcart}
              />
              <Badge count={getallcart?.cartData?.length} />
            </View>
          ),
        })
        }
     
      />

      <Tab.Screen
        options={{
          // headerShown: false,
          tabBarIcon: ({ focused }) => (
            <Image
              resizeMode="contain"
              source={focused ? icons.Profilefilled : icons.Profile}
              style={styles.bottomicon}
            />
          ),
        }}
        name="Profile"
        component={Profile}
      />
    </Tab.Navigator>
  );
};
const mapStateToProps = state => ({
  getuser: state.auth.getuser,
  getallcart: state.cart.getallcart,
  notificationCount: state.home.notificationCount,
});

const mapDispatchToProps = {

};

export default connect(mapStateToProps, mapDispatchToProps)(TabNavigator);
