import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
const { height, width } = Dimensions.get('window');
import { COLORS, FONTS, images } from '../../constants';
import Button from './../Button/index';

const ServiceMore = ({ title, subtitle, bg, img, boxbg, onPress }) => {
  return (
    <View style={styles.serviceBox}>
      <View style={styles.serviceRow}>
        <View style={[styles.servicebox1, boxbg && { backgroundColor: boxbg }]}>
          <Text numberOfLines={2} style={styles.servicetitle}>
            {title}
          </Text>
          <Text numberOfLines={2} style={styles.servicesubtitle}>
            {subtitle}
          </Text>
          <Button
            smallbtn
            t1="Book Now"
            t2={{ backgroundColor: bg }}
            onPress={onPress}
          />
        </View>
        <Image source={img} style={styles.serviceimg} />
      </View>
    </View>
  );
};

export default ServiceMore;

const styles = StyleSheet.create({
  serviceBox: {
    width: width * 0.93,
    borderRadius: 8,
    alignSelf: 'center',
    marginTop: height * 0.025,
    backgroundColor: '#E5E5E5',
  },
  serviceRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  servicebox1: {
    width: width * 0.53,
    backgroundColor: COLORS.gray30,
    paddingVertical: height * 0.02,
    height: height * 0.24,
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    paddingHorizontal: width * 0.03,
  },
  servicetitle: {
    color: COLORS.white,
    ...FONTS.sixHundred,
    fontSize: 15,
    textAlign: 'center',
    height: height * 0.06,
  },
  servicesubtitle: {
    color: COLORS.white,
    ...FONTS.fiveHundred,
    fontSize: 13,
    textAlign: 'center',
    marginBottom: height * 0.01,
    height: height * 0.06,
  },
  serviceimg: {
    width: width * 0.4,
    height: height * 0.24,
    resizeMode: 'stretch',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
  },
});
