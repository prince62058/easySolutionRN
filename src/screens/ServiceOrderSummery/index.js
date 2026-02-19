import {
  Image,
  Text,
  View,
  ScrollView,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import React from 'react';
import { COLORS, FONTS, icons, images } from '../../constants';
import styles from './styles';
import PriceDetail from '../../component/PriceDetail';
import Button from '../../component/Button';
import { GetAllCartcustomerIdApi } from '../../redux/actions/cartAction';
import { connect } from 'react-redux';
import Cart from '../../component/Cart';
import { http2 } from '../../services/api';


const ServiceOrderSummery = ({ navigation, getallcart, }) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity>
        <View style={styles.box1}>
          <View style={styles.box4}>
            <Image source={icons.trend} style={styles.img1} />
          </View>
          <View style={styles.box5}>
            <Text style={styles.text2}>
              Treadmill Repair Service Installation & AMC Contract
            </Text>

              <Text style={styles.text5}>₹799</Text>
          </View>
        </View>
      </TouchableOpacity>
      <ScrollView showsVerticalScrollIndicator={false} keyboardShouldPersistTaps={'handled'} >
      {/* {getallcart?.cartData?.map((item) => (
        <Cart
          key={item?._id}
          img={{ uri: http2 + item?.productId?.images[0]?.url }}
          title={item?.productId?.title}
          desc={item?.productId?.subtitle}
          price={item?.productId?.price}
          rate={item?.productId?.reviewRating}
          quantity={item?.quantity}
          // taxId?.taxPercent
          quantityshow
          deleteicon
        />
      ))} */}

      <PriceDetail total={getallcart?.billDetail?.orderTotal}
        price={getallcart?.billDetail?.netAmount}
        cDiscount={getallcart?.billDetail?.orderTotal}
        itemQty={getallcart?.cartData?.length}
        discount={getallcart?.billDetail?.orderTotal}
      />
      <Button
        t1={'Next'}
        t2={styles.btn}
        onPress={() => navigation.navigate('Payment')}
      />
      </ScrollView>
    </View>
  );
};
const mapStateToProps = state => ({
  getallcart: state.cart.getallcart,

});

const mapDispatchToProps = {
  GetAllCartcustomerIdApi,

};
export default connect(mapStateToProps, mapDispatchToProps)(ServiceOrderSummery);
