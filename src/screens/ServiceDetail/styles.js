import { StyleSheet, Dimensions } from 'react-native';
import { COLORS, FONTS } from '../../constants';
const { width, height } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    backgroundColor: COLORS.white,
    flex: 1,
  },
  innerContainer: {
    backgroundColor: COLORS.white,
    // alignItems: 'center',
    alignSelf: 'center',
    width: width * 0.92,
    // marginBottom: height * 0.095,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: height * 0.01,
    gap: width * 0.02,
  },
  custom: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: width * 0.35,
  },
  box5: {
    marginTop: height * 0.03,
  },
  img2: {
    height: height * 0.24,
    width: width * 0.94,
    resizeMode: 'stretch',
    marginVertical: height * 0.014,
    borderRadius: 12,
    alignSelf: 'center',
  },
  adiitionimg: {
    height: height * 0.22,
    width: width * 0.92,
    resizeMode: 'stretch',
    marginVertical: height * 0.012,
    borderRadius: 10,
    alignSelf: 'center',
  },
  box2: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    // position: 'absolute',
    // bottom: 0,
    width: width,
    height: height * 0.082,
    alignItems: 'center',
    backgroundColor: COLORS.white,
  },

  text3: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    marginTop: height * 0.008,
  },
  // img1: {
  //   height: height * 0.02,
  //   // width: width * 0.038,
  // },
  text5: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.primary,
    marginBottom: -4,
  },
  text6: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    marginBottom: -4,
  },
  text2: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    color: COLORS.black,
    marginBottom: -4,
  },
  subtitle: {
    fontSize: 13,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    marginBottom: -3,
  },
  text9: {
    fontSize: 12,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    marginTop: width * 0.02,
    // marginBottom:height * 0.03
  },
  box1: {
    // margin: width * 0.06,
    // marginLeft: width * 0.07,
  },
  box18: {
    // width: width * 0.92,
    flexDirection: 'row',
    columnGap: width * .03,
    marginTop: height * 0.01,
  },
  t3: {
    elevation: 4,
    height: height * 0.055,
    marginVertical: width * 0.025,
    borderRadius: 10,
    // width: width * 0.35,
    borderBottomRightRadius: 10,
    borderBottomLeftRadius: 10,
    borderBottomColor: COLORS.white,
    borderBottomWidth: 2,
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    paddingHorizontal: width * .05,
    // marginLeft: width * 0.022,
  },
  switchtext: {
    textAlign: 'center',
    color: COLORS.black,
    fontSize: 13,
    marginBottom: -2,
  },

  line: {
    borderColor: COLORS.gray20,
    borderTopWidth: 1,
    marginTop: height * 0.02,
  },
  locationstyle: {
    height: height * 0.028,
    width: width * 0.038,
    resizeMode: 'stretch',
    marginRight: width * 0.01,
  },
  location: {
    fontSize: 12,
    ...FONTS.fiveHundred,
    color: COLORS.black,
    marginBottom: -3,
  },
  head: {
    fontSize: 15,
    ...FONTS.fiveHundred,
    color: COLORS.black,
    marginTop: height * 0.01,
    marginBottom: -4,
  },
  ratecomment: {
    fontSize: 13,
    ...FONTS.fourHundred,
    color: COLORS.black,
    marginBottom: -3,
  },

  //   -------------------------------------------
  btnBox: {
    width: width * 0.92,
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: height * 0.08,
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.white,
  },
  addbtn: {
    width: width * 0.44,
    borderRadius: width * 0.4,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: COLORS.prime,
  },
  buybtn: {
    width: width * 0.44,
    borderRadius: width * 0.4,
  },

  box: {
    width: width,
    alignSelf: 'center',
    marginBottom: height * .02,
  },
  view_all: {
    fontFamily: FONTS.medium,
    fontSize: width * .04,
    color: COLORS.primary,
    textDecorationLine: 'underline',
    marginBottom: -4,
  },
  view_btn: {
    alignSelf: 'center',
    // borderWidth: 1,
  },
  stock: {
    fontFamily: FONTS.medium,
    fontSize: width * .04,
    color: COLORS.primary,
    marginBottom: -4,
    textAlign: 'center',
    alignSelf: 'center',
  },

  // dot 
  dot_row:{
    flexDirection:'row',
    // alignItems:'center',
  },
  dot: {
    width: width * .016,
    height: width * .016,
    backgroundColor: COLORS.black,
    borderRadius: width * .03,
    marginRight: width * .02,
    marginTop: 6,
  },
  dot_text: {
    fontSize: width * .034,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    // marginTop: width * 0.02,
    // marginBottom: -3,
  },

  sliderImage: {
    width: width * 0.9,
    height: width * 0.9,
    // resizeMode: 'contain',
    resizeMode: 'cover',
    // alignSelf: 'center',
    borderRadius: 10,
  },
});
