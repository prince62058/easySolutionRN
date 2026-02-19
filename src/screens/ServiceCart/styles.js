import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS, SIZES} from '../../constants';
const {width, height} = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    backgroundColor: COLORS.white,
    alignSelf: 'center',
    width: width * 0.94,
  },
  t1: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    height: height * 0.06,
    width: width * 0.92,
    borderRadius: 10,
    alignSelf: 'center',
    marginBottom: height * 0.02,
    borderColor: COLORS.primary,
  },
  text1: {
    fontSize: 13,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginBottom: -3,
  },

  box2: {
    flexDirection: 'row',
    marginTop: height * 0.015,
    alignItems: 'center',
    paddingHorizontal: width * 0.03,
  },
  line: {
    borderTopWidth: 1,
    borderColor: COLORS.gray30,
    marginVertical: height * 0.012,
  },
  text2: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 12,
    width: width * 0.62,
  },
  text3: {
    color: COLORS.black,
    fontFamily: FONTS.medium,
    fontSize: 13,
  },
  img: {
    width: width * 0.92,
    height: height * 0.08,
    alignSelf: 'center',
    resizeMode: 'stretch',
  },
  checkout_btn: {
    width: width * 0.92,
    height: height * 0.08,
    alignSelf: 'center',
    marginVertical: height * 0.01,
  },
  text4: {
    textAlign: 'center',
    marginVertical: width * 0.04,
    color: '#9747FF',
    // color: COLORS.black,
    ...FONTS.sixHundred,
    fontSize: 13,
  },

  // btn box
  btn_box: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: COLORS.white,
    alignItems: 'center',
    alignSelf: 'center',
    height: height * 0.08,
    width: width * 0.9,
    // marginVertical: height * 0.01,
  },
  btn: {
    width: width * 0.4,
  },
  text13: {
    width: width * 0.3,
    textAlign: 'center',
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    fontSize: 14,
    marginBottom: -5,
    // borderWidth: 1,
  },
  text14: {
    fontFamily: FONTS.light,
    color: '#2E6AA0',
    fontSize: 12,
    marginBottom: -3,
  },

  offer_btn: {
    width: SIZES.width * 0.92,
    height: SIZES.height * 0.06,
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * 0.02,
    elevation: 3,
    flexDirection: 'row',
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: SIZES.height * 0.01,
    paddingHorizontal: SIZES.width * 0.03,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  img5: {
    height: height * 0.03,
    width: width * 0.06,
    resizeMode: 'contain',
    marginRight: width * 0.02,
  },
  text22: {
    fontSize: 12,
    color: COLORS.black,
    fontFamily: FONTS.regular,
  },

  // =========== empty cart =======
  innerContainer: {
    backgroundColor: COLORS.white,
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: width * 0.05,
    marginTop: -height * 0.08, // Adjust for top switch/nav
  },
  topText: {
    fontSize: 22,
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
    color: COLORS.black,
    marginTop: -height * 0.02,
  },
  subText: {
    fontSize: 14,
    fontFamily: FONTS.regular,
    textAlign: 'center',
    color: COLORS.gray,
    marginTop: 8,
    marginBottom: height * 0.04,
  },
  image: {
    width: width * 0.8,
    height: height * 0.35,
    alignSelf: 'center',
    marginVertical: height * 0.02,
    resizeMode: 'contain',
  },

  // switch btn
  switchrow: {
    width: width * 0.92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 12,
    padding: 4,
    marginTop: height * 0.02,
    marginBottom: height * 0.01,
  },

  switchbox: {
    width: '48.5%',
    justifyContent: 'center',
    alignItems: 'center',
    height: height * 0.05,
    borderRadius: 10,
  },
  switchtext: {
    fontSize: 14,
    ...FONTS.sixHundred,
    color: COLORS.gray40,
    marginBottom: -4,
  },
});
