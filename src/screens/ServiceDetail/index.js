import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  useWindowDimensions,
  FlatList,
} from 'react-native';
import React, {useState, useEffect, useRef} from 'react';
const {height, width} = Dimensions.get('window');
import styles from './styles';
import {COLORS, data, icons, images} from '../../constants';
import Button from '../../component/Button';
import {
  GetAllReviewApi,
  GetByProductIdApi,
} from '../../redux/actions/categoryAction';

import {connect} from 'react-redux';
import {http2} from './../../services/api';
import RenderHtml from 'react-native-render-html';
import Stars from 'react-native-stars';
import HomeSlider from './../../component/slider/homeAutoscrollslider';
import Loader from './../../component/modalLoading/index';
import {CreateCartApi} from './../../redux/actions/cartAction';
import {formattedDate3} from '../../services/date';
import RatingCard from '../../component/card/RatingCard';

const TabButton = ({children, active, onPress, ml, mr}) => {
  return (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={onPress}
      style={[
        styles.t3,
        ml && {marginLeft: ml},
        mr && {marginRight: mr},
        active && {
          borderBottomColor: '#EE2761',
        },
      ]}>
      <Text style={styles.switchtext}>{children}</Text>
    </TouchableOpacity>
  );
};

const ServiceDetail = ({
  navigation,
  getallcart,
  GetByProductIdApi,
  GetAllReviewApi,
  getbyProductid,
  customerId,
  token,
  CreateCartApi,
  userstate,
  getuser,
}) => {
  const [loading, setLoading] = useState(false);
  const [switchs, setSwitchs] = useState('');
  const {width} = useWindowDimensions();

  React.useLayoutEffect(() => {
    navigation?.setOptions({
      title: userstate == 'Services' ? 'Service' : 'Product Detail',
    });
  }, [navigation, userstate]);

  const [tablist, setTablist] = useState([]);
  // const tablist = ["Service Include", 'Service Exclude', 'Additional Things To Get', 'Description', 'Rating and Review']

  const p_id = getbyProductid?.data?._id;

  const valid = getallcart?.cartData?.find(i => i.productId._id == p_id)
    ? true
    : false;

  const [postData, setPostData] = useState({
    productId: getbyProductid?.data?._id,
    customerId: token ? getuser?._id : customerId ? customerId : '',
    // image: { uri: http2 + getbyProductid?.data?.images?.url },
  });

  useEffect(() => {
    let type = '';
    let arr = [];
    for (i = 0; i < 5; i++) {
      if (i == 0 && getbyProductid?.data?.include) {
        arr.push({title: 'Service Include', type: 'include'});
        type = type ? type : 'include';
      } else if (i == 1 && getbyProductid?.data?.exclude) {
        arr.push({title: 'Service Exclude', type: 'exclude'});
        type = type ? type : 'exclude';
      } else if (i == 2 && getbyProductid?.data?.additional?.[0]) {
        arr.push({title: 'Additional Things To Get', type: 'additional'});
        type = type ? type : 'additional';
      } else if (i == 3 && getbyProductid?.data?.description) {
        arr.push({title: 'Description', type: 'description'});
        type = type ? type : 'description';
      } else if (i == 4 && getbyProductid?.review?.[0]) {
        arr.push({title: 'Rating and Review', type: 'review'});
        type = type ? type : 'review';
      }
    }
    setSwitchs(type);
    setTablist(arr);
  }, [getbyProductid]);

  console.log(
    'product loading : ',
    loading,
    getbyProductid?.data?._id,
    getbyProductid?.data?.stock,
    getbyProductid?.data?.warranty,
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Loader loading={loading} />
        {getbyProductid?.data?.images && (
          <View style={styles.box5}>
            <HomeSlider
              datalist={getbyProductid?.data?.images}
              imageKey={'url'}
              imageStyle={styles.sliderImage}
            />
          </View>
        )}
        <View style={styles.innerContainer}>
          <Text
            numberOfLines={3}
            style={[styles.text2, {marginTop: height * 0.02}]}>
            {getbyProductid?.data?.title}
          </Text>
          <Text numberOfLines={3} style={styles.subtitle}>
            {getbyProductid?.data?.subtitle}
          </Text>
          <View style={styles.row}>
            <Stars
              display={getbyProductid?.data?.reviewRating}
              count={5}
              starSize={17}
              fullStar={images.colorStar}
              emptyStar={images.star}
              disabled={true}
              half={true}
              halfStar={images.halfstar}
            />
            <Text style={styles.text3}>
              ( {getbyProductid?.data?.reviewRating} )
            </Text>
          </View>
          {getbyProductid?.data?.cityId?.cityName && (
            <View style={styles.row}>
              <Image
                source={images.HomeLocation}
                style={styles.locationstyle}
              />
              <Text style={styles.location}>
                {getbyProductid?.data?.cityId?.cityName}
              </Text>
            </View>
          )}
          <View style={styles.row}>
            <Text numberOfLines={3} style={styles.text2}>
              Price :
            </Text>
            <Text style={styles.text5}>₹ {getbyProductid?.data?.price}</Text>
            {userstate == 'Services' && (
              <Text style={styles.text6}>/ Visit</Text>
            )}
          </View>
          {getbyProductid?.data?.warranty && (
            <View style={styles.row}>
              <Text numberOfLines={3} style={styles.text3}>
                Warranty :
              </Text>
              <Text style={styles.text3}>
                {' '}
                {getbyProductid?.data?.warranty == 0
                  ? 'No Warranty'
                  : getbyProductid?.data?.warranty > 1
                  ? `${getbyProductid?.data?.warranty} /day's`
                  : `${getbyProductid?.data?.warranty} /day`}
              </Text>
            </View>
          )}
          <View style={styles.line}></View>
        </View>

        <ScrollView horizontal>
          <View style={styles.box18}>
            {tablist?.map((item, index) => (
              <TabButton
                key={item.type}
                ml={index == 0 && width * 0.04}
                mr={index == tablist?.length - 1 ? width * 0.04 : 0}
                active={switchs == item?.type ? true : false}
                onPress={() => setSwitchs(item.type)}>
                {item.title}
              </TabButton>
            ))}
          </View>
        </ScrollView>
        <View style={styles.innerContainer}>
          {switchs == 'description' && (
            <View>
              <RenderHtml
                contentWidth={width}
                source={{html: getbyProductid?.data?.description}}
                tagsStyles={{
                  body: {
                    whiteSpace: 'normal',
                    color: 'black',
                  },
                }}
              />
            </View>
          )}
          {
            switchs == 'include' &&
              getbyProductid?.data?.include &&
              getbyProductid?.data?.include?.map((item, index) => (
                <View key={index} style={styles.dot_row}>
                  <View style={styles.dot} />
                  <Text style={styles.dot_text}>{item}</Text>
                </View>
              ))
            // <Text style={styles.text9}>{getbyProductid?.data?.include}</Text>
          }
          {
            switchs == 'exclude' &&
              getbyProductid?.data?.exclude &&
              getbyProductid?.data?.exclude?.map((item, index) => (
                <View key={index} style={styles.dot_row}>
                  <View style={styles.dot} />
                  <Text style={styles.dot_text}>{item}</Text>
                </View>
              ))
            // <Text style={styles.text9}>{getbyProductid?.data?.exclude}</Text>
          }
          {switchs == 'additional' &&
            getbyProductid?.data?.additional[0]?.url && (
              <View>
                {/* <Text style={styles.head}> Additional Things To Get</Text> */}
                {getbyProductid?.data?.additional?.map((item, index) => (
                  <Image
                    key={item._id}
                    source={{uri: http2 + item?.url}}
                    style={styles.adiitionimg}
                  />
                ))}
              </View>
            )}
        </View>
        {/* review container */}
        {switchs == 'review' && getbyProductid?.review?.[0] && (
          <ScrollView horizontal={true}>
            <View style={styles.box}>
              <FlatList
                data={
                  getbyProductid?.review?.[10]
                    ? getbyProductid?.review?.slice(0, 10)
                    : getbyProductid?.review
                }
                renderItem={({item, index}) => (
                  <RatingCard
                    name={item?.userId?.fullName}
                    source={
                      item?.userId?.image
                        ? {uri: http2 + item?.userId?.image}
                        : images.profile
                    }
                    rating={item.rating}
                    message={item.comment}
                  />
                )}
                showsVerticalScrollIndicator={false}
                keyExtractor={(item, index) => item?._id || index.toString()}
              />
            </View>
          </ScrollView>
        )}
        {getbyProductid?.review?.[10] && (
          <TouchableOpacity
            activeOpacity={0.5}
            style={styles.view_btn}
            onPress={() =>
              GetAllReviewApi(1, getbyProductid?.data?._id, navigation, data =>
                setLoading(data),
              )
            }>
            <Text style={styles.view_all}>View All</Text>
          </TouchableOpacity>
        )}
      </ScrollView>
      {/* <View style={{marginBottom: height * 0.095}} /> */}
      {userstate == 'Services' ? (
        <View style={styles.box2}>
          {/* <Button
          t1={'Send Enquiry'}
          t2={styles.custom}
          t3={{ color: COLORS.primary }}
        /> */}
          <Button
            t1={valid ? 'View Cart' : 'Add to Cart'}
            t2={{width: width * 0.92}}
            // t3={{ fontSize: 12 }}
            onPress={() => {
              if (valid) {
                navigation.navigate('ServiceCart');
              } else {
                CreateCartApi(postData, (res, data) => setLoading(data));
              }
            }}
          />
        </View>
      ) : (
        <>
          {getbyProductid?.data?.stock > 0 ? (
            <View style={styles.btnBox}>
              <Button
                t1={valid ? 'View Cart' : 'Add to Cart'}
                t2={styles.addbtn}
                t3={{color: COLORS.black}}
                onPress={() => {
                  if (valid) {
                    navigation.navigate('ServiceCart');
                  } else {
                    CreateCartApi(postData, (res, data) => setLoading(data));
                  }
                }}
              />
              <Button
                t2={styles.buybtn}
                t1={'Buy Now'}
                onPress={() => {
                  if (valid) {
                    navigation.navigate('ServiceCart');
                  } else {
                    CreateCartApi(postData, (res, data) => {
                      if (res) {
                        navigation.navigate('ServiceCart');
                      }
                      setLoading(data);
                    });
                  }
                }}
              />
            </View>
          ) : (
            <View style={styles.box2}>
              <Text style={styles.stock}>This product is out of stock</Text>
            </View>
          )}
        </>
      )}
    </View>
  );
};

const mapStateToProps = state => ({
  getbyProductid: state.category.getbyProductid,
  getuser: state.auth.getuser,
  token: state.auth.token,
  customerId: state.auth.customerId,
  getallcart: state.cart.getallcart,
  userstate: state.blacklist.userstate,
});

const mapDispatchToProps = {
  GetByProductIdApi,
  CreateCartApi,
  GetAllReviewApi,
};

export default connect(mapStateToProps, mapDispatchToProps)(ServiceDetail);
