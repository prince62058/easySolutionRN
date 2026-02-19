import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {COLORS, FONTS, icons} from '../../constants';
const {height, width} = Dimensions.get('window');

const InnerServices = ({img, text, onPress, price}) => {
  return (
    <View>
      <TouchableOpacity
        activeOpacity={0.6}
        style={styles.box1}
        onPress={onPress}>
        <Image source={img} style={styles.img1} />
        <Text numberOfLines={2} style={styles.text1}>
          {text}
        </Text>
        {/* <View style={styles.box2}>
          <Text style={styles.text2}>₹{price}</Text>
          <TouchableOpacity>
            <Text style={styles.text3}>/Visit</Text>
          </TouchableOpacity>
        </View> */}
      </TouchableOpacity>
    </View>
  );
};
export default InnerServices;

const styles = StyleSheet.create({
  img1: {
    height: height * 0.16,
    width: width * 0.4,
    borderRadius: 10,
    marginTop: height * 0.01,
    resizeMode: 'stretch',
  },

  box1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 12,
    marginLeft: width * 0.038,
    marginBottom: height * 0.02,
    width: width * 0.44,
  },
  box2: {
    flexDirection: 'row',
    gap: width * 0.02,
  },
  text1: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    textAlign: 'center',
    marginVertical: height * 0.01,
    width: width * 0.4,
    alignSelf: 'center',
    height: height * 0.06,
  },
  // text2: {
  //   fontSize: 14,
  //   fontFamily: FONTS.semiBold,
  //   color: COLORS.red,
  // },
  // text3: {
  //   fontSize: 13,
  //   fontFamily: FONTS.semiBold,
  //   color: COLORS.gray,
  //   marginBottom: height * 0.01,
  // },
});
