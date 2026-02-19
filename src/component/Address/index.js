import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Dimensions,
  ImageBackground,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import React from 'react';
import { COLORS, FONTS, icons } from '../../constants';
const Address = ({
  onPress,
  firstname,
  lastname,
  address,
  apartment,
  area,
  state,
  country,
  city,
  landmark,
  pincode,
  checked,
  onPressaddress,
  mobile,
  deletePress,
}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        onPress={onPress}
        style={styles.box1}>
        <TouchableOpacity activeOpacity={0.5} onPress={onPress} style={styles.pyment_radio_box}>
          {checked && <View style={styles.pyment_innerradio_box}></View>}
        </TouchableOpacity>
        <View
          style={{
            width: width * 0.7,
            marginLeft: width * 0.025,
            // borderWidth: 1,
          }}>
          <View style={styles.rowtext}>
            <Text style={styles.Deliver}>Deliver to: </Text>
            <Text numberOfLines={1} style={styles.text1}>
              {`${firstname} ${lastname}`}
            </Text>
          </View>
          <Text numberOfLines={1} style={styles.text1}>
            {mobile}
          </Text>
          <Text style={styles.text3}>
            {`${address}, ${apartment}, ${area}, ${city}, ${landmark}, ${country}, ${state}, ${pincode}`}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} onPress={onPressaddress} style={styles.editbox}>
          <Image source={icons.editicon} style={styles.img3} />
        </TouchableOpacity>
        <TouchableOpacity activeOpacity={0.5} onPress={deletePress} style={styles.delete_box}>
          <Image source={icons.deleteicon} style={styles.img3} />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default Address;

const styles = StyleSheet.create({
  box1: {
    flexDirection: 'row',
    marginVertical: width * 0.02,
    alignSelf: 'center',
    paddingVertical: height * 0.014,
    width: width * 0.92,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    paddingHorizontal: width * 0.025,
    overflow: 'hidden',
  },
  rowtext: {
    width: width * 0.7,
    flexDirection: 'row',
    // flexWrap: 'wrap',
    alignItems: 'center',
    marginBottom: height * -0.005,
    // borderWidth: 1,
  },
  Deliver: {
    fontSize: 13,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },
  text1: {
    width: width * 0.45,
    // borderWidth: 1,
    fontSize: 12.5,
    fontFamily: FONTS.medium,
    color: COLORS.black,
  },

  text3: {
    fontSize: 11.5,
    fontFamily: FONTS.regular,
    color: COLORS.gray80,
    width: width * 0.7,
  },
  delete_box: {
    height: width * 0.1,
    width: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: COLORS.lightGray1,
    borderTopLeftRadius: 12,
  },
  editbox: {
    height: width * 0.1,
    width: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    right: 0,
    backgroundColor: COLORS.lightGray1,
    borderBottomLeftRadius: 12,
  },
  img3: {
    height: height * 0.027,
    width: width * 0.06,
    resizeMode: 'contain',
    tintColor: COLORS.black
  },
  pyment_radio_box: {
    borderWidth: 1.5,
    borderRadius: width * 0.05,
    borderColor: COLORS.primary,
    //borderColor: COLORS.gray40,
    width: width * 0.05,
    height: width * 0.05,
    alignItems: 'center',
    justifyContent: 'center',
  },
  pyment_innerradio_box: {
    borderRadius: 10,
    width: width * 0.03,
    height: width * 0.03,
    alignSelf: 'center',
    // marginBottom: -1,
    // margin: width * 0.004,
    backgroundColor: COLORS.primary,
  },
});
