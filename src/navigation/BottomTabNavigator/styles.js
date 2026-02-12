import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  bottomicon: {
    height: height * 0.04,
    width: width * 0.06,
    resizeMode: 'contain',
    marginBottom: height * -0.01,
  },
  bottomiconcart: {
    height: height * 0.045,
    width: width * 0.08,
    resizeMode: 'stretch',
    marginBottom: height * -0.012,
  },
  //   homeheader: {
  //     // flexDirection: 'row',
  //   },
  homeheadertext: {
    fontSize: 20,
    marginTop: height * 0.025,
    color: COLORS.white,
    fontFamily: FONTS.regular,
  },

  homeheaderimg3: {
    height: height * 0.03,
    width: width * 0.06,
    marginHorizontal: width * 0.03,
    resizeMode: 'contain',
  },

  box1: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.white,
    height: height * 0.06,
    borderRadius: 10,
    width: width * 0.9,
    borderWidth: 1,
    borderColor: COLORS.lightGray,
  },
  search: {
    ...FONTS.fiveHundred,
    fontSize: 14,
    color: COLORS.black,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  
  },
  homeimg: {
    height: width * 0.12,
    width: width * 0.12,
    borderRadius: width * 0.12,
    marginLeft: width * 0.04,
    marginRight: width * 0.03,
    resizeMode: 'contain',
  },

  notificationstyle: {
    height: width * 0.067,
    width: width * 0.067,
    // marginRight: width * 0.06,
    resizeMode: 'contain',
  },
  right_btn: {
    width: width * 0.08,
    height: width * 0.1,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: width * 0.04,
  },
  text1: {
    fontSize: width * 0.034,
    ...FONTS.fourHundred,
    color: COLORS.black,
    marginBottom: -4,
  },
  name: {
    fontSize: width * 0.032,
    ...FONTS.sixHundred,
    color: COLORS.black,
    // marginBottom: -4,
  },
  locationstyle: {
    height: height * 0.024,
    width: width * 0.04,
    resizeMode: 'contain',
    marginRight: width * 0.01,
  },
  text2: {
    fontSize: 12,
    ...FONTS.fourHundred,
    color: COLORS.gray60,
  },
  title: {
    fontSize: width * .054,
    color: COLORS.black,
    fontFamily: FONTS.medium,
    marginBottom: -6,
  },
  title1: {
    fontSize: width * .043,
    color: COLORS.black,
    fontFamily: FONTS.semiBold,
    marginBottom: -4,
  },
});
