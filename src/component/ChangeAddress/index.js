import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
const {height, width} = Dimensions.get('window');
import React from 'react';
import {COLORS, FONTS} from '../../constants';
const ChangeAddress = ({onPress, margin, address, name, phone}) => {
  return (
    <View>
      <View style={[styles.box1, margin]}>
        <View style={styles.left_box}>
          <View style={styles.left_box1}>
            <Text numberOfLines={1} style={styles.text9}>Delivery to: </Text>
            <Text numberOfLines={1} style={{...styles.text10, width: width * .4}}>{name}</Text>
          </View>
          <Text style={styles.text10}>{phone}</Text>
          <Text style={styles.text11} numberOfLines={2} >
           {address}
          </Text>
        </View>
        <TouchableOpacity activeOpacity={0.5} style={styles.t1} onPress={onPress}>
          <Text style={styles.text12}>Change</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default ChangeAddress;

const styles = StyleSheet.create({
  box1: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: '#CEC4C4',
    width: width * 0.92,
    padding: width * 0.03,
    margin: width * 0.03,
    borderRadius: 12,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  left_box: {
    width: width * .65,
    // borderWidth: 1,
  },
  left_box1: {
    flexDirection: 'row',
    // borderWidth: 1,
  },
  text9: {
    fontSize: 11,
    // width: width * 0.22,
    color: '#797979',
    fontFamily: FONTS.regular,
  },
  text10: {
    width: width * .4,
    color: COLORS.black,
    fontFamily: FONTS.regular,
    fontSize: 11,
  },
  t1: {
    elevation: 4,
    backgroundColor: COLORS.white,
    borderRadius: 6,
    height: height * 0.032,
    width: width * 0.18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  text11: {
    fontSize: 10,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
    width: width * 0.65,
  },
  text12: {
    fontSize: 9,
    textAlign: 'center',
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },
});
