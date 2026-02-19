import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import { COLORS, FONTS, SIZES, icons, images } from '../../constants';
import Icons from '../Icons';
import { connect } from 'react-redux';
import Modal from 'react-native-modal';
import Stars from 'react-native-stars'
import { AddQuantityApi, GetAllCartcustomerIdApi, RemoveCartByIdApi, RemoveQuantityApi } from '../../redux/actions/cartAction';

const Cart = ({
  img,
  title,
  desc,
  price,
  rate,
  mrp, mt,
  RemoveCartByIdApi,
  onPress,
  AddQuantityApi,
  GetAllCartcustomerIdApi,
  RemoveQuantityApi,
  deleteicon,
  quantity, id,
  quantityshow, disabled,
}) => {
  const [isModalVisible, setModalVisible] = useState(false);
  // const [incredecre, setIncredecre] = useState(quantity);
  const handleQuantity = (type) => {
    if(type == "add") {
      AddQuantityApi(id);
      GetAllCartcustomerIdApi();
    }else if(type == "remove") {
      RemoveQuantityApi(id);
      GetAllCartcustomerIdApi();
    }
  }

  
  return (
    <>
      <TouchableOpacity activeOpacity={0.5} disabled={disabled} onPress={onPress} style={[styles.base, mt&&{marginTop:mt}]}>
        <View style={styles.box1}>
          <View>
            <View style={styles.box5}>
             {img && <Image source={img} style={styles.img1} />}
            </View>
            {quantityshow && (
              <View style={styles.box2}>
                <TouchableOpacity activeOpacity={0.6} onPress={() => handleQuantity("remove")}>
                  <Icons name={"minus"} size={SIZES.width * .045} color={COLORS.black} />
                </TouchableOpacity>
                <Text style={styles.text1}>{quantity}</Text>
                <TouchableOpacity activeOpacity={0.6} onPress={() => handleQuantity("add")}>
                  <Icons name={"plus"} size={SIZES.width * .045} color={COLORS.black} />
                </TouchableOpacity>
              </View>
            )}
          </View>
          <View style={styles.box4}>
            <Text numberOfLines={1} style={styles.text2}>
              {title}
            </Text>
            <Text numberOfLines={1} style={styles.text3}>
              {desc}
            </Text> 
            <View style={[styles.box3]}>
              {/* <Text style={styles.text5}>Size: 10KG</Text> */}
              {/* <Text style={styles.text4}>{rate}</Text> */}
              <Stars
                    display={rate}
                    count={5}
                    half={true}
                    starSize={17}
                    fullStar={images.colorStar}
                    emptyStar={images.star}
                    halfStar={images.halfstar}
                    disabled={true}
                  />
                 <Text style={styles.text4}>({rate})</Text>
              {/* <Image source={images.star} style={styles.img2}></Image> */}
            </View>
            <View style={styles.box3}>
              <Text style={styles.text6}>₹ {price}</Text>
              {/* <Text style={styles.text8}>₹ {mrp}</Text> */}

              {/* <Text style={styles.text7}>71% Off</Text> */}
            </View>
          </View>
          {deleteicon && (
            <TouchableOpacity activeOpacity={0.5} onPress={() => setModalVisible(true)} style={styles.delete_btn}>
              <Image source={icons.deleteicon} style={styles.delete1} />
            </TouchableOpacity>
          )}
        </View>
      </TouchableOpacity>
      <View style={{ justifyContent: 'center', alignItems: 'center' }}>
        <Modal
          isVisible={isModalVisible}
          animationIn={'fadeInDown'}
          backdropOpacity={0.1}>
          <View style={styles.modalbox}>
            <Text style={styles.delete}>Delete</Text>
            <View style={styles.line}></View>
            <Text style={styles.deleteprd}>
              Are You Want to Delete this Product
            </Text>
            <View style={styles.modalrow}>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.canclebox}>
                <Text style={styles.cancle}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  RemoveCartByIdApi(id);
                  GetAllCartcustomerIdApi();
                  setModalVisible(false);
                }}
                style={styles.yesbox}>
                <Text style={styles.yes}>Yes</Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </View>
    </>

  );
};

Cart.defaultProps = {
  onPressDelete: null,
  quantity: 1,
  onPress: null,
  onPressdecrement: null,
  onPressincrement: null,
  disabled: false,
  // rate: 0
};

const mapStateToProps = state => ({
  getallcart: state.cart.getallcart,

});

const mapDispatchToProps = {
  GetAllCartcustomerIdApi,
  AddQuantityApi,
  RemoveQuantityApi,
  RemoveCartByIdApi,
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

const styles = StyleSheet.create({
  base: {
    marginBottom: height * 0.015,
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    width: width * 0.92,
    alignSelf: 'center',
  },
  box1: {
    flexDirection: 'row',
    margin: width * 0.02,
  },
  box3: {
    flexDirection: 'row',
    gap: 7,
  },
  img1: {
    height: width * 0.24,
    width: width * 0.24,
    borderRadius: 10,
    resizeMode: 'cover',
    alignSelf: 'center',
  },

  box2: {
    flexDirection: 'row',
    // justifyContent: 'center',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    backgroundColor: '#EE27611A',
    marginLeft: width * 0.01,
    borderRadius: 5,
    marginTop: width * 0.02,
    height: height * 0.035,
  },
  img2: {
    height: height * 0.02,
    width: width * 0.038,
    marginTop: height * 0.0015,
  },
  delete1: {
    height: width * 0.045,
    width: width * 0.045,
    resizeMode: 'contain',
    // borderWidth: 1,
  },
  delete_btn: {
    width: width * 0.1,
    height: width * 0.1,
    alignItems: 'center',
    // justifyContent: 'center',
  },
  text1: {
    fontSize: width * 0.036,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    width: width * 0.06,
    // borderWidth: 1,
    textAlign: 'center',
    marginBottom: -4,
  },
  text2: {
    fontSize: SIZES.width * .038,
    fontFamily: FONTS.medium,
    marginBottom: height * 0.004,
    color: COLORS.black,
    width: width * 0.5,
    // height: height * 0.04,
  },
  text3: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.red,
    width: width * 0.5,
    marginBottom: 4,
    // height: height * 0.05,
  },

  text4: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    marginTop: 2,
    // width: width * 0.1,
  },
  text5: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    width: width * 0.16,
  },
  text6: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    width: width * 0.2,
  },
  text8: {
    fontSize: 13,
    textDecorationLine: 'line-through',
    color: COLORS.gray,
    width: width * 0.18,
  },
  text7: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.green10,
    width: width * 0.15,
  },
  box4: {
    marginLeft: width * 0.03,
  },
  box5: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    overflow: 'hidden',
  },

  // ----------modal========

  modalbox: {
    alignItems: 'center',
    height: height * 0.26,
    width: width * 0.9,
    backgroundColor: 'white',
    borderRadius: 12,
  },

  delete: {
    fontSize: 16,
    color: '#EE2761',
    marginTop: width * 0.028,
    fontFamily: FONTS.medium,
  },

  line: {
    width: width,
    borderTopWidth: 1,
    borderColor: COLORS.gray20,
    // marginVertical: height * 0.02,
    width: width * 0.9,
  },

  deleteprd: {
    color: COLORS.black,
    textAlign: 'center',
    marginTop: height * 0.025,
    fontSize: 14,
    fontFamily: FONTS.regular,
  },
  cancle: {
    color: COLORS.black,
    fontSize: 14,
    fontFamily: FONTS.medium,
    marginBottom: -2,
  },
  modalrow: {
    flexDirection: 'row',
    marginTop: height * 0.032,
    // justifyContent: 'space-around',
    gap: width * 0.04,
  },
  yesbox: {
    backgroundColor: '#EE2761',
    width: width * 0.36,
    height: height * 0.065,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  yes: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 15,
    fontFamily: FONTS.medium,
  },
  canclebox: {
    borderWidth: 2,
    borderColor: '#EE2761',
    width: width * 0.36,
    height: height * 0.065,
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
