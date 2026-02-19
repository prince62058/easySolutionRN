import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  box1: {
    flexDirection: 'row',
    height: height * 0.2,
    width: width * 0.92,
    justifyContent: 'center',
    alignItems: 'center',
    gap: width * 0.02,
    marginBottom: width * 0.015,
    alignSelf: 'center',
  },
  img1: {
    height: height * 0.15,
    width: width * 0.3,
    resizeMode: 'stretch',
    backgroundColor: COLORS.white,
    borderRadius: 8,
  },

  text2: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    width: width * 0.55,
  },

  text5: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
  },

  box4: {
    borderWidth: 1,
    borderColor: COLORS.border,
    borderRadius: 8,
  },
  box5: {
    marginTop: -width * 0.05,
    marginLeft: width * 0.015,
  },
  btn: {
    height: height * 0.065,
    width: width * 0.45,
    marginLeft: width * 0.27,
    marginTop: height * 0.1,
  },
});
