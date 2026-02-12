import { StyleSheet, Dimensions } from "react-native";
import { COLORS, FONTS, SIZES } from "../../constants";
const { height, width } = Dimensions.get('window');

export default StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },

  // card
  card: {
    width: SIZES.width * .92,
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderRadius: SIZES.width * .02,
    borderColor: COLORS.gray30,
    alignSelf: 'center',
    padding: SIZES.width * .03,
    // paddingVertical: SIZES.height * .01,
    marginVertical: SIZES.height * .01,
  },
  image_box: {
    height: SIZES.width * 0.24,
    width: SIZES.width * 0.24,
    borderWidth: 1,
    borderColor: COLORS.gray20,
    borderRadius: SIZES.width * .02,
    marginRight: SIZES.width * .03,
    overflow: 'hidden',
  },
  image: {
    height: SIZES.width * 0.24,
    width: SIZES.width * 0.24,
    borderRadius: SIZES.width * .02,
    resizeMode: 'stretch',
    alignSelf: 'center',
  },
  image_row: {
    flexDirection: 'row',
    // alignItems: 'center',
  },
  order_no: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .032,
    color: 'rgba(90, 105, 117, 1)',
    // marginBottom: -4,
  },
  cate: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.width * .03,
    color: 'rgba(90, 105, 117, 1)',
    marginBottom: -4,
  },
  title: {
    width: SIZES.width * 0.57,
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.width * .04,
    color: COLORS.red,
    // borderWidth: 1,
    marginBottom: -4,
  },
  btn: {
    width: SIZES.width * 0.3,
    height: SIZES.height * 0.04,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.primary,
    borderRadius: SIZES.width * .012,
  },
  btn_text: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .03,
    color: COLORS.white,
    marginBottom: -4,
  },
  btn1: {
    width: SIZES.width * 0.92,
    height: SIZES.height * 0.056,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white,
    borderRadius: SIZES.width * .012,
    borderWidth: 1,
    borderColor: COLORS.gray30,
  },
  btn1_text: {
    fontFamily: FONTS.bold,
    fontSize: SIZES.width * .04,
    color: COLORS.gray90,
    marginBottom: -2,
  },
  row1: {
    width: SIZES.width * .92,
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    rowGap: SIZES.height * .01,
    alignSelf: 'center',
    marginBottom: SIZES.height * .02,
  },
  box: {
    marginVertical: SIZES.height * .02
  },
  row: {
    width: SIZES.width * .85,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    marginTop: SIZES.height * .005,
  },
  key: {
    width: SIZES.width * .4,
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .03,
    color: COLORS.black,
    marginBottom: -4,
  },
  value: {
    width: SIZES.width * .4,
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .03,
    color: COLORS.black,
    marginBottom: -4,
  },
  key1: {
    width: SIZES.width * .4,
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .036,
    color: COLORS.black,
    marginBottom: -4,
  },
  value1: {
    width: SIZES.width * .4,
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .036,
    color: COLORS.black,
    marginBottom: -4,
  },
  row2: {
    width: SIZES.width * .92,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    borderTopWidth: 1,
    borderTopColor: COLORS.gray20,
    marginTop: SIZES.height * .01,
    paddingHorizontal: width * .03,
    paddingTop: SIZES.height * .01,
  },

  title1: {
    fontFamily: FONTS.semiBold,
    fontSize: SIZES.width * .042,
    color: COLORS.black,
    marginBottom: -4,
  },

  // 
  t2: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.prime,
    borderRadius: 50,
    height: height * 0.06,
    width: width * 0.6,
    marginVertical: height * 0.02,
    // marginLeft: width * 0.045,
  },
  text1: {
    fontSize: 14,
    fontFamily: FONTS.medium,
    color: COLORS.black,
    marginBottom: -3,
  },
  text16: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    color: COLORS.white,
    marginBottom: -3,
  },

  cancelbtn: {
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1.5,
    borderColor: COLORS.primary,
    height: height * 0.06,
    width: width * 0.45,
    borderRadius: 50,
  },
  t12: {
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    backgroundColor: COLORS.prime,
    borderRadius: 50,
    height: height * 0.06,
    width: width * 0.45,
    // marginVertical: height * 0.02,
  },

  //   cancel order
  // modal

  text4: {
    marginLeft: width * 0.02,
    width: width * 0.95,
    fontFamily: FONTS.regular,
    color: COLORS.black,
    fontSize: 12,
    marginTop: height * 0.02,
    textAlign: 'center',
  },
  btn: {
    width: width * 0.44,
  },
  modalcanclebtn: {
    marginBottom: 12,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.primary,
    width: width * 0.4,
    marginRight: width * 0.03,
    // marginRight:51
  },

  modalstyle: {
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    borderTopLeftRadius: width * 0.06,
    borderTopRightRadius: width * 0.06,
    marginTop: height * 0.6,
    width: width,
    height: height * 0.4,
    alignSelf: 'center',
  },
  img1: {
    height: height * 0.1,
    width: width * 0.25,
    marginLeft: width * 0.005,
  },
  img2: {
    height: height * 0.03,
    width: width * 0.06,
    marginTop: height * 0.005,
    marginLeft: width * 0.005,
  },
  text5: {
    fontSize: 15,
    fontFamily: FONTS.semiBold,
    width: width * 0.65,
    textAlign: 'center',
    color: COLORS.green1,
  },
  text6: {
    fontSize: 14,
    fontFamily: FONTS.semiBold,
    textAlign: 'center',
    color: COLORS.primary,
  },
  line: {
    width: width * 0.9,
    marginTop: width * 0.04,
    borderTopWidth: 1,
    borderColor: COLORS.gray,
  },
  modal_box2: {
    flexDirection: 'row',
    marginTop: height * 0.02,
  },

  cancel_row: {
    width: SIZES.width * .92,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: height * 0.01,
    marginBottom: height * 0.02,
  },
  location: {
    width: width * .05,
    height: width * .05,
    marginRight: width * .03,
    resizeMode: 'contain',
  },
  loc_row: {
    width: SIZES.width * .85,
    flexDirection: 'row',
    alignItems: 'center',
    // justifyContent: 'space-between',
    alignSelf: 'center',
    marginVertical: SIZES.height * .005,
  },
  title2: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .04,
    color: COLORS.gray70,
    marginBottom: -4,
  },
  name: {
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .04,
    color: COLORS.black,
    // marginBottom: -4,
  },
  address: {
    fontFamily: FONTS.regular,
    fontSize: SIZES.width * .034,
    color: COLORS.gray50,
    // marginBottom: -4,
  },

  // review
  review_box: {
    width: SIZES.width * .92,
    alignItems: 'center',
    alignSelf: 'center',
  },
  star_row: {
    marginBottom: SIZES.height * .02,
  },
  review: {
    width: SIZES.width * .92,
    fontFamily: FONTS.medium,
    fontSize: SIZES.width * .041,
    color: COLORS.gray70,
    marginBottom: -4,
  },
})