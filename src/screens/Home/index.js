import React, { useState, useRef, useEffect } from 'react';
import {
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ActivityIndicator,
  StatusBar,
  useWindowDimensions,
  RefreshControl,
  NativeModules,
} from 'react-native';
import { COLORS, SIZES, data, icons, images } from '../../constants';
import Services from '../../component/Services';
import styles from './styles';
import { GetHomeDataApi, GetNotificationApi, ReadNotificationApi } from './../../redux/actions/homeActions';
import { connect, useDispatch } from 'react-redux';
import Loader from './../../component/modalLoading/index';
import HomeSlider from './../../component/slider/homeAutoscrollslider';
import { http2 } from '../../services/api';
import ServiceMore from './../../component/serviceMore/index';
import { GetByProductIdApi, GetParentCategoryApi, GetSubCategoryApi } from './../../redux/actions/categoryAction';
import FastImage from 'react-native-fast-image';
import { USER_STATE } from '../../redux/types';
import messaging from "@react-native-firebase/messaging"
import { GetOrderByIdApi } from '../../redux/actions/orderAction';

    
      
const { height, width } = Dimensions.get('window');
const Home = ({
  navigation, ReadNotificationApi, GetByProductIdApi, GetNotificationApi,
  GetHomeDataApi, notification, GetOrderByIdApi,
  getHomedata,
  GetParentCategoryApi,
  userstate,
}) => {
  const [loading1, setLoading1] = useState(false);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);


  const dispatch = useDispatch()

  const scrollRef = useRef();
  const scrollTop = () => {
    scrollRef.current?.scrollTo({
      y: 0,
      animated: true,
    });
  }

  const onRefresh = () => {
    // setRefreshing(true)
    GetHomeDataApi((data) => setRefreshing(data));
    GetParentCategoryApi();
    scrollTop()
    // setRefreshing(false)
  }


  useEffect(() => {
    GetHomeDataApi((data) => setLoading1(data));
    GetParentCategoryApi();
  }, []);

  useEffect(() => {
    GetHomeDataApi();
  }, [userstate]);


  const { width } = useWindowDimensions();
  // console.log('useState----', userstate);
  // console.log('home type ---- ', userstate);

  messaging().onNotificationOpenedApp(async remoteMessage => notificationCallback(remoteMessage))

  messaging().getInitialNotification()
    .then(async remoteMessage => notificationCallback(remoteMessage))
    .catch(err => {
      console.log("kill notification error : ", err)
    })

  useEffect(() => {
    messaging().onMessage(async remoteMessage => notificationCallback(remoteMessage));
  }, []);

  async function notificationCallback(remoteMessage) {

    if (remoteMessage) {
      switch (remoteMessage?.data?.type) {
        case 'ECOM_ORDERED':
          GetOrderByIdApi(remoteMessage?.data?.orderId, '', navigation, null, `eCommerce/getByOrderId/${remoteMessage?.data?.orderId}`)
          break;
        case 'ORDERED':
          navigation?.navigate("NotificationView")
          break;
      }
      GetNotificationApi()
      ReadNotificationApi()
      console.log("notification message kill : ", remoteMessage?.data?.orderId)
    }
  }

  // console.log("home banner ; ", getHomedata?.appBanner);

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <Loader loading={loading} />
      {/* <Image source={{uri: convertImageToBase64Png()}} width={300} height={200}  /> */}
      <View style={styles.switchrow}>
        <TouchableOpacity activeOpacity={0.5}
          style={[
            styles.switchbox,
            userstate == 'Services' && { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
          ]}
          onPress={() => {
            dispatch({
              type: USER_STATE,
              payload: 'Services',
            });
            GetHomeDataApi((data) => setLoading1(data));
          }}

        // onPress={() => GetHomeDataApi('Services', data => setLoading(data))}
        >
          <Text
            style={[
              styles.switchtext,
              userstate == 'Services' && { color: COLORS.white },
            ]}>
            Services
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={() => {
            dispatch({
              type: USER_STATE,
              payload: 'Product',
            });
            GetHomeDataApi((data) => setLoading1(data));
          }}
          style={[
            styles.switchbox,
            userstate == 'Product' && { backgroundColor: COLORS.primary, borderColor: COLORS.primary },
          ]}>
          <Text
            style={[
              styles.switchtext,
              userstate == 'Product' && { color: COLORS.white },
            ]}>
            Product
          </Text>
        </TouchableOpacity>
      </View>
      {loading1 ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
        :
        <ScrollView showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps={'handled'}
          ref={scrollRef}
          refreshControl={<RefreshControl onRefresh={onRefresh} refreshing={refreshing} />}
        >
          <TouchableOpacity
            activeOpacity={0.6}
            style={[styles.name, 
              getHomedata?.appBanner?.length == 0 && { marginBottom: 0 }
          ]}
            onPress={() => navigation.navigate('Search')}>
            <Image source={icons.Search} style={styles.search} />
            <Text style={styles.placeholder}>Search</Text>
          </TouchableOpacity>
          {getHomedata?.appBanner?.[0] &&
            <HomeSlider
              datalist={getHomedata?.appBanner}
              imageKey={'banner'}
              // source={{ uri: http2 + getHomedata?.appBanner[0]?.banner }}
            />
          }
          <View>
            <Text style={styles.text5}>Service</Text>
            <View style={styles.service_row}>
              {getHomedata?.category?.map((item, index) => (
                <Services
                  key={item?._id}
                  // img={{ uri: http2 + item?.icon }}
                  img={item?.icon ? { uri: http2 + item.icon } : images?.no_image}
                  // img={() => convertImageToBase64Png()}
                  text={item?.name}
                  onPress={() =>
                    GetParentCategoryApi(item?._id, navigation, data => setLoading(data),
                    )
                  }
                />
              ))}
            </View>

          </View>

          <Text style={[styles.text5, { marginBottom: height * -0.02 }]}>
            More Service
          </Text>
          {getHomedata?.homeCategoryCart?.map((item, index) => (
            <ServiceMore
              key={item._id}
              title={item.title}
              subtitle={item.subtitle}
              img={item?.image ? { uri: http2 + item.image } : images?.no_image}
              bg={item.taskColourCode}
              boxbg={item.backgroundColourCode}
              onPress={() => {
                GetParentCategoryApi(item?.pCategory, navigation, data => setLoading(data))
              }}
            // onPress={() => navigation.navigate('SetTime')}
            />
          ))}

          {getHomedata?.product?.map((ele, index) => (
            <View key={ele._id}>
              <Text numberOfLines={2} style={styles.servicetitle}>
                {ele?.title}
              </Text>
              <Text numberOfLines={4} style={styles.servicesubtitle}>
                {ele?.description}
              </Text>

              <View>
                <FlatList
                  data={ele?.products}
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  renderItem={({ item, index }) => {
                    return (
                      <TouchableOpacity
                        onPress={() => GetByProductIdApi(item._id, navigation, (data) => setLoading(data))}
                        // onPress={() => navigation.navigate('ServiceDetail')}
                        activeOpacity={0.6}>
                        <View
                          style={{
                            ...styles.serviceBox,
                            marginLeft: index == 0 ? width * 0.04 : width * 0.01,
                            marginRight:
                              ele?.products?.length - 1 ? width * 0.04 : 0,
                          }}>
                          <TouchableOpacity
                            onPress={() => GetByProductIdApi(item._id, navigation, (data) => setLoading(data))}
                            // onPress={() => navigation.navigate('ServiceDetail')}
                            activeOpacity={0.6}>
                            <FastImage
                              style={styles.serviceimg}
                              source={{
                                uri: http2 + item?.images[0]?.url,
                                headers: { Accept: 'image/avif, image/jpeg' },
                                priority: FastImage.priority.normal,
                              }}
                              resizeMode={FastImage.resizeMode.cover}
                            />
                          </TouchableOpacity>
                          <Text numberOfLines={2} style={styles.serviceboxtitle}>
                            {item?.title}
                          </Text>

                          <Text
                            numberOfLines={2}
                            style={styles.serviceboxsubtitle}>
                            {item?.subtitle}
                          </Text>
                        </View>
                      </TouchableOpacity>
                    );
                  }}
                  key={item => item._id}
                />
              </View>

            </View>
          ))}
        </ScrollView>
      }

    </View>
  );
};
const mapStateToProps = state => ({
  getHomedata: state.home.getHomedata,
  userstate: state.blacklist.userstate,
  notification: state.home.notification,
});

const mapDispatchToProps = {
  GetHomeDataApi,
  GetParentCategoryApi,
  GetSubCategoryApi,
  GetByProductIdApi,
  GetNotificationApi,
  ReadNotificationApi,
  GetOrderByIdApi
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
