import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import React from 'react';
import {COLORS, FONTS, images} from '../../constants';
import FastImage from 'react-native-fast-image';

const Services = ({img, ml, mr, text, onPress, active, checked}) => {
  // console.log("imga : ", img)
  return (
    <TouchableOpacity
      // active
      activeOpacity={0.6}
      style={[styles.box1, ml && {marginLeft: ml}, mr && {marginRight: mr}]}
      onPress={onPress}>
      <View
        style={[
          styles.imgbox,
          checked && {borderColor: COLORS.primary, borderWidth: 2},
        ]}>
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
};

export default Services;

const styles = StyleSheet.create({
  box1: {
    width: width * 0.235,
    height: width * 0.3,
    alignItems: 'center',
    marginBottom: width * 0.04,
  },
  imgbox: {
    height: width * 0.19,
    width: width * 0.19,
    borderRadius: (width * 0.19) / 2,
    marginBottom: height * 0.008,
    borderWidth: 1,
    alignItems: 'center',
    justifyContent: 'center',
    borderColor: '#E0E0E0',
    backgroundColor: COLORS.white,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.1,
    shadowRadius: 2,
  },
  img: {
    width: '85%',
    height: '85%',
    resizeMode: 'contain',
    borderRadius: (width * 0.17) / 2,
  },
  text1: {
    width: '100%',
    fontFamily: FONTS.medium,
    color: '#333333',
    fontSize: 10,
    textAlign: 'center',
    textTransform: 'uppercase',
    paddingHorizontal: 2,
  },
});
