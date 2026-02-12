import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import React from 'react';
import { COLORS, FONTS, images } from '../../constants';
import FastImage from 'react-native-fast-image';

const Services = ({ img, ml, mr, text, onPress, active, checked }) => {
  // console.log("imga : ", img)
  return (
    <TouchableOpacity
      // active
      activeOpacity={0.6}
      style={[styles.box1, ml && { marginLeft: ml }, mr && { marginRight: mr }]}
      onPress={onPress}>
      <View
        style={[styles.imgbox, checked && { borderColor: COLORS.primary, borderWidth: 2 }]}>
        <Image source={img} style={styles.img} />
      </View>
      <Text numberOfLines={2} style={styles.text1}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

Services.defaultPorps = {
  ml: null,
  mr: null,
}

export default Services;

const styles = StyleSheet.create({
  box1: {
    width: width * 0.2,
    height: width * 0.3,
    // justifyContent: 'center',
    alignItems: 'center',
    // borderWidth: 1,
    // alignSelf: 'center',
    // marginHorizontal: width * 0.02,
    marginBottom: width * 0.02,

  },
  imgbox: {
    height: width * 0.2,
    width: width * 0.2,
    // resizeMode: 'stretch',
    borderRadius: width * 0.2,
    marginBottom: height * 0.005,
    borderWidth: 1.2,
    // overflow: 'hidden',
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: COLORS.gray40,
    backgroundColor: COLORS.white,
  },
  img: {
    width: width * 0.17,
    height: width * 0.17,
    resizeMode: 'stretch',
    borderRadius: height * 0.15,
    // marginBottom: height * 0.005,
    overflow: 'hidden',
    // borderWidth: 1,
  },
  text1: {
    width: width * 0.2,
    fontFamily: FONTS.light,
    color: COLORS.black,
    fontSize: 10,
    textAlign: 'center',
  },
});
