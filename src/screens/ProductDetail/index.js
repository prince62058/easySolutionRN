import {
  Text,
  View,
  Image,
  TextInput,
  FlatList,
  TouchableOpacity,
  Dimensions,
  ScrollView,
  ImageBackground,
  StatusBar,
} from 'react-native';
import React, { useState, useRef } from 'react';
const { height, width } = Dimensions.get('window');
import styles from './styles';
import Collapsible from 'react-native-collapsible';
import { COLORS, data, icons, images } from '../../constants';
import ProductDes from '../../component/ProductDes';
import Button from './../../component/Button/index';
import { CreateCartApi } from '../../redux/actions/cartAction';
import HomeSlider from '../../component/slider/homeAutoscrollslider';
import { connect } from 'react-redux';
import { http2 } from '../../services/api';

const ProductDetail = ({ navigation, CreateCartApi, getuser, getallcart, getbyProductid }) => {
  const [currentindex, setcurrentindex] = useState(0);
  const [kg, setkg] = useState(2);
  const [isCollapsed, setisCollapsed] = useState(false);
  const ref = useRef(null);

  const p_id = getbyProductid?.data?._id

  const valid = getallcart?.cartData?.find((i) => i.productId._id == p_id) ? true : false

  const [postData, setPostData] = useState({
    productId: getbyProductid?.data?._id,
    customerId: getuser?._id,
    image: { uri: http2 + getbyProductid?.data?.images?.url },
  });


  return (
    <View style={styles.container}>
      <StatusBar backgroundColor={COLORS.primary} barStyle={'light-content'} />
      <ScrollView>
        {/* <ScrollView horizontal showsHorizontalScrollIndicator={false}
        style={{width: width}}
        >
          <FlatList
            ref={ref}
            onScroll={event => {
              const x = event.nativeEvent.contentOffset.x;
              setcurrentindex((x / width).toFixed(0));
            }}
            data={data.sliderDataProduct}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled={true}
            renderItem={({item}) => (
              <View style={styles.box5}>
                <Image source={item.src} style={styles.img2} />
                <Image source={item.src1} style={styles.heart} />
              </View>
            )}
          />
        </ScrollView> */}
        {/* <View style={styles.box6}>
          {data.sliderDataProduct.map((item, index) => {
            return (
              <View
                style={[
                  styles.dots,
                  {
                    backgroundColor:
                      currentindex == index ? COLORS.primary : 'grey',
                  },
                ]}></View>
            );
          })}
        </View> */}

        <View style={styles.box5}>
          <HomeSlider
            datalist={getbyProductid?.data?.images}
            source={{
              uri: http2 + getbyProductid?.data?.images[0]?.url,
            }}
          />
        </View>
        <View style={styles.innercontainer}>
          <View style={styles.box1}>
            <Text style={styles.text2}>
              Dee Fit PVC Dumbbell SetPair Dumbbells, Hex Dumbbells, Home Gym
              5KGS X 2PCS 10kg Fixed Weight Dumbbell (10 kg)
            </Text>
            <View style={styles.box2}>
              <Image source={images.Dumblestar} style={styles.img1} />

              <Text style={styles.text3}>4.5</Text>
              <Text style={styles.text3}>202 Reviews</Text>
            </View>
            <View style={styles.box2}>
              <Text style={styles.text5}>₹ 1200</Text>
              <Text style={styles.text6}>71% Off</Text>
            </View>
            <Text style={styles.text1}>Bank offers 10% OFF</Text>
          </View>
          <View>
            <Text style={styles.text8}>Select Size</Text>
            <View>
              <FlatList
                data={data.kg.slice(0, 8)}
                numColumns={4}
                showsHorizontalScrollIndicator={false}
                pagingEnabled={true}
                renderItem={({ item, index }) => (
                  <TouchableOpacity onPress={() => setkg(item.text + 1)}>
                    <View
                      style={[
                        styles.box3,
                        {
                          backgroundColor:
                            kg == item.text + 1 ? COLORS.black : COLORS.white,
                        },
                      ]}>
                      <Text
                        style={{
                          color:
                            kg == item.text + 1 ? COLORS.white : COLORS.black,
                          //   fontSize: 15,
                        }}>
                        {item.text}
                      </Text>
                    </View>
                  </TouchableOpacity>
                )}
              />
              <Collapsible collapsed={!isCollapsed}>
                <FlatList
                  data={data.kg.slice(8, -1)}
                  numColumns={4}
                  showsHorizontalScrollIndicator={false}
                  pagingEnabled={true}
                  renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => setkg(item.text + 1)}>
                      <View
                        style={[
                          styles.box3,
                          {
                            backgroundColor:
                              kg == item.text + 1 ? COLORS.black : COLORS.white,
                          },
                        ]}>
                        <Text
                          style={{
                            color:
                              kg == item.text + 1 ? COLORS.white : COLORS.black,
                            // fontSize: 15,
                          }}>
                          {item.text}
                        </Text>
                      </View>
                    </TouchableOpacity>
                  )}
                />
              </Collapsible>
              <TouchableOpacity
                style={styles.t1}
                onPress={() => setisCollapsed(!isCollapsed)}>
                <Text
                  style={[
                    styles.view,
                    isCollapsed == true && { color: COLORS.primary },
                  ]}>
                  View all Size
                </Text>
                <Image
                  source={icons.productdown}
                  style={[
                    styles.image,
                    isCollapsed == true && { tintColor: COLORS.primary },
                  ]}
                />
              </TouchableOpacity>
            </View>
            <ProductDes />
          </View>
        </View>
      </ScrollView>
      <View style={styles.btnBox}>
        <Button
          t2={styles.addbtn}
          t3={{ color: COLORS.black }}
          t1={'Add To Cart'}
        />
        <Button
          t2={styles.buybtn}
          t1={'Buy Now'}
          onPress={() => navigation.navigate('Cartdetail')}
        />
      </View>
    </View>
  );
};

const mapStateToProps = state => ({
  getbyProductid: state.category.getbyProductid,
  getuser: state.auth.getuser,
  getallcart: state.cart.getallcart,
});

const mapDispatchToProps = {
  // GetByProductIdApi,
  CreateCartApi,
};
 
export default connect(mapStateToProps, mapDispatchToProps)(ProductDetail);
