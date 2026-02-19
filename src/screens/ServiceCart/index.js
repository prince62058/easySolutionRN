import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  StatusBar,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import {COLORS, SIZES, data, icons, images} from '../../constants';
import styles from './styles';
import {connect, useDispatch} from 'react-redux';
import Loader from './../../component/modalLoading/index';
import {http2} from './../../services/api';
import Cart from './../../component/Cart/index';

import {
  GetAllCartcustomerIdApi,
  GetAllCouponApi,
} from './../../redux/actions/cartAction';
import Button from '../../component/Button';
import Address from '../../component/Address';
import PriceDetail from '../../component/PriceDetail';
import Icons from '../../component/Icons';
import {RNToasty} from 'react-native-toasty';
import ChangeAddress from '../../component/ChangeAddress';
import {GetAddressByUserIdApi} from '../../redux/actions/addressAction';
import {DefaultAddress} from '../../redux/actions/blacklistAction';
import LoginBox from '../../component/loginBox';
import LoginModal from '../../component/modal/LoginModal';
import {USER_STATE} from '../../redux/types';

const {width, height} = Dimensions.get('window');
const ServiceCart = ({
  navigation,
  GetAllCartcustomerIdApi,
  getallcart,
  token,
  getCoupon,
  getaddressbyuserid,
  GetAddressByUserIdApi,
  customerId,
  userstate,
  getuser,
  GetAllCouponApi,
  defaultAddress,
  DefaultAddress,
}) => {
  const [loading, setLoading] = useState(false);
  const [loading1, setLoading1] = useState(false);
  const [isModalVisible, setModalVisible] = useState(false);
  // const address = getaddressbyuserid?.[0]

  const dispatch = useDispatch();

  const [postData, setPostData] = useState({
    addressId: defaultAddress?._id || null,
    couponCode: getallcart?.billDetail?.couponCode || null,
    couponDiscount: getallcart?.billDetail?.couponDiscount || null,
    customerId: getuser?._id || null,
    netAmount: getallcart?.billDetail?.netAmount || null,
    orderTotal: getallcart?.billDetail?.orderTotal || null,
    taxAmount: getallcart?.billDetail?.taxAmount?.toFixed(2) || null,
    taxPercentage: getallcart?.billDetail?.taxPercentage || null,
    time: null,
    date: null,
    paymentMethod: null,
    totalOfferDiscount: getallcart?.billDetail?.totalOfferDiscount || null,
  });

  const appliedCoupon = getCoupon?.find(
    i => i?.couponCode == getallcart?.billDetail?.couponCode,
  );

  useEffect(() => {
    if (customerId) {
      GetAllCartcustomerIdApi('', '', data => setLoading1(data));
    }
    GetAllCouponApi();
    if (token) {
      GetAddressByUserIdApi();
    }
  }, [userstate, token]);

  // useEffect(() => {
  //   GetAllCartcustomerIdApi('', '',  (data) => setLoading1(data))
  // }, [userstate])

  useEffect(() => {
    if (defaultAddress) {
    } else if (token) {
      DefaultAddress(getaddressbyuserid?.[0]);
    }
  }, [getaddressbyuserid, token]);

  useEffect(() => {
    setPostData({
      addressId: defaultAddress?._id || null,
      couponCode: getallcart?.billDetail?.couponCode || null,
      couponDiscount: getallcart?.billDetail?.couponDiscount || null,
      customerId: getuser?._id || null,
      netAmount: getallcart?.billDetail?.netAmount || null,
      orderTotal: getallcart?.billDetail?.orderTotal || null,
      taxAmount: getallcart?.billDetail?.taxAmount?.toFixed(2) || null,
      taxPercentage: getallcart?.billDetail?.taxPercentage || null,
      time: null,
      date: null,
      paymentMethod: null,
      totalOfferDiscount: getallcart?.billDetail?.totalOfferDiscount || null,
    });
  }, [getallcart]);

  const handleSubmit = () => {
    if (token) {
      if (defaultAddress) {
        if (userstate == 'Services') {
          navigation.navigate('SetTime', {
            data: {...postData, addressId: defaultAddress?._id},
          });
        } else if (userstate == 'Product') {
          navigation.navigate('Payment', {
            data: {...postData, addressId: defaultAddress?._id},
          });
        }
      } else {
        RNToasty.Normal({
          title: 'Please add address',
        });
      }
    } else {
      setModalVisible(true);
    }
  };

  // console.log('getallcartdata : ', postData);
  // address => add address =>place order
  return (
    <View style={styles.container}>
      <Loader loading={loading} />
      <View style={styles.switchrow}>
        <TouchableOpacity
          activeOpacity={0.5}
          style={[
            styles.switchbox,
            userstate == 'Services' && {
              backgroundColor: COLORS.primary,
              borderColor: COLORS.primary,
            },
          ]}
          onPress={() => {
            dispatch({
              type: USER_STATE,
              payload: 'Services',
            });
          }}

          // onPress={() => GetHomeDataApi('Services', data => setLoading(data))}
        >
          <Text
            style={[
              styles.switchtext,
              userstate == 'Services' && {color: COLORS.white},
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
          }}
          style={[
            styles.switchbox,
            userstate == 'Product' && {
              backgroundColor: COLORS.primary,
              borderColor: COLORS.primary,
            },
          ]}>
          <Text
            style={[
              styles.switchtext,
              userstate == 'Product' && {color: COLORS.white},
            ]}>
            Product
          </Text>
        </TouchableOpacity>
      </View>
      {loading1 ? (
        <View style={{flex: 1, justifyContent: 'center'}}>
          <ActivityIndicator size={'large'} color={COLORS.primary} />
        </View>
      ) : getallcart?.cartData?.[0] ? (
        <>
          <ScrollView
            showsVerticalScrollIndicator={false}
            style={styles.innercontainer}>
            <View>
              <FlatList
                scrollEnabled={false}
                data={getallcart?.cartData}
                renderItem={({item, index}) => (
                  <Cart
                    key={item?._id}
                    mt={index == 0 ? SIZES.height * 0.01 : 0}
                    disabled={true}
                    id={item?._id}
                    img={
                      item?.productId?.thumnail
                        ? {uri: http2 + item?.productId?.thumnail}
                        : images?.no_image
                    }
                    title={item?.productId?.title}
                    desc={item?.productId?.subtitle}
                    price={item?.productId?.price}
                    rate={item?.productId?.reviewRating}
                    quantity={item?.quantity}
                    // taxId?.taxPercent
                    quantityshow
                    deleteicon
                  />
                )}
              />
            </View>
            <TouchableOpacity
              activeOpacity={0.5}
              onPress={() => navigation.navigate('Home')}
              style={styles.t1}>
              <Text style={styles.text1}>
                {userstate == 'Services'
                  ? 'ADD MORE SERVICE'
                  : 'ADD MORE ITEMS'}
              </Text>
            </TouchableOpacity>

            <PriceDetail
              total={getallcart?.billDetail?.orderTotal}
              price={getallcart?.billDetail?.netAmount}
              tax={
                getallcart?.billDetail?.taxPercentage
                  ? `${getallcart?.billDetail?.taxPercentage}%`
                  : null
              }
              taxAmt={
                getallcart?.billDetail?.taxAmount
                  ? `${getallcart?.billDetail?.taxAmount?.toFixed(2)}`
                  : null
              }
              cDiscount={getallcart?.billDetail?.couponDiscount}
              itemQty={getallcart?.cartData?.length}
              // discount={getallcart?.billDetail?.couponDiscount}
            />
            {token && (
              <>
                {defaultAddress ? (
                  <ChangeAddress
                    name={`${defaultAddress?.firstName} ${defaultAddress?.lastName}`}
                    phone={defaultAddress?.mobile}
                    address={`${defaultAddress?.address}, ${defaultAddress?.apartment}, ${defaultAddress?.area}, ${defaultAddress?.city}, ${defaultAddress?.landmark}, ${defaultAddress?.country}, ${defaultAddress?.state}, ${defaultAddress?.pinCode}`}
                    // margin={{ marginBottom: height * 0.01 }}
                    onPress={() => navigation.navigate('UpadateAddress')}
                  />
                ) : (
                  <TouchableOpacity
                    onPress={() => navigation.navigate('SaveAddress')}
                    style={styles.t1}>
                    <Text style={styles.text1}>Add Address</Text>
                  </TouchableOpacity>
                )}
                <TouchableOpacity
                  activeOpacity={0.5}
                  style={[styles.offer_btn]}
                  onPress={() => navigation?.navigate('Coupons')}>
                  <View style={styles.row}>
                    <Image source={icons.productdiscount} style={styles.img5} />
                    <Text style={[styles.text22, {width: width * 0.74}]}>
                      {appliedCoupon
                        ? `Save ${appliedCoupon?.couponPercent}% on this order`
                        : 'View best available offers'}
                    </Text>
                  </View>
                  <Icons
                    name={'right'}
                    size={SIZES.width * 0.05}
                    color={COLORS.black}
                  />
                </TouchableOpacity>
              </>
            )}
          </ScrollView>
          {userstate == 'Services' && (
            <TouchableOpacity
              activeOpacity={0.5}
              style={styles.checkout_btn}
              onPress={handleSubmit}>
              <Image source={images.accountdetail} style={styles.img} />
            </TouchableOpacity>
          )}
          {userstate == 'Product' && (
            <View style={styles.btn_box}>
              <View>
                <Text style={styles.text13}>
                  ₹{getallcart?.billDetail?.orderTotal}
                </Text>
                {/* <Text style={styles.text14}>View price detail</Text> */}
              </View>
              <Button
                t2={styles.btn}
                t1={'Place Order'}
                onPress={handleSubmit}
              />
            </View>
          )}
        </>
      ) : (
        <View style={styles.innerContainer}>
          <Image source={images.cartEmpty} style={styles.image} />
          <Text style={styles.topText}>Your Cart is Empty</Text>
          <Text style={styles.subText}>
            Looks like you haven't added anything to your cart yet.
          </Text>
          <Button
            t1="Explore Services"
            t2={{
              width: SIZES.width * 0.6,
              alignSelf: 'center',
              borderRadius: 15,
            }}
            onPress={() => navigation.navigate('Home')}
          />
        </View>
      )}
      <LoginModal
        visible={isModalVisible}
        onPress={() => {
          setModalVisible(false), navigation?.navigate('SignIn');
        }}
      />
    </View>
  );
};

const mapStateToProps = state => ({
  token: state.auth.token,
  customerId: state.auth.customerId,
  getallcart: state.cart.getallcart,
  getCoupon: state.cart.getCoupon,
  userstate: state.blacklist.userstate,
  defaultAddress: state.blacklist.defaultAddress,
  getaddressbyuserid: state.address.getaddressbyuserid,
  getuser: state.auth.getuser,
});

const mapDispatchToProps = {
  GetAllCartcustomerIdApi,
  GetAllCouponApi,
  GetAddressByUserIdApi,
  DefaultAddress,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceCart);
