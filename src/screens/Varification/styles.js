import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, FONTS} from '../../constants';
const {height, width} = Dimensions.get('window');
export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innercontainer: {
    width: width * 0.92,
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  box1: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: height * 0.1,
    marginLeft: -width * 0.05,
    alignSelf: 'center',
  },
  box2: {
    height: height * 0.145,
  },
  text1: {
    fontSize: 28,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    marginTop: height * 0.12,
    textAlign: 'center',
  },
  text2: {
    fontSize: 13,
    width: width * 0.8,
    fontFamily: FONTS.regular,
    marginBottom: height * 0.04,
    color: COLORS.gray,
    textAlign: 'center',
    alignSelf: 'center',
  },
  text3: {
    fontSize: width * 0.038,
    // width: width * 0.8,
    fontFamily: FONTS.medium,
    // marginBottom: height * 0.04,
    color: COLORS.gray, 
    textAlign: 'center',
    alignSelf: 'center',
  },

  along: {
    marginVertical: height * 0.04,
  },

  box3: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
    alignSelf: 'center',
  },
  text4: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.gray,
  },
  text5: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
  },
  resend_text: {
    fontSize: 12,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    textDecorationLine: 'underline',
  },

  otpCheck: {
    width: width * 0.7,
    height: height * 0.12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
  },
  borderStyleHighLighted: {
    borderColor: COLORS.black,
  },

  underlineStyleBase: {
    width: width * 0.125,
    // height: height * 0.066,
    paddingBottom: height * .008,
    borderWidth: 1,
    borderRadius: 8,
    color: COLORS.black,
    fontFamily: FONTS.medium,
  },
  underlineStyleHighLighted: {
    borderColor: COLORS.primary,
  },
});
