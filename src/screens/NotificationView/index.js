import { View, Text, FlatList, TouchableOpacity, ActivityIndicator, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import styles from './styles';
import { COLORS, SIZES, data, icons, images } from '../../constants';
import { GetNotificationApi, ReadNotificationApi } from '../../redux/actions/homeActions';
import { connect } from 'react-redux';
import NoDataBox from '../../component/noDataBox/NoDataBox';
import Loader from '../../component/modalLoading';
import { formattedDate3 } from '../../services/date';
import { GetOrderByIdApi } from '../../redux/actions/orderAction';


const NotificationView = ({ navigation, ReadNotificationApi, GetOrderByIdApi, notification, GetNotificationApi }) => {
  const [loading, setLoading] = useState(false)
  const [loading1, setLoading1] = useState(false)


  useEffect(() => {
    GetNotificationApi(data => setLoading(data))
    ReadNotificationApi()
  }, [])

  // console.log("notification : ", notification?.[0])

  return (
    <View style={styles.container}>
      <Loader loading={loading1} />
      {loading ?
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
        :
        <>
          {notification?.[0] ?
            <FlatList
              data={notification}
              renderItem={({ item, index }) => {
                return (
                  <TouchableOpacity style={{ ...styles.alert_box, marginTop: index == 0 ? SIZES.height * .015 : 0, }}
                    activeOpacity={0.5}
                    disabled={item?.type && item?.type == "ECOM_ORDERED" || item?.type == 'ORDERED' ? false : true}
                    onPress={() => GetOrderByIdApi(item?.orderId, '', navigation, (data) => setLoading1(data), item?.type == 'ORDERED' ? `getOrderByOrderId/${item?.orderId}` : `eCommerce/getByOrderId/${item?.orderId}`, item?.type == 'ORDERED' ? "Services" : 'Product')}
                    // onPress={() => { ReadNotificationApi(item.id, "single", (data) => setLoading(data)), GetSingleOrdersApi(n_data?.order_id, navigation, (data) => setLoading(data)) }}
                  >
                    <View style={styles.row}>
                      <Image source={images.notification} style={styles.image} />
                      <View>
                        <Text style={styles.title} numberOfLines={1}>{item?.title}</Text>
                        <Text style={styles.text} numberOfLines={2}>{item?.message}</Text>
                      </View>
                    </View>
                    <Text style={styles.date}>{formattedDate3(new Date(item?.createdAt))}</Text>
                  </TouchableOpacity>
                )
              }}
            />
            :
            <NoDataBox source={images.no_notification} title={"No Notification"} />
          }
        </>
      }
    </View>

  );
};
const mapStateToProps = state => ({
  notification: state.home.notification,
});

const mapDispatchToProps = {
  GetNotificationApi,
  ReadNotificationApi,
  GetOrderByIdApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(NotificationView);

