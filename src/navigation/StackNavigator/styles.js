import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  homeheader: {
    flexDirection: 'row',
    gap: 10,
    elevation: 0.3,
    height: height * 0.08,
    marginLeft: -width * 0.03,
  },
  homeheadertext: {
    fontSize: 20,
    marginTop: height * 0.025,
    color: COLORS.white,
    fontFamily: FONTS.regular,
  },
  title: {
    fontSize: width * .054,
    color: COLORS.black,
    fontFamily: FONTS.medium,
    marginBottom: -6,
  },
  img: {
    height: height * 0.05,
    width: width * 0.03,
    marginRight: 15,
    margin: width * 0.03,
  },
  Cart: {
    height: height * 0.038,
    width: width * 0.078,
    marginRight: width * 0.05,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: height * 0.018,
    color: COLORS.black,
    fontFamily: FONTS.regular,
    marginBottom: -3,
  },
});
