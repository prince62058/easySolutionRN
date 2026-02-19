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
import {COLORS, FONTS, icons, images} from '../../constants';

const TrendMill = ({text, img, rupee, star, textRate, textReviewNum}) => {
  return (
    <View>
      <TouchableOpacity>
        <View style={styles.box1}>
          <View style={styles.box4}>
            <Image source={img} style={styles.img1} />
          </View>
          <View style={styles.box5}>
            <Text numberOfLines={2} style={styles.text2}>
              {text}
            </Text>
            <View style={styles.box2}>
              <Image source={star} style={styles.img2} />

              <Text style={styles.text3}>{textRate}</Text>
              <Text style={styles.text3}>{textReviewNum}</Text>
            </View>

            <Text style={styles.text5}>₹{rupee}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};
export default TrendMill;
const styles = StyleSheet.create({
  box1: {
    flexDirection: 'row',
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 10,
    width: width * 0.92,
    alignItems: 'center',
    marginVertical: width * 0.015,
    paddingVertical: width * 0.01,
    paddingHorizontal: width * 0.015,
    alignSelf: 'center',
  },
  img1: {
    height: height * 0.12,
    width: width * 0.24,
    resizeMode: 'contain',
  },
  img2: {
    height: height * 0.02,
    width: width * 0.038,
    marginTop: height * 0.002,
  },
  box2: {
    flexDirection: 'row',
  },

  text1: {
    fontSize: 10,
    fontFamily: FONTS.light,
    color: COLORS.gray,
  },
  text2: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    width: width * 0.55,
  },

  text3: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    marginBottom: width * 0.01,
    width: width * 0.2,
    textAlign: 'center',
  },
  text4: {
    fontSize: 11,
    fontFamily: FONTS.regular,
    marginBottom: width * 0.02,
  },
  text5: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
  },
  text6: {
    fontSize: 12,
    fontFamily: FONTS.medium,
    color: COLORS.red,
  },
  box4: {
    height: height * 0.13,
    width: width * 0.26,
    resizeMode: 'contain',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.02,
  },
  box5: {
    marginTop: -width * 0.02,
    marginLeft: width * 0.015,
  },
});
